

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard =  async(req, res) => {
    // maybe delete this one, not sure,database one 
    const database = client.db('test');
    const usersCollection = database.collection('users');
    const user = await usersCollection.find(this.email).toArray();
    res.json(user);
  };

exports.adminBoard = async (req, res) => {
    // maybe delete this one, not sure,database one 
    const database = client.db('test');
    const usersCollection = database.collection('users');
    const users = await usersCollection.find().toArray();
    res.json(users);
}
