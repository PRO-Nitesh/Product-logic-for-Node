/* eslint-disable prettier/prettier */
//import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Product } from '@interfaces/products.interface';
import { ProductModel } from '@models/products.model';
import { randomUUID } from 'crypto';

@Service()
export class ProductService {
  // public async findAllProduct(): Promise<Product[]> {
  //   const users: Product[] = await ProductModel.find();
  //   return users;
  // }
 /*USING QUERY PARAMS FOR FINDALLPRODUCT */

public async findAllProduct(queryParams: any): Promise<Product[]> {
  const products: Product[] = await ProductModel.find(queryParams);
  return products;
}




  public async findProductById(productId: string,productData:Product): Promise<Product> {
    const findProductById: Product = await ProductModel.findOne({ ProductId: productData.ProductId});

    return findProductById;
  }

  public async createProduct(productData: Product): Promise<Product> {
    productData.ProductId=randomUUID();
   
    const createUserData: Product = await ProductModel.create({ ...productData});

    return createUserData;
  }

  public async updateProduct(_id: string, productData: Product): Promise<Product> {
    
    const updateProductById: Product = await ProductModel.findByIdAndUpdate( _id, { ...productData });
   
    return updateProductById;
  }

  public async deleteProduct(_id: string): Promise<Product> {
    const deleteProductById: Product = await ProductModel.findByIdAndDelete(_id);

    return deleteProductById;
  }
  
  public async createMultipleProducts(products: Product[]): Promise<void> {
    try {
      await ProductModel.insertMany(products);
    } catch (error) {
      throw new Error('Failed to create multiple products');
    }
  }
  
}
