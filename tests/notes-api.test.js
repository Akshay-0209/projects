const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

// Import the notes router and mock noteController
describe('/api/notes authentication and route', () => {
  let app;
  beforeAll(() => {
    // Mock note controller (skip DB logic)
    const noteController = {
      getNotes: (req, res) => res.json([{ id: 1, title: 'Sample' }]),
    };
    const auth = require('../middleware/auth');
    const router = express.Router();
    router.get('/notes', auth, noteController.getNotes);

    app = express();
    app.use(express.json());
    app.use('/api', router);
  });

  it('should return 401 if no Authorization header', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 401 if invalid JWT', async () => {
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 200 and array if valid JWT (mocked)', async () => {
    const token = jwt.sign({ id: 123, email: 'test@example.com' }, 'secret');
    const res = await request(app)
      .get('/api/notes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
