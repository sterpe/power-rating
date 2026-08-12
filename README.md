# power-rating
Compute the NCAA &lt;> NIRA Division I Women's XVs PwrRt.

## Usage
 
```js
const { computePowerRating, data } = require('power-rating');
 
const result = computePowerRating(data);
console.log(result.data); // per-team stats + ratings, sorted as input
```
 
## Data shape
 
```js
{
  institute: DARTMOUTH,
  games: [
    { opponent: QUINNIPIAC, pointsFor: 59, pointsAllowed: 0 },
    { opponent: NAVY, pointsFor: 52, pointsAllowed: 7 },
  ],
}
```
 
Teams with no games (`games: []`) are excluded from the output.
 
## Algorithm
 
1. **Per-team stats**: record (W/L/D), points for/against, and per-game
   rates. Points-for is capped at 65/game before averaging, so blowouts
   don't inflate a team's offensive rate.
2. **Offense/defense ratings** (`AtkRt`, `DefRt`): each team's capped
   points-for-per-game and points-allowed-per-game are z-scored against
   the league and re-centered on 0.5. Higher `AtkRt` = better offense;
   higher `DefRt` = better defense (fewer points allowed).
   - If the league has zero spread on either stat (every team identical),
     that rating defaults to 0.5 for everyone rather than dividing by zero.
3. **Team rating** (`TmRt`): `AtkRt + DefRt`.
4. **Weighted win %** (`wW%`): average, across all games, of the
   opponent's `TmRt` (win), `TmRt - 1` (loss), or `TmRt - 0.5` (draw).
   Beating a strong opponent counts for more than beating a weak one.
5. **Power rating** (`PwrRt`): `(TmRt + wW%) / 2`. The final output ranking.
## Output
 
`computePowerRating(teams)` returns:
 
| Field | Description |
|---|---|
| `data` | Each team's stats and ratings (`wins`, `losses`, `draws`, `pf`, `pa`, `pd`, `pfpg`, `papg`, `AtkRt`, `DefRt`, `TmRt`, `wW%`, `PwrRt`) |
| `TmRt` | Map of team name → raw team rating |
| `meanPfpg`, `standardDeviationPfpg` | League-wide offense stats |
| `meanPapg`, `standardDeviationPapg` | League-wide defense stats |
 
