const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');
const Tweet = require('../lib/models/Tweet');

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

  it('should get all posts from all users', async () => {
    const user = await GithubUser.insert({
      username: 'maze',
      email: 'a@b.com',
      avatar: 'coockoomagoo.com'
    });

    await Tweet.insert({
      tweet: 'this is my first tweet',
      username: user.username
    });
    await Tweet.insert({
      tweet: 'this is my second tweet',
      username: user.username
    });

    const res = await request(app)
      .get('/api/v1/tweets');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        tweet: 'this is my first tweet',
        username: 'maze'
      },
      {
        id: expect.any(String),
        tweet: 'this is my second tweet',
        username: 'maze'
      }
    ]);

  });
});
