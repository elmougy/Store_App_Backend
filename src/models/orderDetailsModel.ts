import client from "../database";

//(order_id ,product_id , quantity )
export type Detail = {
  order_id: number;
  product_id: number;
  quantity: number;
};
export type Product_quantity = {
  product_id: number;
  quantity: number;
};

export class OrderDetailstModel {
  async getDetails(order_id: number, product_id: number): Promise<Detail[]> {
    try {
      console.log(`order_id = ${order_id} , product_id ${product_id}`);
      console.log("trying to connect....");
      const connection = await client.connect();
      console.log("connected to db....");
      const query =
        "select * from order_details where order_id =($1) AND product_id =($2)";
      const result = await connection.query(query, [order_id, product_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error(`cant find order details.... `);
    }
  }

  async getOrderDetails(order_id: number): Promise<Detail[]> {
    try {
      console.log(`order_id = ${order_id} `);
      console.log("trying to connect....");
      const connection = await client.connect();
      console.log("connected to db....");
      const query = "select * from order_details where order_id =($1)";
      const result = await connection.query(query, [order_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error(`cant find order details.... `);
    }
  }

  async addDetail(detail: Detail): Promise<Detail> {
    console.log(
      `details for ${detail.order_id} , product_id ${detail.product_id}`
    );
    console.log("trying to connect....");
    const connection = await client.connect();
    console.log("connected to db....");
    const query =
      "INSERT INTO order_details (order_id ,product_id , quantity) VALUES ($1, $2,$3)";
    const result = await connection.query(query, [
      detail.order_id,
      detail.product_id,
      detail.quantity,
    ]);
    connection.release();
    return result.rows[0];
  }
}
