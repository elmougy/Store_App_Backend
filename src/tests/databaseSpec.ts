import client from "../database";

describe("testing client connection..", () => {
  it(`database valid connection parameters working`, async () => {
    const connection = await client.connect();
    connection.release();
    expect(connection).toBeDefined();
  });
});
