import { model } from 'mongoose';
import TreeSchema from './tree.schema';
import { TreeDocument } from './tree.types';

export const TreeModel = model<TreeDocument>('tree', TreeSchema);
