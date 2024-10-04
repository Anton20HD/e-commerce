import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb+srv://antonhaglund20:AD4ibT7SKUC2ivsR@ecommerce.xlt8q.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);