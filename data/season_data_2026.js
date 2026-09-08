const {
  DARTMOUTH,
  HARVARD,
  SHU,
  LINDENWOOD,
  ARMY,
  QUINNIPIAC,
  LIU,
  NAVY,
  BROWN,
  QUEENS,
  PRINCETON,
  MSM,
  LASALLE,
} = require('./schools.js');

// Each team is its institution name plus a list of games. Each game
// is a self-contained record of opponent/pointsFor/pointsAllowed.
// This data reflects Week 1 of the 2026 DI Fall season
const RAW_DATA = [
  {
    institution: BROWN,
    games: [
      { opponent: NAVY, pointsFor: 33, pointsAllowed: 17 },
    ],
  },
  {
    institution: NAVY,
    games: [
      { opponent: BROWN, pointsFor: 17, pointsAllowed: 33 },
    ],
  },

  {
    institution: DARTMOUTH,
    games: [
      { opponent: ARMY, pointsFor: 41, pointsAllowed: 8 },
    ],
  },
  {
    institution: ARMY,
    games: [
      { opponent: DARTMOUTH, pointsFor: 8, pointsAllowed: 41 },
    ],
  },
  {
    institution: HARVARD,
    games: [
      { opponent: SHU, pointsFor: 26, pointsAllowed: 24 },
    ],
  },
  {
    instituion: SHU,
    games: [
      { opponent: HARVARD, pointsFor: 24, pointsAllowed: 26 },
    ],
  },
  {
    institution: PRINCETON,
    games: [
      { opponent: LASALLE, pointsFor: 52, pointsAllowed: 17  },
    ],
  },
  {
    institution: LASALLE,
    games: [
      { opponent: PRINCETON, pointsFor: 17, pointsAllowed: 52 },
    ],
  },
  {
    institution: LIU,
    games: [
      { opponent: MSM, pointsFor: 29, pointsAllowed: 28 }
    ],
  },
  {
    institution: MSM,
    games: [
      { opponent: LIU, pointsFor: 28, pointsAllowed: 29 },
    ],
  },
];

module.exports = RAW_DATA;
