$(document).ready(function() {
  $(".deleteBill").on("click", function() {
    let billId = $(this).data("id");
    $.ajax({
      url: "shopping/cancleBill",
      type: "POST",
      data: {
        id: billId
      },
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {
        window.location.href = "/management/shopping";
      }
    });
  });

  $(".findItem").on("click", function() {
    let billId = $(this).data("id");
    $(`#${billId}-find`).attr({
      class: "ui active step findItem button"
    });
    $(`#${billId}-ship`).attr({
      class: "ui step shippingItem button"
    });
    $(`#${billId}-fin`).attr({
      class: "ui step finishItem button"
    });
    $.ajax({
      url: "shopping/findItem",
      type: "POST",
      data: {
        id: billId
      },
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {}
    });
  });

  $(".shippingItem").on("click", function() {
    let billId = $(this).data("id");
    $(`#${billId}-find`).attr({
      class: "ui step findItem button"
    });
    $(`#${billId}-ship`).attr({
      class: "ui active step shippingItem button"
    });
    $(`#${billId}-fin`).attr({
      class: "ui step finishItem button"
    });
    $.ajax({
      url: "shopping/shippingItem",
      type: "POST",
      data: {
        id: billId
      },
      beforeSend: function() {
        //console.log(this.data);
      },
      success: function(res) {}
    });
  });

  $(".finishItem").on("click", function() {
    let billId = $(this).data("id");
    $(`#${billId}-find`).attr({
      class: "ui step findItem button"
    });
    $(`#${billId}-ship`).attr({
      class: "ui step shippingItem button"
    });
    $(`#${billId}-fin`).attr({
      class: "ui active step finishItem button"
    });
    $(`#${billId}-button`).html("");
    $.ajax({
      url: "shopping/finishItem",
      type: "POST",
      data: {
        id: billId
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
