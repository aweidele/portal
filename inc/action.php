<?php
session_start();
require("functions.php");

if(!isset($_GET["action"])) {
  echo "You did not specify an action.";
} else {
  
  switch($_GET["action"]) {
    case "login":
      login();
      break;
      
    case "delete_bookmark":
      delete_bookmark();
      break;
      
    case "add_bookmark":
      add_bookmark();
      break;
      
    case "loadfeeds":
      get_feeds();
      break;
      
    case "edit_cat":
      edit_cat();
      break;
    
    default:
      echo "That action is not recognized.";
      break;
  }
  
}

// LOGIN
function login() {
  if(isset($_POST["pw"])) {
    $_SESSION['pw'] = $_POST['pw'];
    header("Location: ../");
  }
}

// ADD BOOKMARK
function add_bookmark() {
  if(isset($_SESSION["pw"]) && $_SESSION["pw"] == "monkeys") {
    global $db,$connection;
    
    $bookmark_name = $_POST["bookmark_name"];
    $bookmark_url = $_POST["bookmark_url"];
    $bookmark_cat = $_POST["bookmark_cat"];
    $bookmark_cat_add = $_POST["bookmark_cat_add"];
    $bookmark_cat_add_rank = $_POST["bookmark_cat_add_rank"];
    
    // if adding new
    if($bookmark_cat == "addnew" && $bookmark_cat_add != "") {
      $sql = '
        INSERT INTO link_cat (catName,rank)
        VALUES ("'.$bookmark_cat_add.'",'.$bookmark_cat_add_rank.')
      ';
      
      if(mysql_query($sql, $connection) or die ("Couldn't execute query.<br />\n $sql")) {
        $bookmark_cat = mysql_insert_id();
      }
      
    }
    
    // add new link
    $sql = '
      INSERT INTO links (linkName,url,cat,active)
      VALUES (
        "'.$bookmark_name.'",
        "'.$bookmark_url.'",
        '.$bookmark_cat.
        ',1
    )';
    
    if(mysql_query($sql, $connection) or die ("Couldn't execute query.<br />\n $sql")) {
      header("Location: ../");
    }

// or password incorrect
  } else {
    echo "Password incorrect.";
  } 
}

// DELETE BOOKMARK
function delete_bookmark() {

  if(isset($_SESSION["pw"]) && $_SESSION["pw"] == "monkeys") {

    global $db,$connection;
  
    $b = explode(",",$_POST["bookmarks"]);
    $b = join(" OR linkID=",$b);

    $sql = "
      DELETE FROM links
      WHERE linkID=$b";
  
    if(mysql_query($sql, $connection) or die ("Couldn't execute query.")) {
      echo "Bookmarks successfully deleted.";
    } else {
      echo "Bookmarks not deleted.";
    }
    
  } else {
    echo "Password incorrect.";
  }
}


// EDIT CATEGORIES
function edit_cat() {
   global $db,$connection;
   unset($_POST["submit"]);
   foreach($_POST as $post) {
     $p = split(",",$post);
     $sql = "
       UPDATE link_cat
       SET catName = \"".$p[1]."\",
           rank    = ".$p[2]."
       WHERE catID = ".$p[0];
   
   mysql_query($sql, $connection) or die ("Couldn't execute query.");
   }
   
   header("Location: ../");
}
?>