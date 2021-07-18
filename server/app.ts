import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './database/database';
import { TreeModel } from './database/models/tree.model';

declare var path: any;

const app = express();
const port: any = process.env.PORT || 5000;

const fData: any = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = connect();

app.post('/api/csv-data', (req: any, res): any => {
  // tslint:disable-next-line:no-console
  console.log(req.body, req.body.data);
  if (!req.body.data) {
    return;
  }
  const { userId, data } = req.body;
  const bodySplit = data.split('\n');
  bodySplit.forEach((row: string) => {
    const rowArr = row.split(',');
    // 2021-06-07T10:54:01.107-0500,2021-06-07T11:54:01.107-0500,Work,Planted in my chrome,Cedar,True
    TreeModel.create({
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
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
