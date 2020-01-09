$(document).ready(function() {
  $(".productItem").on("click", function() {
    let brandId = $(this).data("id");
    $(`#${brandId}-brand`).html("");
    $(`#${brandId}-brand`).attr({
      class: ""
    });
    $.ajax({
      url: `/user/delete`,
      type: "POST",
      data: {
        id: brandId
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
