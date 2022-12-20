import client from "../database";

export type Product = {
  // (id SERIAL PRIMARY KEY, name VARCHAR, price INTEGER, category VARCHAR)
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      console.log("trying to connect....");
      const connection = await client.connect();
      console.log("connected to db....");
      const query = "select * from products";
      const result = await connection.query(query);
      connection.release();
      console.log("products retreived");
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error("cant find products");
    }
  }

  async show(id: number): Promise<Product> {
    try {
      console.log(`id = ${id}`);
      console.log("trying to connect....");
      const connection = await client.connect();
      console.log("connected to db....");
      const query = "select * from products where id =($1)";
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`cant find products with id ${id}`);
    }
  }

  async create(item: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const query =
        "INSERT INTO products (name , price , category) VALUES ($1, $2, $3) RETURNING * ";
      const result = await connection.query(query, [
        item.name,
        item.price,
        item.category,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`cant create prodoct ${item.name}`);
    }
  }

  //    async productsByCategory(category: string): Promise<Product[]> {
  //     try {
  //         const connection = await client.connect();
  //         const query = 'select * from products where category=($1) ' ;
  //         const result = await connection.query(query,[category]);
  //         connection.release();
  //         return result.rows;
  //     } catch (error) {
  //         console.log(error);
  //         throw new Error(`cant find products with category ${category}`);
  //     }
  //     };
}
