$(document).ready(function() {
  $("#block").on("click", function(e) {
    e.preventDefault();
    const userId = $(this).data("id");
    $("#block").html("<div>Mở tài khoản<div>");
    $("#block").attr({
      id: "unblock",
      class: "ui button green",
      "data-id": userId
    });

    $.ajax({
      url: `/user/${userId}/block`,
      type: "POST",
      data: {
        id: userId
      },
      beforSend: function() {},
      success: function(res) {}
    });
  });
  $("#unblock").on("click", function(e) {
    e.preventDefault();
    const userId = $(this).data("id");
    $("#unblock").html("<div>Khóa tài khoản<div>");
    $("#unblock").attr({
      id: "block",
      class: "ui button red",
      "data-id": userId
    });

    $.ajax({
      url: `/user/${userId}/unblock`,
      type: "POST",
      data: {
        id: userId
      },
      beforSend: function() {},
      success: function(res) {}
    });
  });
});
