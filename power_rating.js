/**
 * Power rating calculator.
 *
 * For each team we compute an offensive rating (AtkRt) and defensive rating
 * (DefRt) from points-per-game (capped at 65) and points-allowed-per-game,
 * each z-scored against the league and re-centered on 0.5. Those combine
 * into a raw team rating (TmRt). A team's "weighted win %" (wW%) then looks
 * at the strength of each opponent (their TmRt), rewarding wins over strong
 * opponents and penalizing losses to weak ones. The final power rating
 * (PwrRt) averages TmRt and wW%.
 */

const SEASON_DATA = require('./data/season_data.js');

const MAX_SCORE_CAP = 65; // points-for is capped at this value when rating offense
const RATING_CENTER = 0.5; // AtkRt/DefRt are centered on this value
const RATING_SPREAD = 0.1; // one standard deviation maps to this much rating

/** Basic sum helper. */
const sum = (values) => values.reduce((total, value) => total + value, 0);

/** Population mean of a list of numbers. */
function mean(values) {
  return sum(values) / values.length;
}

/** Population standard deviation of a list of numbers. */
function standardDeviation(values, meanValue) {
  const variance = mean(values.map((value) => (value - meanValue) ** 2));
  return Math.sqrt(variance);
}

/**
 * Derives a team's season totals from its game log: record, points
 * for/against, and the per-game rates used for rating (points-for capped
 * at MAX_SCORE_CAP per game).
 *
 * Returns null for teams that haven't played any games, since they can't
 * be rated yet.
 */
function summarizeTeam(team) {
  const { games } = team;

  if (games.length === 0) {
    return null;
  }

  let wins = 0;
  let losses = 0;
  let draws = 0;
  let pointsFor = 0;
  let pointsAllowed = 0;
  let cappedPointsFor = 0;

  for (const { pointsFor: scored, pointsAllowed: allowed } of games) {
    pointsFor += scored;
    pointsAllowed += allowed;
    cappedPointsFor += Math.min(MAX_SCORE_CAP, scored);

    if (scored > allowed) wins++;
    else if (scored < allowed) losses++;
    else draws++;
  }

  return {
    ...team,
    wins,
    losses,
    draws,
    pf: pointsFor,
    pa: pointsAllowed,
    pd: pointsFor - pointsAllowed,
    pfpg: cappedPointsFor / games.length, // capped points-for per game (offense input)
    papg: pointsAllowed / games.length, // points-allowed per game (defense input)
  };
}

/**
 * Converts a per-game rate into a 0.5-centered rating: teams at the league
 * mean get RATING_CENTER, and each standard deviation away shifts the
 * rating by RATING_SPREAD, in the given direction.
 *
 * If the league has zero spread (every team has the same rate), "standard
 * deviations from the mean" is undefined — everyone is equally average, so
 * everyone gets the center rating.
 */
function toRating(value, leagueMean, leagueStdDev, direction) {
  if (leagueStdDev === 0) {
    return RATING_CENTER;
  }
  const scalingFactor = (direction * RATING_SPREAD) / leagueStdDev;
  const base = RATING_CENTER - direction * RATING_SPREAD * (leagueMean / leagueStdDev);
  return scalingFactor * value + base;
}

/**
 * Computes a team's weighted win percentage: the average, across all
 * games, of the opponent's team rating (win), that rating minus 1 (loss),
 * or that rating minus 0.5 (draw). Beating a strong opponent counts for
 * more than beating a weak one.
 */
function weightedWinPercent(team, teamRatings) {
  const gameScores = team.games.map(({ opponent, pointsFor, pointsAllowed }) => {
    const opponentRating = teamRatings[opponent];

    if (pointsFor > pointsAllowed) return opponentRating;
    if (pointsFor < pointsAllowed) return opponentRating - 1.0;
    return opponentRating - 0.5;
  });

  return mean(gameScores);
}

/**
 * Computes power ratings for every team with at least one game played.
 * Teams with no games are dropped from the output.
 */
function computePowerRating(teams) {
  const summarized = teams.map(summarizeTeam).filter((team) => team !== null);

  const meanPfpg = mean(summarized.map((team) => team.pfpg));
  const meanPapg = mean(summarized.map((team) => team.papg));
  const stdDevPfpg = standardDeviation(summarized.map((team) => team.pfpg), meanPfpg);
  const stdDevPapg = standardDeviation(summarized.map((team) => team.papg), meanPapg);

  // Offensive rating rises with pfpg; defensive rating rises as papg falls.
  const rated = summarized.map((team) => {
    const atkRt = toRating(team.pfpg, meanPfpg, stdDevPfpg, 1);
    const defRt = toRating(team.papg, meanPapg, stdDevPapg, -1);
    return { ...team, AtkRt: atkRt, DefRt: defRt, TmRt: atkRt + defRt };
  });

  const teamRatings = Object.fromEntries(
    rated.map((team) => [team.institution, team.TmRt])
  );

  const finalData = rated.map((team) => {
    const wWinPct = weightedWinPercent(team, teamRatings);
    return {
      ...team,
      "wW%": wWinPct,
      PwrRt: (team.TmRt + wWinPct) / 2.0,
    };
  });

  return {
    meanPfpg,
    standardDeviationPfpg: stdDevPfpg,
    meanPapg,
    standardDeviationPapg: stdDevPapg,
    TmRt: teamRatings,
    data: finalData,
  };
}

module.exports = { computePowerRating, data: SEASON_DATA };
