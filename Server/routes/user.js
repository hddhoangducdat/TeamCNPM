$(document).ready(function() {
  $(".deleteuser").on("click", function() {
    const userId = $(this).data("id");
    $(`#${userId}-people`).html("");
    $(`#${userId}-people`).attr({
      class: ""
    });
    $.ajax({
      url: "home/delete",
      type: "POST",
      data: {
        id: userId
      },
      beforSend: function() {},
      success: function(res) {}
    });
  });
});
