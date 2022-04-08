const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/utils/github');
jest.mock('../lib/middleware/authenticate');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should allow user to post tweets', async () => {
    await GithubUser.insert({
      username: 'maze',
      email: 'a@b.com',
      avatar: 'coockoomagoo.com'
    });

    const req = await request(app)
      .post('/api/v1/tweets')
      .send({ tweet: 'this is my first tweet' });

    const expected = {
      id: expect.any(String),
      tweet: 'this is my first tweet',
      username: 'maze'
    };

    expect(req.body).toEqual(expected);
  });

  // it('should get all posts from all users', async () => {
  //   await GithubUser.insert({
  //     username: 'maze',
  //     email: 'a@b.com',
  //     avatar: 'coockoomagoo.com'
  //   });

  //   const res = await request.agent(app).get('/api/v1/posts');

  //   expect(res.body).toEqual([
  //     {
  //       id: expect.any(String),
  //       tweet: 'this is my first tweet',
  //       username: 1
  //     },
  //     {
  //       id: expect.any(String),
  //       tweet: 'this is my second tweet',
  //       username: 1
  //     }
  //   ]);

  // });
});
