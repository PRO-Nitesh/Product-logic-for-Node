/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Product } from '@interfaces/products.interface';
import { ProductService } from '@services/products.service';

export class ProductController {
 
    public product = Container.get(ProductService);

    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const findAllProductsData: Product[] = await this.product.findAllProduct();
  
        res.status(200).json({ data: findAllProductsData, message: 'findAll' });
      } catch (error) {
        next(error);
      }
    };
  
    public getProductById = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const product_id: string = req.params.id;
        const productData : Product=req.body;
        const findOneProductData: Product = await this.product.findProductById(product_id,productData);
  
        res.status(200).json({ data: findOneProductData, message: 'findOne' });
      } catch (error) {
        next(error);
      }
    };
  
    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const productData: Product = req.body;
        const createProductData: Product = await this.product.createProduct(productData);
  
        res.status(201).json({ data: createProductData, message: 'created' });
      } catch (error) {
        next(error);
      }
    };
  
    // public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const product_id: string = req.params.id;
    //     const productData: Product = req.body;
    //     const updateProductData: Product = await this.product.updateProducts(product_id, productData);
  
    //     res.status(200).json({ data: updateProductData, message: 'updated' });
    //   } catch (error) {
    //     next(error);
    //   }
    // };
    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const ProductId: string = req.params.id;
        const productData: Product = req.body;
        const updateProductData: Product = await this.product.updateProduct(ProductId, productData);
  
        res.status(200).json({ data: updateProductData, message: 'updated' });
      } catch (error) {
        next(error);
  }
  };
 
    public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const product_id: string = req.params.id;
        const productData: Product=req.body;
        const deleteProductData: Product = await this.product.deleteProduct(product_id,productData);
  
        res.status(200).json({ data: deleteProductData, message: 'deleted' });
      } catch (error) {
        next(error);
      }
    };
  }