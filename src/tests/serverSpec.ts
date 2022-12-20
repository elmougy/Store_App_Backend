import supertest from "supertest";
import app from "../server";

describe("Testing API endpoint", () => {
  const request = supertest(app);
  it(`api endpoint "/" is working`, async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
