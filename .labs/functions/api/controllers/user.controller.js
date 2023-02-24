const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/test'; 
const client = new MongoClient(uri);

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = async (req, res) => {
  try {
    await client.connect();
    const database = client.db('test');
    const usersCollection = database.collection('users');
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  } finally {
    await client.close();
  }
};
