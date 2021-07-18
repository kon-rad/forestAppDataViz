import { Schema } from 'mongoose';

const TreeSchema = new Schema({
  userId: String,
  startTime: Date,
  endTime: Date,
  tag: String,
  note: String,
  treeType: String,
  isSuccess: String
});

export default TreeSchema;
