const { MongoClient } = require('mongodb');


const uri = 'mongodb+srv://vishalnikhil2002:r0WDRAViC0OW3FA5@nikhilscluster.9mupdtd.mongodb.net/?retryWrites=true&w=majority';

async function main() {
  const client = new MongoClient(uri); // No deprecated options

  try {
    // ✅ Connect to MongoDB
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    // ✅ Choose database and collection
    const db = client.db('helloworld'); // Change 'test' to your DB name if needed
    const collection = db.collection('user'); // Change 'users' to your collection name

    // const dbs = await client.db().admin().listDatabases();  //print the data base
    //  console.log(dbs);

     const data={
         firstname:"KARI",
         lastname:"handsome"
     };

    //  const inst=await collection.insertMany([data]);   //insert some data to database
    //  console.log(inst);
   

  
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('🔒 Connection closed');
  }
}

main();
