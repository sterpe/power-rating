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
// RAW_DATA_BY_YEAR maps a season year to that season's team/game data.
const RAW_DATA_BY_YEAR = {
  // Weeks 1-3 of the 2025 Division I Fall Season.
  2025: [
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
  ],

  // Weeks 1-3 of the 2026 DI Fall season.
  2026: [
    {
      institution: BROWN,
      games: [
        { opponent: NAVY, pointsFor: 33, pointsAllowed: 17 },
        { opponent: HARVARD, pointsFor: 0, pointsAllowed: 76 },
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
        { opponent: SHU, pointsFor: 24, pointsAllowed: 17 },
      ],
    },
    {
      institution: HARVARD,
      games: [
        { opponent: SHU, pointsFor: 26, pointsAllowed: 24 },
        { opponent: BROWN, pointsFor: 76, pointsAllowed: 0 },
      ],
    },
    {
      institution: SHU,
      games: [
        { opponent: HARVARD, pointsFor: 24, pointsAllowed: 26 },
        { opponent: ARMY, pointsFor: 17, pointsAllowed: 24 },
      ],
    },
    {
      institution: PRINCETON,
      games: [
        { opponent: LASALLE, pointsFor: 52, pointsAllowed: 17 },
        { opponent: LIU, pointsFor: 91, pointsAllowed: 0 },
      ],
    },
    {
      institution: LASALLE,
      games: [
        { opponent: PRINCETON, pointsFor: 17, pointsAllowed: 52 },
        { opponent: MSM, pointsFor: 25, pointsAllowed: 17 },
      ],
    },
    {
      institution: LIU,
      games: [
        { opponent: MSM, pointsFor: 29, pointsAllowed: 28 },
        { opponent: PRINCETON, pointsFor: 0, pointsAllowed: 91 },
      ],
    },
    {
      institution: MSM,
      games: [
        { opponent: LIU, pointsFor: 28, pointsAllowed: 29 },
        { opponent: LASALLE, pointsFor: 17, pointsAllowed: 25 },
      ],
    },
    {
      institution: LINDENWOOD,
      games: [
        { opponent: QUEENS, pointsFor: 103, pointsAllowed: 5 },
      ],
    },
    {
      institution: QUEENS,
      games: [
        { opponent: LINDENWOOD, pointsFor: 5, pointsAllowed: 103 },
      ],
    },
  ],
};

module.exports = RAW_DATA_BY_YEAR;
