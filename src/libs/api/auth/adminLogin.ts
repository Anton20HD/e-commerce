import { NextApiRequest, NextApiResponse } from 'next';
import { adminLogin } from '../userController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await adminLogin(req,res);
}