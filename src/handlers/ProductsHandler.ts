import express from "express";
import { ProductModel, Product } from "../models/ProductModel";
import { verifyAuthToken } from "./utils";

const product_model = new ProductModel();
const index = async (req: express.Request, res: express.Response) => {
  try {
    const product_list = await product_model.index();
    res.json(product_list);
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
      const product = await product_model.show(id as number);
      res.json(product);
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
  const product: Product = {
    name: req.body.name as string,
    price: req.body.price as number,
    category: req.body.category as string,
  };

  try {
    const new_product = await product_model.create(product);
    res.json(new_product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const products_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
};

export default products_routes;
