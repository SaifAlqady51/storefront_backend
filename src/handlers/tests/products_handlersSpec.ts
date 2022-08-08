import express , {NextFunction, Request, Response} from 'express';
import { index, show, create,destroy, update, getProudctsByCategory } from '../products_handler';
import { ProductModel } from '../../models/products_model';
import { Product } from '../../types/product_type';
import client from '../../database';
const productStore = new ProductModel();


describe('Test products handlers',() => {
    describe('Test product methods existence',() => {
        it('Test index method existence', () => {
            expect(index).toBeDefined();
        })
        it('Test show method existence', () => {
            expect(show).toBeDefined();
        })
        it('Test create method existence', () => {
            expect(create).toBeDefined();
        })
        it('Test destroy method existence', () => {
            expect(destroy).toBeDefined();
        })
        it('Test update method existence', () => {
            expect(update).toBeDefined();
        })
        it('Test getProductsByCategory method existence', () => {
            expect(getProudctsByCategory).toBeDefined();
        })
    })

    describe('Test product handlers methods',() => {
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

          let req:Request;
          let res : Response;
          const next = () =>{return};

        beforeAll(async() => {
            req = {
            } as Request
            res ={
                
            } as Response
            productStore.create(product_1)
            // productStore.create(product_2)
        })

        afterAll(async() => {
            const connection = await client.connect()
            const sql = `DELETE FROM products`;
            const sql_alter = `ALTER SEQUENCE products_id_seq RESTART WITH 1`
            await connection.query(sql).then(() => connection.query(sql_alter))
            connection.release()
        })

        it('Test index methods',async() => {

            const products = await index(req,res,next)
            console.log(products)
        
        })
    })
})