const SCHOOL = {
  DARTMOUTH: "Dartmouth",
  HARVARD: "Harvard",
  SHU: "Sacred Heart",
  LINDENWOOD: "Lindenwood",
  ARMY: "West Point",
  QUINNIPIAC: "Quinnipiac",
  LIU: "Long Island",
  NAVY: "Navy",
  BROWN: "Brown",
  QUEENS: "Queens",
  PRINCETON: "Princeton",
  MSM: "Mount St. Mary's",
  LASALLE: "LaSalle",
};
const data = [{
    "institution": SCHOOL.DARTMOUTH,
    "opponents": [SCHOOL.QUINNIPIAC, SCHOOL.NAVY],
    "pointsFor": [59, 52],
    "pointsAllowed": [0, 7],
  },
  {
    "institution": SCHOOL.HARVARD,
    "opponents": [SCHOOL.LINDENWOOD, SCHOOL.BROWN],
    "pointsFor": [26, 47],
    "pointsAllowed": [17, 8],
  },
  {
    "institution": SCHOOL.SHU,
    "opponents": [SCHOOL.BROWN, SCHOOL.QUEENS],
    "pointsFor": [45,91],
    "pointsAllowed": [21, 0],
  },
  {
    "institution": SCHOOL.LINDENWOOD,
    "opponents": [SCHOOL.ARMY, SCHOOL.HARVARD, SCHOOL.NAVY],
    "pointsFor": [34, 17, 64],
    "pointsAllowed": [22, 26, 17],
  },
  {
    "institution": SCHOOL.ARMY,
    "opponents": [SCHOOL.LINDENWOOD, SCHOOL.LIU, SCHOOL.QUEENS],
    "pointsFor": [22, 38, 75],
    "pointsAllowed": [34, 0, 0],
  },
  {
    "institution": SCHOOL.QUINNIPIAC,
    "opponents": [SCHOOL.DARTMOUTH, SCHOOL.BROWN, SCHOOL.LIU],
    "pointsFor": [0, 33, 65],
    "pointsAllowed": [59, 14, 33],
  },
  {
    "institution": SCHOOL.LIU,
    "opponents": [SCHOOL.PRINCETON, SCHOOL.ARMY, SCHOOL.QUINNIPIAC],
    "pointsFor": [54, 0, 33],
    "pointsAllowed": [7, 38, 65],
  },
  {
    "institution": SCHOOL.NAVY,
    "opponents": [SCHOOL.QUEENS, SCHOOL.DARTMOUTH, SCHOOL.LINDENWOOD],
    "pointsFor": [58, 7, 17],
    "pointsAllowed": [7, 52, 64],
  },
  {
    "institution": SCHOOL.BROWN,
    "opponents": [SCHOOL.SHU, SCHOOL.QUINNIPIAC, SCHOOL.HARVARD],
    "pointsFor": [21, 14, 8],
    "pointsAllowed": [45, 33, 47],
  },
  {
    "institution": SCHOOL.QUEENS,
    "opponents": [SCHOOL.NAVY, SCHOOL.SHU, SCHOOL.ARMY],
    "pointsFor": [7, 0, 0],
    "pointsAllowed": [58, 91, 75],
  },
  {
    "institution": SCHOOL.PRINCETON,
    "opponents": [SCHOOL.LIU],
    "pointsFor": [7],
    "pointsAllowed": [54],
  },
  {
    "institution": SCHOOL.MSM,
    "opponents": [],
    "pointsFor": [],
    "pointsAllowed": [],
  },
  {
    "institution": SCHOOL.LASALLE,
    "opponents": [],
    "pointsFor": [],
    "pointsAllowed": [],
}];

