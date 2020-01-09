$(document).ready(function() {
  //init DateTimePickers
  //materialKit.initFormExtendedDatetimepickers();

  // Sliders Init
  //materialKit.initSliders();

  $("#giohang").on("click", function() {
    let cardId = $(this).data("id");
    $.ajax({
      url: "/cart/addtocart",
      type: "POST",
      data: {
        id: cardId,
        number: $("#number").text()
      },
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {
        window.location.href = "/cart";
      }
    });
  });

  $("#increaseNumber").on("click", function() {
    $(`#number`).text(function(i, origText) {
      return Number(origText) + 1;
    });
  });
  $("#decreaseNumber").on("click", function() {
    $(`#number`).text(function(i, origText) {
      return Number(origText) - 1;
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
