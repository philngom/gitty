const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');
jest.mock('../lib/utils/middleware/authenticate');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should get all posts from all users', async () => {
    const res = await request(app).get('/api/v1/posts');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        tweet: 'this is my first tweet',
        username: 1
      },
      {
        id: expect.any(String),
        tweet: 'this is my second tweet',
        username: 2
      }
    ]);

  });
});
