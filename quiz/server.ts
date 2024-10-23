import fs from 'fs';
import path from 'path';
import express, { Express, Response, NextFunction } from 'express';
import cors from 'cors';
import readUsers from './readUsers';
import writeUsers from './writeUsers';
import { UserRequest } from './types';
import { User } from './types';

const app: Express = express();
const port = 8000;
const dataFile = path.resolve(__dirname, '../data/users.json');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

let users: User[] = [];

fs.readFile(dataFile, (err, data) => {
  if (err) throw err;
  users = JSON.parse(data.toString());
});

const addMsgToRequest = (req: UserRequest, res: Response, next: NextFunction) => {
  if (users && users.length > 0) {
    req.users = users;
    next();
  } else {
    return res.status(404).json({
      error: { message: 'Users not found', status: 404 }
    });
  }
};

app.use(addMsgToRequest);

app.use('/read', readUsers);
app.use('/write', writeUsers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
