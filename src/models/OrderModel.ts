import client from "../database";

//orders (id SERIAL PRIMARY KEY,user_id INTEGER REFERENCES users(id), order_status status);
export type Order = {
  id?: number;
  user_id: string;
  order_status: string;
};

export class OdrersModel {
  async index(): Promise<Order[]> {
    try {
      console.log("trying to connect....");
      const connection = await client.connect();
      console.log("connected to db....");
      const query = "select * from orders";
      const result = await connection.query(query);
      connection.release();
      console.log("orders retreived");
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error("cant find orders");
    }
  }

  async show(id: number): Promise<Order> {
    try {
      console.log(`id = ${id}`);
      console.log("trying to connect....");
      const connection = await client.connect();
      console.log("connected to db....");
      const query = "select * from orders where id =($1)";
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`cant find orders with id ${id}`);
    }
  }

  //    async create(item: Order): Promise<Order> {
  //     try {
  //         const connection = await client.connect();
  //         const query = 'INSERT INTO orders (user_id , order_status ) VALUES ($1, $2) RETURNING * ' ;
  //         const result = await connection.query(query,[item.user_id, item.order_status]);
  //         connection.release();
  //         return result.rows[0];
  //     } catch (error) {
  //         console.log(error);
  //         throw new Error(`cant create Order `);
  //     }
  //    };

  async current_Orders_by_user(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const query = " select * from orders where user_id =($1)";
      const result = await connection.query(query, [user_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error(`cant create user `);
    }
  }

  async Completed_Orders_by_user(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const query =
        "select * from orders where user_id =($1) and order_status='complete'";
      const result = await connection.query(query, [user_id]);
      connection.release();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error(`no completed orders.... `);
    }
  }
}
