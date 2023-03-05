

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard =  async(req, res) => {
  res.status(200).send("user Content.");
  };

exports.adminBoard = async (req, res) => {
  res.status(200).send("admin Content.");
}

exports.newGame = async (req, res) => {
    try {
      const newGame = {
        score: req.body.score,
        time: req.body.time,
      };

      const user = await User.findById(req.body.id);
      user.games.push(newGame);
      await user.save();
  
      // Return the updated games array
      res.status(201).send("Saved score");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

