const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');
const Tweet = require('../lib/models/Tweet');

jest.mock('../lib/utils/github');
// jest.mock('../lib/middleware/authenticate');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should allow user to post tweets', async () => {
    // await GithubUser.insert({
    //   username: 'fake_github_user',
    //   avatar: 'https://www.placecage.com/gif/300/300',
    //   email: 'not-real@example.com',
    // });
    const agent = request.agent(app);
    await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    const req = await agent
      .post('/api/v1/tweets')
      .send({ tweet: 'this is my first tweet' });

    const expected = {
      id: expect.any(String),
      tweet: 'this is my first tweet',
      username: 'fake_github_user'
    };

    expect(req.body).toEqual(expected);
  });

  it('should get all posts from all users', async () => {
    // const user = await GithubUser.insert({
    //   username: 'fake_github_user',
    //   avatar: 'https://www.placecage.com/gif/300/300',
    //   email: 'not-real@example.com',
    // });

    const agent = request.agent(app);
    await agent
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);


    await Tweet.insert({
      tweet: 'this is my first tweet',
      username: 'fake_github_user'
    });
    await Tweet.insert({
      tweet: 'this is my second tweet',
      username: 'fake_github_user'
    });

    const res = await agent
      .get('/api/v1/tweets');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        tweet: 'this is my first tweet',
        username: 'fake_github_user'
      },
      {
        id: expect.any(String),
        tweet: 'this is my second tweet',
        username: 'fake_github_user'
      }
    ]);

  });
});
