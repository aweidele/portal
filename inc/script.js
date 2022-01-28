$(document).ready(function() {

  arrange();
  $(window).resize(function() { arrange(); });

  // $("#container_nav li.feeds").hide();
  // $("#feeds").load("inc/action.php?action=loadfeeds",function() {
  //   $("#container_nav li.feeds").slideDown(250);
  //   arrange();
  // });

  $(".blocks").hide();
  $(".blocks:first-child").show();

  // FEEDS/BOOKMARKS TOGGLE
  $("#control_feeds").hide();
  $("#container_nav a").click(function(e) {

    e.preventDefault();
    $show = $(this).attr("href");
    $(".blocks:visible").fadeOut(250,function() {
      $($show).fadeIn(250);
      arrange();
    });

    $panel = "#control_" + $show.replace("#","");
    $(".control_panel:visible").fadeOut(250,function() {
      $($panel).fadeIn(250);
    });

  });

  //////////////////////////
  // EDIT LINKS FUNCTIONS //
  //////////////////////////

  $(".manage_bookmarks a").click(function(e) {
    e.preventDefault();
    $h = $(this).attr("href");

    // add bookmarks
    if($h == "#add") {
      $("#add_bookmarks").slideToggle(250);

    // delete bookmarks
    } else if ($h == "#delete") {
      $("#bookmarks").addClass("delete");
      $("#delete_bookmarks").slideDown(250);
      $delete = Array();

    // edit/reorder categories
    } else if ($h == "#edit") {

      if($("#edit_cats").is(":visible")) {
        $("#bookmarks h3").attr({"contenteditable":"false"}).removeClass("editmode");
        $("#bookmarks .block input[type='number']").slideUp(250,function(){ arrange(); });
        $("#edit_cats").slideUp(250);
        $("#edit_cats input").remove();
      } else {
        $("#bookmarks h3").attr({"contenteditable":"true"}).addClass("editmode");
        $("#bookmarks .block input[type='number']").slideDown(250,function(){ arrange(); });
        $("#edit_cats").slideDown(250);

        $("#bookmarks .block").each(function() {
          $v = Array(
            $("input:eq(0)",this).val(),
            $("h3",this).text(),
            $("input:eq(1)",this).val()
          );

          $("#edit_cats form").append('<input type="hidden" name="'+$("input:eq(0)",this).val()+'" value="'+$v+'" />');
        });
      }

    // add rss feed
    } else if ($h == "#add_feed") {
      $("#add_feeds").slideToggle(250);
    }
  });

  // CHECK WHEN "ADD NEW CATEGORY" IS SELECTED
  $("#bookmark_cat").change(function() {
    if( $(this).val() == "addnew" ) {
      $("#bookmark_cat_add").fadeIn(250);
    } else {
      $("#bookmark_cat_add").fadeOut(250);
    }
  });

  // MARK FOR DELETION
  $("#bookmarks a").click(function(e) {

    if($("#bookmarks").hasClass("delete")) {
      e.preventDefault();

      //remove bookmark for deletion
      if( $(this).hasClass("marked") ) {
        $(this).removeClass("marked");
        for($i=0;$i<$delete.length;$i++) {
          if($delete[$i] == $(this).parent().attr("id") ) {
            $delete.splice( $i, 1);
          }
        }
        $("#delete_bookmarks .number").html( $delete.length );

      // add bookmark for deletion
      } else {
        $(this).addClass("marked");
        $delete.push( $(this).parent().attr("id") );
        $("#delete_bookmarks .number").html( $delete.length );
      }
    }

  });

  // CANCEL DELETE
  $("#delete_bookmarks li:last-child").click(function(e) {
    e.preventDefault();
    $("#bookmarks a").removeClass("marked");
    $("#delete_bookmarks .number").html("0");
    $("#bookmarks").removeClass("delete");
    $("#delete_bookmarks").slideUp(250);
  });

  // DELETE GO
  $("#delete_bookmarks li:first-child").click(function(e) {
    e.preventDefault();
    $d = $delete.join();
    $("#delete_bookmarks .ajax_message").load("inc/action.php?action=delete_bookmark", {"bookmarks":$d},function() {
      if( $("#delete_bookmarks .ajax_message").html() == "Bookmarks successfully deleted." ) {

        $("#bookmarks a.marked").parent().fadeOut(250,function() {
          arrange();
        });

        $("#delete_bookmarks .ajax_message").slideDown(250).delay(2000).slideUp(250,function() {
          $("#bookmarks a").removeClass("marked");
          $("#delete_bookmarks .number").html("0");
          $("#bookmarks").removeClass("delete");
          $("#delete_bookmarks").slideUp(250);
        });

      }
    });
  });

  // EDIT/REORDER CATEGORIES
  $("#bookmarks .block input,#bookmarks .block h3").keyup(function() {

    $("#bookmarks .block").each(function() {
          $v = Array(
            $("input:eq(0)",this).val(),
            $("h3",this).text(),
            $("input:eq(1)",this).val()
          );
      $("#edit_cats input:eq("+($(this).index()+1)+")").val($v);
    });
  });

});

function arrange() {
$(".blocks").each(function() {

  ///////////////////////////////////////////////////////
  // DETERMINE WIDTH OF BOOKMARKS AREA AND             //
  // CREATE AN ARRAY WITH THE RIGHT NUMBER OF COLUMNS  //
  ///////////////////////////////////////////////////////
  $t = $(this).width();
  $w = $(".block",this).width() +
       parseInt($(".block",this).css("margin-left")) +
       parseInt($(".block",this).css("margin-right"));

  $numcols = Math.floor($t / $w);
  $cols = Array();
  for ($i=0 ; $i<$numcols ; $i++) {
    $cols[$i] = 0;
  }

  //////////////////////////////////////////////////////
  // PLACE EACH BOOKMARK BLOCK IN THE SHORTEST COLUMN //
  //////////////////////////////////////////////////////
  $(".block",this).each(function() {

    $shortest = Infinity;
    for($i=0 ; $i<$cols.length ; $i++) {
      if($cols[$i] < $shortest) {
        $shortest = $cols[$i];
        $s = $i;
      }
    }

    $left = $s * $w;

    $(this).css({
      "left":$s*$w,
      "top":$cols[$s]
    });

    $cols[$s] += $(this).height() + ( parseInt($(this).css("margin-left")) * 2);

  });

  $tallest = 0;
  for($i=0 ; $i<$cols.length ; $i++) {
    if($cols[$i] > $tallest) {
      $tallest = $cols[$i];
      $s = $i;
    }
  }
  $(this).height($cols[$s]);

/*
  // TRACKING PURPOSES
  $msg = "";
  for($i=0 ; $i<$cols.length ; $i++) {
    $msg += $cols[$i] + " / ";
  }
  $msg += "<br />"+$cols[$s];
  $("#feedback").html($msg);
*/
});

  $("#wrapper_nav").css({ "top":$("#wrapper_header").height() + parseInt($("#wrapper_header").css("margin-bottom")) + parseInt($("#wrapper_header").css("padding-top")) + parseInt($("#wrapper_header").css("padding-bottom")) });
}
