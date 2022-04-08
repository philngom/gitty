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

  static async insert({ tweet, username }) {
    const { rows } = await pool.query(`
    INSERT INTO tweets (tweet, username)
    VALUES ($1, $2)
    RETURNING *`,
    [tweet, username]);

    return new Tweet(rows[0]);
  }

  static async getAllTweets() {
    const { rows } = await pool.query(`
    SELECT *
    FROM tweets
    `);

    return rows.map((row) => new Tweet(row));
  }
};
