import express from "express";
import request from "supertest";
import { csrfMiddleware } from "../../middlewares/csrf";

const app = express();
app.use(express.json(), csrfMiddleware);
app.post("/course", (req, res) => { res.json(req.body); });

describe("browser mutation protection", () => {
  it("rejects a cross-origin write", async () => {
    await request(app).post("/course").set("Origin", "https://attacker.example").send({ title: "Course" }).expect(403);
  });

  it("accepts the configured origin", async () => {
    const response = await request(app).post("/course").set("Origin", "http://localhost:3000")
      .send({ title: "Safe" })
      .expect(200);
    expect(response.body.title).toBe("Safe");
  });
});
