/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Product } from '@interfaces/products.interface';
import { ProductService } from '@services/products.service';
import { UploadedFile } from 'express-fileupload';
import csvParser from 'csv-parser';
import fs from 'fs';

export class ProductController {
 
    public product = Container.get(ProductService);

    // public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const findAllProductsData: Product[] = await this.product.findAllProduct();
  
    //     res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    //   } catch (error) {
    //     next(error);
    //   }
    // };
    
    /* GET PRODUCT  QUERY PARAMS kar raha hu*/

    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const queryParams: any = {};
    
        if (req.query.productName) {
          queryParams.ProductName = req.query.productName;
        }
    
        if (req.query.quantity) {
          queryParams.Quantity = req.query.quantity;
        }
    
        if (req.query.isActive) {
          queryParams.IsActive = req.query.isActive;
        }
    
        if (req.query.productId) {
          queryParams.ProductId = req.query.productId;
        }
    
        const findAllProductsData: Product[] = await this.product.findAllProduct(queryParams);
    
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

    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const product_id: string = req.params.id;
        const productData: Product = req.body;
        const updateProductData: Product = await this.product.updateProduct(product_id, productData);
        //if(updateProductData==null) res.status(204).json({Message:"No data available"})
        res.status(200).json({ data: updateProductData, message: 'updated' });
      } catch (error) {
        next(error);
      }
    };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductId: string = req.params.id;
      const deleteProductData: Product = await this.product.deleteProduct(ProductId);

      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public uploadCsv = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files || !req.files.csvFile) {
        return res.status(400).json({ message: 'CSV file is required' });
      }

      const csvFile: UploadedFile = req.files.csvFile as UploadedFile;
      const csvData: Buffer = csvFile.data;

      const productsFromCsv: Product[] = [];
      fs.createReadStream(csvData)
        .pipe(csvParser())
        .on('data', (row) => {
          const productData: Product = {
            ProductName: row.ProductName,
            Quantity: parseInt(row.Quantity),
            IsActive: row.IsActive === 'true',
          };
          productsFromCsv.push(productData);
        })
        .on('end', async () => {
          await this.product.createMultipleProducts(productsFromCsv);

          res.status(200).json({ message: 'CSV file uploaded and processed' });
        });

    } catch (error) {
      next(error);
    }
  };

   
}

  
   
  