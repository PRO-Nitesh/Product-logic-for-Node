/* eslint-disable prettier/prettier */
//import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Product } from '@interfaces/products.interface';
import { ProductModel } from '@models/products.model';
import { randomUUID } from 'crypto';

@Service()
export class ProductService {
  public async findAllProduct(): Promise<Product[]> {
    const users: Product[] = await ProductModel.find();
    return users;
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

  public async updateProducts(_id: string, productData: Product): Promise<Product> {
    if (productData.ProductName) {
      const findProduct: Product = await ProductModel.findOne({ ProductName: productData.ProductName });
      if (findProduct && findProduct.ProductId != _id) throw new HttpException(409, `This product ${productData.ProductName} already exists`);
    }
    const updateProductById: Product = await ProductModel.findByIdAndUpdate(_id, { productData });
    if (!updateProductById) throw new HttpException(409, "Product doesn't exist");

    return updateProductById;
  }


  public async deleteProduct(ProductId: string,productData:Product): Promise<Product> {
    const deleteProductById: Product = await ProductModel.findByIdAndDelete(productData.ProductId,{...productData});

    return deleteProductById;
  }
}
