import { NextApiRequest, NextApiResponse } from 'next';
import { products} from './data'; 

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (req.query.type === 'products') {
      res.status(200).json(products);
    }  
  } else {
    res.status(405).end(); 
  }
}