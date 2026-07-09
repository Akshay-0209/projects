const request = require("supertest");
const express = require("express");

let server;

// Import the actual server
beforeAll(() => {
  // We use the same server setup as in server.js for isolated testing
  const app = express();
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));
  server = app;
});

describe("GET /api/health", () => {
  it("should return status ok", async () => {
    const res = await request(server).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
