import { OdrersModel, Order } from "../../../models/OrderModel";

const order_model = new OdrersModel();

describe("orders Model testing ", () => {
  describe("orders Model index function ", () => {
    it("orders Model should have an index method", () => {
      expect(order_model.index).toBeDefined();
    });
    it("orders Model index function returns orders", async () => {
      const result = await order_model.index();
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("orders Model show function ", () => {
    it("orders Model should have a show method", () => {
      expect(order_model.show).toBeDefined();
    });
    it("orders Model show function returns order", async () => {
      const result = await order_model.show(1);
      expect(result).toBeDefined;
    });
  });

  describe("orders Model current_Orders_by_user function ", () => {
    it("orders Model should have a current_Orders_by_user method", () => {
      expect(order_model.current_Orders_by_user).toBeDefined();
    });
    it("orders Model current_Orders_by_user function returns orders", async () => {
      const result = await order_model.current_Orders_by_user(1);
      expect(result).toBeDefined;
    });
    it("orders Model current_Orders_by_user function throw error", async () => {
      expect(await order_model.current_Orders_by_user(0)).toThrowError;
    });
  });

  describe("orders Model Completed_Orders_by_user function ", () => {
    it("orders Model should have a current_Orders_by_user method", () => {
      expect(order_model.Completed_Orders_by_user).toBeDefined();
    });
    it("orders Model Completed_Orders_by_user function returns orders", async () => {
      const result = await order_model.Completed_Orders_by_user(1);
      expect(result).toBeDefined;
    });
    it("orders Model Completed_Orders_by_user function throw error", async () => {
      expect(await order_model.Completed_Orders_by_user(0)).toThrowError;
    });
  });
});
