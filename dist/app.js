"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./database/database");
const tree_model_1 = require("./database/models/tree.model");
const app = express_1.default();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const db = database_1.connect();
app.post('/api/csv-data', (req, res) => {
    // tslint:disable-next-line:no-console
    if (!req.body.data) {
        return;
    }
    // tslint:disable-next-line:no-console
    console.log('req body data.data: ', req.body.data);
    const { userId, data } = req.body;
    const dataArr = data.split('\n');
    const fData = [];
    dataArr.forEach((row) => {
        const rowArr = row.split(',');
        // 2021-06-07T10:54:01.107-0500,2021-06-07T11:54:01.107-0500,Work,Planted in my chrome,Cedar,True
        tree_model_1.TreeModel.create({
            userId,
            startTime: rowArr[0],
            endTime: rowArr[1],
            tag: rowArr[2],
            note: rowArr[3],
            treeType: rowArr[4],
            isSuccess: rowArr[5]
        });
        fData.push(rowArr);
    });
    // tslint:disable-next-line:no-console
    console.log('fData: ', fData);
    res.send(fData);
});
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express_1.default.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port !!!!! ${port}`));
//# sourceMappingURL=app.js.map