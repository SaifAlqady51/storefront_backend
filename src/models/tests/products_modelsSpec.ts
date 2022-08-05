import { ProductModel } from '../products_model';

const productStroe = new ProductModel();

describe('Product Model Tests', () => {
  describe('Test method existence', () => {
    it('should have index method', () => {
      expect(productStroe.index).toBeDefined();
    });
    it('should have show method', () => {
      expect(productStroe.show).toBeDefined();
    });
    it('should have create method', () => {
      expect(productStroe.create).toBeDefined();
    });
  });
});
