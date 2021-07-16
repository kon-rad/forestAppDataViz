import { Document, Model } from 'mongoose';
export interface Tree {
  startTime: Date;
  endTime: Date;
  tag: string;
  note: string;
  treeType: string;
  isSuccess: string;
}

export interface TreeDocument extends Tree, Document {}
export interface TreeModel extends Model<TreeDocument> {}
