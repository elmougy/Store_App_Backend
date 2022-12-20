import express from "express";
//import client from './database';
import bodyParser from "body-parser";
import cors from "cors";
import products_routes from "./handlers/ProductsHandler";
import { users_routes } from "./handlers/UsersHandler";
import { orders_routes } from "./handlers/OrdersHandler";

const app = express();
const port = process.env.SERVER_PORT as unknown as number;
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("hello world");
});

products_routes(app);
users_routes(app);
orders_routes(app);

app.listen(port, () => {
  console.log(`server startes at port ${port}`);
});

export default app;
