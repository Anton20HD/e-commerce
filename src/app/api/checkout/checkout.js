
import connectDB from '@/libs/db/mongodb';


export default async function handler(req,res) {
    await connectDB();

}