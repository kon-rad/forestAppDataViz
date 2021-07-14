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

app.get('/api/hello', (req: any, res: any) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req: any, res: any) => {
  // tslint:disable-next-line:no-console
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});
app.post('/api/csv-data', (req: any, res): any => {
  // tslint:disable-next-line:no-console
  console.log(req.body);
  const bodySplit = Object.keys(req.body.data)[0].split('\n');
  bodySplit.forEach((row) => {
    const rowArr = row.split(',');
    fData.push(rowArr);
  });
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
