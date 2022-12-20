import supertest from "supertest";
import app from "../../../server";
import { Product } from "../../../models/ProductModel";

const request = supertest(app);
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoiJDJiJDEwJFJ0S3NlSTRxTTNpUDY0UjdLU2NPM2VOM3YvSWt1dmpWa0NaY2NYemphYlJ5MGNmYlBkU2s2In0sImlhdCI6MTY3MDc2MDQ3NX0.zIzaDzGbY04Qmd-lcpgFHpsL9GvOVqzOF6k02Q91XKk";

// const products_routes = (app: express.Application) =>{
//     app.get('/products',index);
//     app.get('/products/:id',show);
//     app.post('/products',verifyAuthToken,create);
// };

describe("Product handler testing ", () => {
  it(`Product endpoint "/products" returning index `, async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it(`Product endpoint "/products/:id" returning roduct with id=1 `, async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });
  it(`Product endpoint POST "/products" creating roduct `, async () => {
    const product: Product = {
      name: "prod1",
      price: 10,
      category: "cat 1",
    };
    const response = await request
      .post("/products")
      .set("Authorization", "bearer " + token)
      .send(product);
    expect(response.status).toBe(200);
  });
});
