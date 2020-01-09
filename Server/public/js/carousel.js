$(document).ready(function() {
  $(".carouselClick").on("click", function() {
    let productId = $(this).data("id");
    let carousel = $(this).data("carousel");
    $(`#${productId}-carousel`).attr({
      style: carousel.length === 0 ? "color: red" : ""
    });
    $.ajax({
      url: "/management/product/carousel",
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

  $(".deleteProduct").on("click", function() {
    let productId = $(this).data("id");
    console.log(productId);
    $(`#${productId}-product`).html("");
    $.ajax({
      url: "/management/product/delete",
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
