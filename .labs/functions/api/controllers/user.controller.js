

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard =  async(req, res) => {
  res.status(200).send("user Content.");
  };

exports.adminBoard = async (req, res) => {
  res.status(200).send("admin Content.");
}
