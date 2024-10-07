import connectDB from '@/libs/db/mongodb'
import { NextApiRequest, NextApiResponse } from 'next';

export const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests'});
    }
    try {
        await connectDB();

        res.status(200).json({ message: 'User logged in succesfully'});
    } catch (error) {
        const err = error as Error;
        res.status(500).json({message: 'Login failed', error: err.message});
    }
};

export const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests'});
    }
    try {
        await connectDB();

        res.status(200).json({ message: 'User registered succesfully'});
    } catch (error) {
        const err = error as Error;
        res.status(500).json({message: 'Regisration failed', error: err.message});
    }
};

export const adminLogin = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests'});
    }
    try {
        await connectDB();

        res.status(200).json({ message: 'Admin logged in succesfully'});
    } catch (error) {
        const err = error as Error;
        res.status(500).json({message: 'Admin login failed', error: err.message});
    }
};


