const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  email;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.email = row.email;
    this.avatar = row.avatar;
  }

  static async insert({ username, avatar, email }) {
    const { rows } = await pool.query(`
    INSERT INTO github_users(username, email, avatar)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [username, avatar, email]
    );

    return new GithubUser(rows[0]);
  }

  static async getByUsername(username) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        github_users
      WHERE
        username=$1
      `,
      [username]
    );

    if (!rows[0]) return null;

    return new GithubUser(rows[0]);
  }
}