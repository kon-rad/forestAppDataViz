"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeModel = void 0;
const mongoose_1 = require("mongoose");
const tree_schema_1 = __importDefault(require("./tree.schema"));
exports.TreeModel = mongoose_1.model('tree', tree_schema_1.default);
//# sourceMappingURL=tree.model.js.map