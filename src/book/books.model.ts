import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: { type: String},
  description: { type: String },
  price: { type: Number, },
  published: { type: Boolean, },
},{ timestamps: true});

export interface Book extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  published: number;
}
