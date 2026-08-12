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

// Each team is its institution name plus a list of games. Each game is a
// self-contained record of opponent/pointsFor/pointsAllowed.
// This data reflects Weeks 1-3 of the 2025 Division I Fall Season.
const RAW_DATA = [
  {
    institution: DARTMOUTH,
    games: [
      { opponent: QUINNIPIAC, pointsFor: 59, pointsAllowed: 0 },
      { opponent: NAVY, pointsFor: 52, pointsAllowed: 7 },
    ],
  },
  {
    institution: HARVARD,
    games: [
      { opponent: LINDENWOOD, pointsFor: 26, pointsAllowed: 17 },
      { opponent: BROWN, pointsFor: 47, pointsAllowed: 8 },
    ],
  },
  {
    institution: SHU,
    games: [
      { opponent: BROWN, pointsFor: 45, pointsAllowed: 21 },
      { opponent: QUEENS, pointsFor: 91, pointsAllowed: 0 },
    ],
  },
  {
    institution: LINDENWOOD,
    games: [
      { opponent: ARMY, pointsFor: 34, pointsAllowed: 22 },
      { opponent: HARVARD, pointsFor: 17, pointsAllowed: 26 },
      { opponent: NAVY, pointsFor: 64, pointsAllowed: 17 },
    ],
  },
  {
    institution: ARMY,
    games: [
      { opponent: LINDENWOOD, pointsFor: 22, pointsAllowed: 34 },
      { opponent: LIU, pointsFor: 38, pointsAllowed: 0 },
      { opponent: QUEENS, pointsFor: 75, pointsAllowed: 0 },
    ],
  },
  {
    institution: QUINNIPIAC,
    games: [
      { opponent: DARTMOUTH, pointsFor: 0, pointsAllowed: 59 },
      { opponent: BROWN, pointsFor: 33, pointsAllowed: 14 },
      { opponent: LIU, pointsFor: 65, pointsAllowed: 33 },
    ],
  },
  {
    institution: LIU,
    games: [
      { opponent: PRINCETON, pointsFor: 54, pointsAllowed: 7 },
      { opponent: ARMY, pointsFor: 0, pointsAllowed: 38 },
      { opponent: QUINNIPIAC, pointsFor: 33, pointsAllowed: 65 },
    ],
  },
  {
    institution: NAVY,
    games: [
      { opponent: QUEENS, pointsFor: 58, pointsAllowed: 7 },
      { opponent: DARTMOUTH, pointsFor: 7, pointsAllowed: 52 },
      { opponent: LINDENWOOD, pointsFor: 17, pointsAllowed: 64 },
    ],
  },
  {
    institution: BROWN,
    games: [
      { opponent: SHU, pointsFor: 21, pointsAllowed: 45 },
      { opponent: QUINNIPIAC, pointsFor: 14, pointsAllowed: 33 },
      { opponent: HARVARD, pointsFor: 8, pointsAllowed: 47 },
    ],
  },
  {
    institution: QUEENS,
    games: [
      { opponent: NAVY, pointsFor: 7, pointsAllowed: 58 },
      { opponent: SHU, pointsFor: 0, pointsAllowed: 91 },
      { opponent: ARMY, pointsFor: 0, pointsAllowed: 75 },
    ],
  },
  {
    institution: PRINCETON,
    games: [{ opponent: LIU, pointsFor: 7, pointsAllowed: 54 }],
  },
  {
    institution: MSM,
    games: [],
  },
  {
    institution: LASALLE,
    games: [],
  },
];

module.exports = RAW_DATA;
