/* eslint-disable prettier/prettier */
//import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/products.interface';
import { ProductModel } from '@models/products.model';

@Service()
export class Productervice {
  public async findAllProduct(): Promise<Product[]> {
    const users: Product[] = await ProductModel.find();
    return users;
  }

  public async findProductById(productId: string): Promise<Product> {
    const findProductById: Product = await ProductModel.findOne({ _id: productId });
    if (!findProductById) throw new HttpException(409, "Product doesn't exist");

    return findProductById;
  }

  public async createProduct(productData: Product): Promise<Product> {
    const findProduct: Product = await ProductModel.findOne({ ProductName: productData.ProductName });
    if (findProduct) throw new HttpException(409, `This product ${productData.ProductName} already exists`);

    const Quantity = await (productData.Quantity, 10);
    const createUserData: Product = await ProductModel.create({ ...productData, Quantity: Quantity });

    return createUserData;
  }

  public async updateProduct(_id: string, productData: Product): Promise<Product> {
    if (productData.ProductName) {
      const findProduct: Product = await ProductModel.findOne({ ProductName: productData.ProductName });
      if (findProduct && findProduct.ProductId != _id) throw new HttpException(409, `This product ${productData.ProductName} already exists`);
    }
    const updateProductById: Product = await ProductModel.findByIdAndUpdate(_id, { productData });
    if (!updateProductById) throw new HttpException(409, "Product doesn't exist");

    return updateProductById;
  }

  public async deleteProduct(productId: string): Promise<Product> {
    const deleteProductById: Product = await ProductModel.findByIdAndDelete(productId);
    if (!deleteProductById) throw new HttpException(409, "Product doesn't exist");

    return deleteProductById;
  }
}
