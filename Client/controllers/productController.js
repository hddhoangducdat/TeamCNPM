const productModel = require("../models/productModel");
var httpMsgs = require("http-msgs");
var commentModel = require("../models/commentModel");

exports.product_list = layout => async (req, res) => {
  const carts = await productModel.find();
  let carousel = await productModel.find({ carousel: "red" });
  carousel.forEach((c, i) => {
    if (i === 0) c.condition = true;
    else c.condition = false;
  });

  res.render(layout, {
    title: "Black Hole",
    condition: false,
    user: req.user,
    carousel,
    carts
  });
};

exports.product_list_categories = layout => async (req, res) => {
  const carts = await productModel.find({
    category: req.params.type
  });
  console.log(carts);
  res.render(layout, {
    title: "Black Hole",
    params: req.params.type,
    user: req.user,
    condition: false,
    carts
  });
};

exports.product_info = layout => async (req, res) => {
  // var id = url.substring(url.lastIndexOf("/") + 1);
  const carts = await productModel.findById(req.params.id);
  const comment = await commentModel.findOne({ productId: req.params.id });
  let product = await productModel.find({
    createdBy: carts.createdBy
  });
  let result = product.concat(
    await productModel.find({
      category: carts.category
    })
  );
  console.log(result);
  result = result.filter(r => !r._id.equals(req.params.id));
  while (result.length > 5) result.pop();
  res.render(layout, {
    title: "Black Hole",
    user: req.user,
    product: carts,
    comment: comment ? comment.comments : null,
    carts: result
  });
};

exports.product_sort_list = layout => async (req, res) => {
  var carts = await productModel.find();
  const carousel = await productModel.find({ carousel: "red" });

  carousel.forEach((c, i) => {
    if (i === 0) c.condition = true;
    else c.condition = false;
  });

  var params;
  if (req.params.sort === "Popular") {
    params = "Sản phẩm nổi bật";
    carts.sort((a, b) => {
      return b.sold - a.sold;
    });
  } else if (req.params.sort === "HighPrice") {
    params = "Giá từ cao tới thấp";
    carts.sort((a, b) => {
      return b.price - a.price;
    });
  } else if (req.params.sort === "LowPrice") {
    params = "Giá từ thấp tới cao";
    carts.sort((a, b) => {
      return a.price - b.price;
    });
  } else {
    params = "Ngày đăng tải";
  }

  res.render(layout, {
    title: "Black Hole",
    condition: false,
    user: req.user,
    params,
    render: true,
    carousel,
    carts
  });
};

exports.product_sort_categories = layout => async (req, res) => {
  var carts = await productModel.find({
    category: req.params.type
  });
  var params;
  if (req.params.type.sort === "Popular") {
    params = "Sản phẩm nổi bật";
    carts.sort((a, b) => {
      return b.sold - a.sold;
    });
  } else if (req.params.type.sort === "HighPrice") {
    params = "Giá từ cao tới thấp";
    carts.sort((a, b) => {
      return b.price - a.price;
    });
  } else if (req.params.type.sort === "LowPrice") {
    params = "Giá từ thấp tới cao";
    carts.sort((a, b) => {
      return a.price - b.price;
    });
  } else {
    params = "Ngày đăng tải";
  }
  res.render(layout, {
    title: "Black Hole",
    params: req.params.type,
    user: req.user,
    condition: false,
    carts
  });
};

exports.search_product = async (req, res) => {
  let search = req.body.search.toLowerCase();
  const product = await productModel.find();
  let arr = [];
  product.forEach((p, i) => {
    var vtr = p.name.toLowerCase().search(search);
    if (vtr !== -1) arr = [...arr, { name: p.name, href: `/product/${p._id}` }];
  });
  console.log(arr);
  httpMsgs.sendJSON(req, res, {
    arr
  });
};

exports.product_comment = async (req, res) => {
  console.log(req.body.comment);
  console.log(req.params.id);
  let comment = await commentModel.findOne({ productId: req.params.id });
  if (comment) {
    comment.comments = [
      ...comment.comments,
      {
        text: req.body.comment,
        image: req.user.image,
        name: req.user.username
      }
    ];
    await comment.save();
  } else {
    let newComment = new commentModel({
      productId: req.params.id,
      comments: [
        {
          text: req.body.comment,
          image: req.user.image,
          name: req.user.username
        }
      ]
    });
    newComment.save();
  }
  res.redirect(`/product/${req.params.id}`);
};
