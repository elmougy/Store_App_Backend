import { UsersModel, User } from "../../../models/UserModel";

const users_model = new UsersModel();

describe("Users Model testing ", () => {
  describe("Users Model index function ", () => {
    it("Users Model should have an index method", () => {
      expect(users_model.index).toBeDefined();
    });
    it("Users Model index function returns Users", async () => {
      const result = await users_model.index();
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Users Model show function ", () => {
    it("Users Model should have a show method", () => {
      expect(users_model.show).toBeDefined();
    });
    it("Users Model show method returns Users ", async () => {
      const result = await users_model.show(1);
      expect(result).toBeDefined();
    });
    it("Users Model show method should throw error ", async () => {
      expect(await users_model.show(0)).toThrowError;
    });
  });

  describe("Users Model create function ", () => {
    it("Users Model should have a create method", () => {
      expect(users_model.create).toBeDefined();
    });

    it("Users Model create method creates user ", async () => {
      const user: User = {
        firstName: "first_Name",
        lastName: "lastName",
        password: "pass1",
      };
      const result = await users_model.create(user);
      console.log(`new user created`);
      console.log({ result });
      expect(result).toBeDefined;
    });

    it("Users Model create method should throw error ", async () => {
      const user: User = {
        firstName: "",
        lastName: "",
        password: "",
      };
      expect(await users_model.create(user)).toThrowError;
    });
  });

  describe("Users Model authenticate function ", () => {
    it("Users Model should have an authenticate method", () => {
      expect(users_model.authenticate).toBeDefined();
    });

    it("Users Model authenticate method should throw error", () => {
      const user: User = {
        firstName: "firstName",
        lastName: "lastName",
        password: "pass1",
      };
      expect(users_model.authenticate(1, "pass1")).toBeDefined();
    });
  });
});
