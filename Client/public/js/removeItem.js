$(document).ready(function() {
  $(".removeItem").on("click", function() {
    let productId = $(this).data("id");
    const price = $(this).data("price");
    const number = $(this).data("number");
    $(`#${productId}-cart`).html("<div><div>");
    $("#sumProduct").text((i, origin) => {
      return Number(origin) - price * number;
    });
    $.ajax({
      url: "cart/removeItem",
      type: "POST",
      data: {
        id: productId
      },
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {}
    });
  });

  function scrollToDownload() {
    if ($(".section-download").length != 0) {
      $("html, body").animate(
        {
          scrollTop: $(".section-download").offset().top
        },
        1000
      );
    }
  }
});
