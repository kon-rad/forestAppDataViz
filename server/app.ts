import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './database/database';
import { TreeModel } from './database/models/tree.model';
import { Tree } from './database/models/tree.types';

// todos:
// 1. fix response data
// 1. confirm that data is written to db
// 2. check if  userId  is in  db on load

declare var path: any;

const app = express();
const port: any = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = connect();

app.post('/api/csv-data', (req: any, res: any): any => {
  // tslint:disable-next-line:no-console
  if (!req.body.data) {
    return;
  }
  // tslint:disable-next-line:no-console
  console.log('req body data.data: ', req.body.data);
  const { userId, data } = req.body;
  const dataArr = data.split('\n');
  const fData: any = [];
  dataArr.forEach((row: string) => {
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

app.get('/home', async (req: any, res: any): Promise<any> => {
  console.log('home', req);
  const { userId } = req.body;
  const data: Array<Tree> = await TreeModel.find({ userId: userId });
  console.log('home data: ', data);
  res.send({
    data: data
  });
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
app.listen(port, () => console.log(`Listening on port! ${port}`));
