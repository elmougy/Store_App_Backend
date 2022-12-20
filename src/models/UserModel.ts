import client from "../database";
import bcrypt from "bcrypt";

//(id ,firstName , lastName , password )
export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UsersModel {
  async index(): Promise<User[]> {
    try {
      console.log("trying to connect....");
      const connection = await client.connect();
      console.log("connected to db....");
      const query = "select * from users";
      const result = await connection.query(query);
      connection.release();
      console.log("Users retreived");
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error("cant find users");
    }
  }

  async show(id: number): Promise<User> {
    try {
      console.log(`id = ${id}`);
      console.log("trying to connect....");
      const connection = await client.connect();
      console.log("connected to db....");
      const query = "select * from users where id =($1)";
      const result = await connection.query(query, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`cant find User with id ${id}`);
    }
  }

  async create(user: User): Promise<User> {
    const hash = bcrypt.hashSync(
      user.password + BCRYPT_PASSWORD,
      parseInt(SALT_ROUNDS as string)
    );
    try {
      const connection = await client.connect();
      const query =
        "INSERT INTO users (firstName , lastName , password ) VALUES ($1, $2, $3) RETURNING *";
      const result = await connection.query(query, [
        user.firstName,
        user.lastName,
        hash,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error(`cant create user `);
    }
  }

  async authenticate(user_id: number, password: string): Promise<User | null> {
    try {
      const query = "SELECT password FROM users WHERE id=($1)";
      const connection = await client.connect();
      const result = await connection.query(query, [user_id]);
      connection.release();

      if (result.rows.length > 0) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error(`invalid login for user: ${user_id}`);
    }
    return null;
  }
}
