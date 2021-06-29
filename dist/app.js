"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = process.env.PORT || 5000;
const fData = [];
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
    // tslint:disable-next-line:no-console
    console.log(req.body);
    res.send(`I received your POST request. This is what you sent me: ${req.body.post}`);
});
app.post('/api/csv-data', (req, res) => {
    // tslint:disable-next-line:no-console
    console.log(req.body);
    const bodySplit = Object.keys(req.body)[0].split('\n');
    bodySplit.forEach((row) => {
        const rowArr = row.split(',');
        fData.push(rowArr);
    });
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
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=app.js.map