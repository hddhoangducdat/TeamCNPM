var express = require("express");
var router = express.Router();
var isAuthenticated = require("../middlewares/isAuthenticated");

/* GET users listing. */
router.get("/", isAuthenticated, function(req, res) {
  
  res.render("homePage", {
    title: "Black Hole Admin",
    user: {
      name: req.user.lastName,
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Hammer_and_sickle.svg'
    },
    earning: {
      day: 1428571,
      week: 10000000,
      month: 30200000,
      year: 12 * 30200000
    },
    product: {
      day: 200,
      week: 1000,
      year: 23410,
      month: 3600
    },
    statictis: [
      {
        image:
          "https://images-na.ssl-images-amazon.com/images/I/A1cd6TMkAML._SL1500_.jpg",
        name: "Bóng rổ",
        number: 200,
        earn: 200 * 200000,
        brand: "coca-cola",
        id: 1
      },
      {
        image:
          "https://salt.tikicdn.com/cache/w1200/ts/product/15/4f/1d/2ca8dd1db2bb31db0aba8ad4eac20160.jpg",
        name: "ÁO KHOÁC NHẸ NAM DXPECHER IN HÌNH HỌA TIẾT",
        number: 400,
        earn: 89000 * 400,
        brand: "Phúc Long",
        id: 2
      },
      {
        image:
          "https://salt.tikicdn.com/cache/w1200/ts/product/ad/6d/4b/698710c5a8a893767a67c6749bfbc06c.jpg",
        name: "Smart Tivi LG 43 inch 4K UHD 43UK6340PTF - Hàng chính hãng",
        number: 40,
        earn: 40 * 7990000,
        brand: "lol",
        id: 3
      },
      {
        image:
          "https://salt.tikicdn.com/cache/w1200/ts/product/24/2c/7d/ed8eb31c8057f97c4391bfeaddcb3e86.jpg",
        name: "Xe Máy Honda Air Blade 2019 Phiên bản Đen Mờ",
        number: 12,
        earn: 12 * 44160000,
        brand: "EA",
        id: 4
      },
      {
        image:
          "https://salt.tikicdn.com/ts/bookpreview/90/5e/14080601/files/OEBPS/Images/Page1.jpg",
        name: "Sự kết thúc của thời đại giả kim",
        number: 1500,
        earn: 1500 * 107602,
        brand: "Ubisoft",
        id: 5
      },
      {
        image:
          "https://salt.tikicdn.com/cache/w1200/ts/product/dc/56/c6/01f720494a321bacfd5711f03d8b5b25.jpg",
        name: "Giày Bóng Rổ Kyrie Ateson-2080",
        number: 800,
        earn: 800 * 450000,
        brand: "MS",
        id: 6
      },
      {
        image:
          "https://salt.tikicdn.com/cache/w1200/ts/product/36/bd/31/38cfa79d6213fb948a13ad20b0b9d617.jpg",
        name: "Vòng đeo tay thông minh Xiaomi Mi Band 4_Hàng Nhập Khẩu",
        number: 750,
        earn: 750 * 540000,
        brand: "RockStar",
        id: 7
      },
      {
        image:
          "https://salt.tikicdn.com/cache/w1200/ts/product/cd/9b/3c/749a72eff516d0aaf0cf2f3a7f937682.jpg",
        name: "Ngũ Cốc Sấy Khô Calbee nội địa Nhật Bản 800g",
        number: 2000,
        earn: 2000 * 179000,
        brand: "FPT",
        id: 8
      },
      {
        image:
          "https://salt.tikicdn.com/cache/w1200/ts/product/cb/79/ef/79d22f3ac2913afecbf8636e666ec5ac.jpg",
        name: "Chổi Lau Nhà Thông Minh, Chổi Lau Nhà Hút Bụi Đa Năng",
        number: 2400,
        earn: 2400 * 82887,
        brand: "FPT",
        id: 9
      },
      {
        image:
          "https://salt.tikicdn.com/cache/w1200/ts/product/cb/79/ef/79d22f3ac2913afecbf8636e666ec5ac.jpg",
        name: "Chổi Lau Nhà Thông Minh, Chổi Lau Nhà Hút Bụi Đa Năng",
        number: 2400,
        earn: 2400 * 82887,
        id: 9
      }
    ]
  });
});

module.exports = router;
