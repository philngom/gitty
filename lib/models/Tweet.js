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

  static insert({ tweet, username }) {
    return pool.query(`
    INSERT INTO tweets (tweet, username)
    VALUES ($1, $2)
    RETURNING *`,
    [tweet, username])
      .then(({ rows }) => new Tweet(rows[0]));
  }

  static getAllTweets() {
    return pool.query(`
    SELECT *
    FROM tweets
    `)
      .then(({ rows }) => rows.map((row) => new Tweet(row)));
    // return rows.map((row) => new Tweet(row));
  }
};
