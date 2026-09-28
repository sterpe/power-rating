const SEASON_DATA = require('./data/season_data.js');

const {
  computePowerRating
} = require('./power_rating');

module.exports = {
  computePowerRating,
  data: SEASON_DATA,
};
