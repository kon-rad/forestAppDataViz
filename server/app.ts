import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './database/database';

declare var path: any;

const app = express();
const port: any = process.env.PORT || 5000;

const fData: any = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connect();

app.post('/api/csv-data', (req: any, res): any => {
  // tslint:disable-next-line:no-console
  console.log(req.body, req.body.data);
  if (!req.body.data) {
    return;
  }
  const bodySplit = req.body.data.split('\n');
  bodySplit.forEach((row: string) => {
    const rowArr = row.split(',');
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
