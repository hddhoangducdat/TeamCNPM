$(document).ready(function() {
  $("#submitProduct").on("submit", function(e) {
    e.preventDefault();
    let productId = $(this).data("id");
    $.ajax({
      url: "submit",
      type: "POST",
      data: {
        id: productId,
        file: $("#product_image").val(),
        name: $("#product_name").val(),
        categories: $("#product_categories").val(),
        price: $("#product_price").val(),
        createdBy: $("#product_createdBy").val(),
        quantity: $("#product_quantity").val(),
        description: $("#product_description").val()
      },
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {
        window.location.href = res.redirect;
      }
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
