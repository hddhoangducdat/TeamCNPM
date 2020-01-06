$(document).ready(function() {
  //init DateTimePickers
  //materialKit.initFormExtendedDatetimepickers();

  // Sliders Init
  //materialKit.initSliders();

  $("#purchase").on("click", function() {
    $.ajax({
      url: "history/purchase",
      type: "POST",
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {
        window.location.href = "/history";
      }
    });
  });

  $(".increaseButton").on("click", function() {
    const price = $(this).data("price");
    let cartId = $(this).data("id");
    $("#sumProduct").text((i, origin) => {
      return Number(origin) + price;
    });
    $(`#${cartId}-number`).text(function(i, origText) {
      return Number(origText) + 1;
    });
    $.ajax({
      url: "cart/increase",
      type: "POST",
      data: {
        id: cartId
      },
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {}
    });
  });
  $(".decreaseButton").on("click", function() {
    const price = $(this).data("price");
    let cartId = $(this).data("id");
    $("#sumProduct").text((i, origin) => {
      return Number(origin) - price;
    });
    $(`#${cartId}-number`).text(function(i, origText) {
      return Number(origText) - 1;
    });
    $.ajax({
      url: "cart/decrease",
      type: "POST",
      data: {
        id: cartId
      },
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {}
    });
  });

  // $(".decreaseButton").on("click", function() {
  //   $.ajax({
  //     url: "history/purchase",
  //     type: "POST",
  //     beforeSend: function() {
  //       //console.log(this.data);
  //     },
  //     success: function(res) {
  //       window.location.href = "/history";
  //     }
  //   });
  // });
  //   function scrollToDownload() {
  //     if ($(".section-download").length != 0) {
  //       $("html, body").animate(
  //         {
  //           scrollTop: $(".section-download").offset().top
  //         },
  //         1000
  //       );
  //     }
  //   }
});
