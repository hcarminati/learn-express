import express, { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { User, UserRequest } from './types';

const router = express.Router();
const dataFile = '../data/users.json';

let users: User[] = [];

fs.readFile(path.resolve(__dirname, dataFile), (err, data) => {
    if (err) throw err;
    users = JSON.parse(data.toString());
});

// POST user
router.post('/adduser', (req: UserRequest, res: Response) => {
    const newUser = req.body as User;
    users.push(newUser);

    fs.writeFile(path.resolve(__dirname, dataFile), JSON.stringify(users), (err) => {
        if (err) {
            console.log('Failed to write');
            return res.status(500).send('Failed to save user');
        }
        console.log('User saved');
    });
    res.send('User added');
});

export default router;
