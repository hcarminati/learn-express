import express, { Response } from 'express';
import {UserRequest} from './types';

const router = express.Router();

// GET all usernames
router.get('/usernames', (req: UserRequest, res: Response) => {
    const usernames = req.users?.map(user => ({
        id: user.id,
        username: user.username
    }));
    res.send(usernames);
});

//GET specific user by name
router.get('/usernames/:name', (req: UserRequest, res: Response) => {
    let name = req.params.name;

    if (Array.isArray(req.users)) {
        const usersWithName = req.users.filter(user => user.username === name);

        if (usersWithName.length > 0) {
            res.json(usersWithName);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } else {
        res.status(500).json({ error: 'Users data is not available' });
    }
});


export default router;