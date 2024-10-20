import express from 'express';
import next from 'next';
import connectDB from './src/libs/db/mongodb.js';

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev});
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000; // Default to 3000

app.prepare().then(async() => {
  
const server = express();

await connectDB();

    server.get('/api/custom', (req,res) => {
        res.json({ message: 'This is a custom api route'})
    })

    server.all('*', (req, res) => {
        return handle(req, res); 
      });

    server.listen(port, (err) => {
        if(err) throw err;
        console.log(`Ready on port:${port}`);
    })
})


