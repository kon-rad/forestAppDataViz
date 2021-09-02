"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TreeSchema = new mongoose_1.Schema({
    userId: String,
    startTime: Date,
    endTime: Date,
    tag: String,
    note: String,
    treeType: String,
    isSuccess: String
});
exports.default = TreeSchema;
//# sourceMappingURL=tree.schema.js.map