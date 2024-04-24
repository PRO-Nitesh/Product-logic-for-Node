/* eslint-disable prettier/prettier */
import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const ProductSchema: Schema = new Schema({
  ProductId: {
    type: String,
    required: true,
    unique: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  IsActive: {
    type: Boolean,
    required: true,
  },
});

export const ProductModel = model<Product & Document>('Product', ProductSchema);
