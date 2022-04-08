const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to github oauth page upon login', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('should login and redirect users to /api/v1/tweets/dashboard', async () => {
    const res = await request.agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
    // console.log('🚀 ~ file: app.test.js ~ line 27 ~ it ~ res', res);

    expect(res.req.path).toEqual('/api/v1/tweets');
  });
});
