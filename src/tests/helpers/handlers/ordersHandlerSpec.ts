import supertest from "supertest";
import app from "../../../server";
import { Order } from "../../../models/OrderModel";

// export const orders_routes = (app: express.Application) =>{
//     app.get('/order/current',verifyAuthToken,current_Orders_by_user);
//     app.get('/order/closed',verifyAuthToken,closed_Orders_by_user);
// };
const request = supertest(app);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoiJDJiJDEwJFJ0S3NlSTRxTTNpUDY0UjdLU2NPM2VOM3YvSWt1dmpWa0NaY2NYemphYlJ5MGNmYlBkU2s2In0sImlhdCI6MTY3MDc2MDQ3NX0.zIzaDzGbY04Qmd-lcpgFHpsL9GvOVqzOF6k02Q91XKk";

describe("orders handler testing ", () => {
  it(`Users endpoint "/order/current?user_id=1" returning current_Orders_by_user `, async () => {
    const response = await request
      .get("/order/current?user_id=1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
  });
  it(`Users endpoint "/order/current" to throw error `, async () => {
    const response = await request
      .get("/order/current")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
  });

  it(`Users endpoint "/order/closed?user_id=1" returning closed_Orders_by_user `, async () => {
    const response = await request
      .get("/order/closed?user_id=1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
  });
  it(`Users endpoint "/order/closed" to throw error `, async () => {
    const response = await request
      .get("/order/closed")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
  });
});