function computePowerRating(data) {
  data = data.map(team => {

    if (
      team["pointsAllowed"].length !== team["pointsFor"].length ||
      team["opponents"].length !== team["pointsFor"].length
    ) {
      throw new Error('Invalid data for team: ' + team["institution"]);
    }

    if (team["pointsFor"].length === 0) {
      return null;
    }

    var maxPointsFor = 0;
    var pointsFor = 0;
    var pointsAllowed = 0;
    var wins = 0;
    var losses = 0;
    var draws = 0;

    for (var i = 0; i < team["pointsFor"].length; i++) {
      maxPointsFor += Math.min(65, team["pointsFor"][i]);
      pointsFor += team["pointsFor"][i];
      pointsAllowed += team["pointsAllowed"][i];

      if (team["pointsFor"][i] > team["pointsAllowed"][i]) {
        wins++;
      } else if (
        team["pointsFor"][i] < team["pointsAllowed"][i]
      ) {
        losses++;
      } else {
        draws++;
      }
    }

    team["wins"] = wins;
    team["losses"] = losses;
    team["draws"] = draws;

    team["pf"] = pointsFor;
    team["pa"] = pointsAllowed;
    team["pfpg"] = maxPointsFor / team["pointsFor"].length;
    team["papg"] = pointsAllowed / team["pointsFor"].length;
    team["pd"] = pointsFor - pointsAllowed;

    return team;
  });

  data = data.filter(team => team != null);
  var meanPfpg = data.reduce((acc, team) => acc + team["pfpg"], 0) / 
    data.length;
  var meanPapg = data.reduce((acc, team) => acc + team["papg"], 0) /
    data.length;
  var sumOfSquaredDifferencesPfpg = 0;
  var sumOfSquaredDifferencesPapg = 0;
  data = data.map(team => {
    sumOfSquaredDifferencesPfpg += Math.pow(team["pfpg"] - meanPfpg, 2);
    sumOfSquaredDifferencesPapg += Math.pow(team["papg"] - meanPapg, 2);
    return team;
  });

  sumOfSquaredDifferencesPfpg /= data.length;
  sumOfSquaredDifferencesPapg /= data.length;

  var standardDeviationPfpg = Math.sqrt(sumOfSquaredDifferencesPfpg);
  var scalingFactorPfpg = 0.100 / standardDeviationPfpg;
  var baseAtkRt = 0.500 - (0.100 * meanPfpg/standardDeviationPfpg);


  var standardDeviationPapg = Math.sqrt(sumOfSquaredDifferencesPapg);
  var scalingFactorPapg = -0.100 / standardDeviationPapg;
  var baseDefRt = 0.500 + (0.100 * meanPapg/standardDeviationPapg);

  var teamRatings = {
  };
  data = data.map(team => {
    team['AtkRt'] = (scalingFactorPfpg * team["pfpg"] + baseAtkRt);
    team['DefRt'] = (scalingFactorPapg * team["papg"] + baseDefRt);
    team['TmRt'] = team["AtkRt"] + team["DefRt"];
    teamRatings[team["institution"]] = team["TmRt"];
    return team;
  });

  data.forEach(team => {
    var wWp = 0;

    for (var i = 0; i < team["pointsFor"].length; i++) {
      if (team["pointsFor"][i] > team["pointsAllowed"][i]) {
        // Add the opponents TmRt
        wWp += teamRatings[team["opponents"][i]];
      } else if (team["pointsFor"][i] < team["pointsAllowed"][i]) {
        wWp += teamRatings[team["opponents"][i]] - 1.000;
      } else {
        wWp += teamRatings[team["opponents"][i]] - 0.500;
      }
    }

    
    wWp /= team["opponents"].length;
    team["wW%"] = wWp;
    team["PwrRt"] = (team["TmRt"] + wWp) / 2.0;
  });

  return {
    "meanPfpg": meanPfpg,
    "standardDeviationPfpg": standardDeviationPfpg,
    "scalingFactorPfpg": scalingFactorPfpg,
    "baseAtkRt": baseAtkRt,
    "meanPapg": meanPapg,
    "standardDeviationPapg": standardDeviationPapg,
    "scalingFactorPapg": scalingFactorPapg,
    "baseDefRt": baseDefRt,
    "TmRt": teamRatings,
    "data": data,
  };
}

console.log(computePowerRating(data));
