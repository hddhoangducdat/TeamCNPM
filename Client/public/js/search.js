$(document).ready(function() {
  $("#dropdownMenuOffset").on("submit", function(e) {
    e.preventDefault();
    $("#dropdownItem").show();
    let value = $("#searchInput").val();

    // const userId = $(this).data("id");
    // $(`#${userId}-people`).html("");
    // $(`#${userId}-people`).attr({
    //   class: ""
    // });
    $.ajax({
      url: "/home/search",
      type: "POST",
      data: {
        search: value
      },
      beforSend: function() {},
      success: function(res) {
        console.log(res.arr);
        let str = "";
        res.arr.forEach(item => {
          str =
            str +
            `<a class="dropdown-item" href="${item.href}">${item.name}</a>`;
        });
        $("#dropdownItem").html(str);
        $("#dropdownItem").dropdown("toggle");
        $("#dropdownItem").dropdown("update");
        $("#dropdownItem").dropdown("dispose");
      }
    });
  });
  $("#page-top").on("click", function() {
    $("#dropdownItem").hide();
  });
});
