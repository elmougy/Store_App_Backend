import express from "express";
import { OdrersModel, Order } from "../models/OrderModel";
import { OrderDetailstModel,Product_quantity} from "../models/orderDetailsModel";
import { verifyAuthToken } from "./utils";

const order_model = new OdrersModel();
const orderDetailstModel = new OrderDetailstModel();
const SECRET = process.env.TOKEN_SECRET;

type display_order = {
  odrer_id: number;
  details: Product_quantity[];
};

const current_Orders_by_user = async (req: express.Request, res: express.Response) => {
  const user_id = Number(req.query.user_id);
  console.log(`user_id is ${user_id}`);
  if (user_id) {
    try {
      const orders = await order_model.current_Orders_by_user(user_id);
      if (orders) {
        let order;
        let result;
        let details: display_order[] = [];
        for (order of orders) {
          result = await get_order_details(order.id as number);
          details.push({ odrer_id: order.id as number, details: result });
        }
        res.json(details);
      }

      //res.json(order);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  } else {
    res.status(400);
    res.json("please enter a valid user_id");
  }
};

const closed_Orders_by_user = async (req: express.Request,res: express.Response) => {
  const user_id = Number(req.query.user_id);
  console.log(`user_id is ${user_id}`);
  if (user_id) {
    try {
      const orders = await order_model.Completed_Orders_by_user(user_id);
      if (orders) {
        let order;
        let result;
        let details: display_order[] = [];
        for (order of orders) {
          result = await get_order_details(order.id as number);
          details.push({ odrer_id: order.id as number, details: result });
        }
        res.json(details);
      }
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  } else {
    res.status(400);
    res.json("please enter a valid user_id");
  }
};

const get_order_details = async (order_id: number): Promise<Product_quantity[]> => {
  let product_quantity: Product_quantity[] = [];
  try {
    const result = await orderDetailstModel.getOrderDetails(order_id);
    let item;

    if (result) {
      for (item of result) {
        product_quantity.push({
          product_id: item.product_id,
          quantity: item.quantity,
        });
      }
    }
    return product_quantity;
  } catch (error) {
    console.log("cant find order details.....");
  }
  return product_quantity;
};

export const orders_routes = (app: express.Application) => {
  app.get("/order/current", verifyAuthToken, current_Orders_by_user);
  app.get("/order/closed", verifyAuthToken, closed_Orders_by_user);
};
