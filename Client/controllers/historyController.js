var historyModel = require("../models/historyModel");

exports.history_list = async (req, res) => {
  const { histories } = await historyModel.findOne({ userId: req.user._id });

  res.render("historyPage", {
    title: "Black Hole",
    condition: false,
    user: req.user,
    history: histories
  });
};
