const pool = require('../utils/pool');

module.exports = class Tweet {
  id;
  tweet;
  username;

  constructor(row) {
    this.id = row.id;
    this.tweet = row.tweet;
    this.username = row.username;
  }

  static async getAllTweets() {
    const { rows } = await pool.query(`
    SELECT *
    FROM tweets
    `);

    return new Tweet(rows[0]);
  }
};
