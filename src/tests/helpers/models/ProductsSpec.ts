import { ProductModel, Product } from "../../../models/ProductModel";

const product_model = new ProductModel();

describe("Product Model testing ", () => {
  describe("Product Model index function ", () => {
    it("Product Model should have an index method", () => {
      expect(product_model.index).toBeDefined();
    });
    it("Product Model index function returns products", async () => {
      const result = await product_model.index();
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Product Model show function ", () => {
    it("Product Model should have an show method", () => {
      expect(product_model.show).toBeDefined();
    });
    it("Product Model show method returns product ", async () => {
      const result = await product_model.show(1);
      expect(result.name).toBeDefined();
    });
    it("Product Model show method should throw error ", async () => {
      expect(await product_model.show(0)).toThrowError;
    });
  });

  describe("Product Model create function ", () => {
    it("Product Model should have a create method", () => {
      expect(product_model.create).toBeDefined();
    });
    it("Product Model create method creates product ", async () => {
      const product: Product = {
        name: "test_product",
        price: 10,
        category: "test_category",
      };
      const result = await product_model.create(product);
      expect(result.name).toBe("test_product");
    });

    it("Product Model create method should throw error ", async () => {
      const product: Product = {
        name: "",
        price: 10,
        category: "test_category",
      };
      expect(await product_model.create(product)).toThrowError;
    });
  });
});
