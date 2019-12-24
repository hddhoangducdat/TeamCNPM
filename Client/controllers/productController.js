const productModel = require("../models/productModel");

exports.product_list = layout => async (req, res) => {
  const carts = await productModel.find();

  res.render(layout, {
    title: "Black Hole",
    condition: false,
    user: req.user,
    carousel: [
      {
        cartId: 1,
        picture: "https://cdn.mos.cms.futurecdn.net/HvjfsxzQHCZxpUYTVgyBDM.jpg",
        caption: "MacBook Air (2019)",
        condition: true,
        id: 0
      },
      {
        cartId: 5,
        picture:
          "https://cdn.motor1.com/images/mgl/MoVM6/s1/lamborghini-sc18-alston.jpg",
        caption: "Lamborghini Aventador Successor Allegedly Arriving In 2020",
        condition: false,
        id: 1
      },
      {
        cartId: 6,
        picture:
          "https://tallypress.com/wp-content/uploads/2018/09/Best-Fiction-and-Nonfiction-Books-of-2017.jpg",
        caption: "Tuyển tập những quyển sách hay",
        condition: false,
        id: 2
      }
    ],
    carts
  });
};

exports.product_list_categories = layout => async (req, res) => {
  let type;
  console.log(req.user);
  switch (req.params.type) {
    case "fashion":
      type = "Thời trang";
      break;
    case "sport":
      type = "Thể thao";
      break;
    case "electronic":
      type = "Điện tử";
      break;
    case "lifestyle":
      type = "Nhà cửa - đời sống";
      break;
    case "toolkit":
      type = "Phụ kiện - thiết bị số";
      break;
    case "transport":
      type = "Phương tiện";
      break;
    case "book":
      type = "Sách";
      break;
    case "food":
      type = "Thực phẩm";
      break;
    default:
      break;
  }
  if (type) {
    const carts = await productModel.find({
      category: type
    });
    res.render(layout, {
      title: "Black Hole",
      params: req.params.type,
      user: req.user,
      condition: false,
      carts
    });
  }
};

exports.product_info = layout => async (req, res) => {
  // var id = url.substring(url.lastIndexOf("/") + 1);
  const carts = await productModel.findById(req.params.id);
  res.render(layout, {
    title: "Black Hole",
    user: req.user,
    product: carts
  });
};

exports.product_sort_list = layout => async (req, res) => {
  var carts = await productModel.find();
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
    carousel: [
      {
        cartId: 1,
        picture: "https://cdn.mos.cms.futurecdn.net/HvjfsxzQHCZxpUYTVgyBDM.jpg",
        caption: "MacBook Air (2019)",
        condition: true,
        id: 0
      },
      {
        cartId: 5,
        picture:
          "https://cdn.motor1.com/images/mgl/MoVM6/s1/lamborghini-sc18-alston.jpg",
        caption: "Lamborghini Aventador Successor Allegedly Arriving In 2020",
        condition: false,
        id: 1
      },
      {
        cartId: 6,
        picture:
          "https://tallypress.com/wp-content/uploads/2018/09/Best-Fiction-and-Nonfiction-Books-of-2017.jpg",
        caption: "Tuyển tập những quyển sách hay",
        condition: false,
        id: 2
      }
    ],
    carts
  });
};

exports.product_sort_categories = layout => async (req, res) => {
  let type;
  switch (req.params.type) {
    case "fashion":
      type = "Thời trang";
      break;
    case "sport":
      type = "Thể thao";
      break;
    case "electronic":
      type = "Điện tử";
      break;
    case "lifestyle":
      type = "Nhà cửa - đời sống";
      break;
    case "toolkit":
      type = "Phụ kiện - thiết bị số";
      break;
    case "transport":
      type = "Phương tiện";
      break;
    case "book":
      type = "Sách";
      break;
    case "food":
      type = "Thực phẩm";
      break;
    default:
      break;
  }

  if (type) {
    var carts = await productModel.find({
      category: type
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
  }
};
