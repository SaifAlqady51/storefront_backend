import { ProductModel } from '../products_model';
import { Product } from '../../types/product_type';
import { index } from '../../handlers/products_handler';
import client from '../../database';
const productStore = new ProductModel();

describe('Product Model Tests', () => {
  describe('Test method existence', () => {
    it('should have index method', () => {
      expect(productStore.index).toBeDefined();
    });
    it('should have show method', () => {
      expect(productStore.show).toBeDefined();
    });
    it('should have create method', () => {
      expect(productStore.create).toBeDefined();
    });
    it('should have destroy method', () => {
      expect(productStore.destroy).toBeDefined();
    });
    it('should have update method', () => {
      expect(productStore.update).toBeDefined();
    });
    it('should have getProudctsByCategory method', () => {
      expect(productStore.getProudctsByCategory).toBeDefined();
    });
  });

  describe('Test Products method', () => {
    const product_1 : Product = {
      id:1,
      name:'apple',
      price:10,
      category: 'fruit'
    } 

    const product_2 : Product = {
      id:2,
      name:'cucumber',
      price:10,
      category: 'vegetables'
    }
    const product_3 : Product = {
      id:3,
      name:'potato',
      price:15,
      category: 'vegetables'
    }



    beforeAll(async () => {
      await productStore.create(product_1)
      await productStore.create(product_2)
    });
    afterAll(async() => {
      const connection = await client.connect()
      const sql = `DELETE FROM products`;
      const sql_alter = `ALTER SEQUENCE products_id_seq RESTART WITH 1`
      await connection.query(sql).then(() => connection.query(sql_alter))
      connection.release()
    })

    it('Test index method',async() => {
      const products = await productStore.index();
      expect(products).toEqual([product_1,product_2])

    })

    it('Test show method',async() => {
      const product = await productStore.show('1');
      expect(product).toEqual(product_1)
    })


    it('Test create method',async () => {
      const createdPorduct = await productStore.create(product_3);
      expect(createdPorduct).toEqual(product_3)
    });

    it('Test destroy method', async() => {
      const deletedProduct = await productStore.destroy('1');
      const products = await productStore.index();
      expect(deletedProduct).toEqual(product_1)
      expect(products).toEqual([product_2,product_3])
    })
    it('Test update method', async() => {
      const updatedProduct = await productStore.update('2','milk',13,"dairy");
      expect(updatedProduct).toEqual({
        id:2,
        name:'milk',
        price:13,
        category:'dairy'
      })
    })

    it('Test getProudctsByCategory method', async() => {
      const product  = await productStore.getProudctsByCategory('dairy');
      expect(product).toEqual({
        id:2,
        name:'milk',
        price:13,
        category:'dairy'
      })
    })

  })
});
