var historyModel = require("../models/historyModel");
var cartModel = require("../models/cartModel");

exports.history_list = async (req, res) => {
  let response = await historyModel.find({ userId: req.user._id });
  const result = response.map(r => {
    let condition1, condition2, condition3, condition4;
    condition4 = false;
    let sum = 0;
    r.bill.forEach(cart => (sum = sum + parseInt(cart.price) * cart.number));
    switch (r.history) {
      case "findItem":
        condition1 = "active";
        break;
      case "shipping":
        condition2 = "active";
        break;
      case "cancle":
        condition4 = true;
        break;
      default:
        condition3 = "active";
        break;
    }
    return {
      _id: r._id,
      bill: r.bill,
      condition1,
      condition2,
      condition3,
      condition4,
      sum
    };
  });
  res.render("historyPage", {
    title: "Black Hole",
    condition: response ? false : true,
    user: req.user,
    history: result
  });
};

exports.purchase_product = async (req, res) => {
  let bill = await cartModel.findOne({ userId: req.user._id });
  if (bill && bill.carts.length !== 0) {
    let history = new historyModel({
      userId: req.user._id,
      history: "findItem",
      bill: bill.carts
    });
    await history.save();
    bill.carts = [];
    await bill.save();
    res.redirect("../history");
  }
};

exports.cancle_bill = async (req, res) => {
  let bill = await historyModel.findById(req.body.id);
  bill.history = "cancle";
  await bill.save();
  res.redirect("../history");
};
