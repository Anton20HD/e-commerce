import { NextApiRequest, NextApiResponse } from 'next';
import { loginUser } from '../userController';


// This functions are necessary because it is the entry point for the api route.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await loginUser(req,res);
}
