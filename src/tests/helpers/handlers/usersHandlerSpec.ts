import supertest from "supertest";
import app from "../../../server";
import { User } from "../../../models/UserModel";

const request = supertest(app);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoiJDJiJDEwJFJ0S3NlSTRxTTNpUDY0UjdLU2NPM2VOM3YvSWt1dmpWa0NaY2NYemphYlJ5MGNmYlBkU2s2In0sImlhdCI6MTY3MDc2MDQ3NX0.zIzaDzGbY04Qmd-lcpgFHpsL9GvOVqzOF6k02Q91XKk";

describe("Users handler testing ", () => {
  it(`Users endpoint "/user" returning index `, async () => {
    const response = await request
      .get("/user")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
  });

  it(`Users endpoint "/user/1" show user with id 1 `, async () => {
    const response = await request
      .get("/user/1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
  });

  it(`Users endpoint "/user/1" show throw error  `, async () => {
    const response = await request
      .get("/user/0")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
  });

  it(`Users endpoint "/user" create user `, async () => {
    const new_user: User = {
      firstName: "first name",
      lastName: "last name",
      password: "pass 1",
    };
    const response = await request.post("/user").send(new_user);
    expect(response.status).toBe(200);
  });

  it(`Users endpoint "/user/login" working `, async () => {
    const response = await request
      .post("/user/login")
      .send({ id: 1, password: "pass1" });
    expect(response.status).toBe(200);
  });
  it(`Users endpoint "/user/login" to throw error `, async () => {
    const response = await request
      .post("/user/login")
      .send({ id: 0, password: "pass1" });
    expect(response.status).toBe(401);
  });
});
