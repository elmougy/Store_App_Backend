import express from "express";
import { UsersModel, User } from "../models/UserModel";
import jwt, { Secret } from "jsonwebtoken";
import { verifyAuthToken } from "./utils";

const user_model = new UsersModel();
const SECRET = process.env.TOKEN_SECRET;

const index = async (req: express.Request, res: express.Response) => {
  try {
    const users_list = await user_model.index();
    res.json(users_list);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  console.log(`id is ${id}`);
  if (id) {
    try {
      const user = await user_model.show(id as number);
      res.json(user);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  } else {
    res.status(400);
    res.json("please enter a valid id");
  }
};

const create = async (req: express.Request, res: express.Response) => {
  //firstName , lastName , password
  const user: User = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    password: req.body.password as string,
  };

  //console.log(`firstname: ${user.firstName} , lname: ${user.lastName} pass ${user.password}`);

  if (
    !(
      validateParam(user.firstName) &&
      validateParam(user.lastName) &&
      validateParam(user.password)
    )
  ) {
    res.status(400);
    res.send("please enter valid parameters (firstname, lastname, password)");
    return;
  }

  try {
    const new_user = await user_model.create(user);
    const token = jwt.sign({ new_user }, SECRET as Secret);
    //res.json(token);
    res.json(`new user created ... ${new_user} your token is: ${token}`);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  //authenticate
  const id = Number(req.body.id);
  const password = req.body.password as string;
  console.log(`trying to login id=${id} pass = ${password}`);
  if (id && validateParam(password)) {
    try {
      const user = await user_model.authenticate(id, password);
      if (user) {
        const token = jwt.sign({ user }, SECRET as Secret);
        res.json(token);
      } else {
        res.status(401);
        console.log("invalid login ... please try again....");
        res.json("invalid login ... please try again....");
      }
    } catch (error) {
      res.status(401);
      res.json("invalid login ... please try again....");
    }
  } else {
    res.status(401);
    res.json("please enter a valid user id and password..");
  }
};

const validateParam = (param: string): boolean => {
  if (param === "" || param === undefined || param === null) {
    return false;
  }
  return true;
};

export const users_routes = (app: express.Application) => {
  app.post("/user/login", login);
  app.get("/user", verifyAuthToken, index);
  app.get("/user/:id", verifyAuthToken, show);
  app.post("/user", create);
};
