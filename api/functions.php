<?php
//require("simplepie/php/autoloader.php");
$connection = mysqli_connect("localhost", "angrychi_angryc", "gS87gh7IGHas") or die ("Couldn't connect to server.");
$db = mysqli_select_db($connection,"angrychi_portal") or die ("Couldn't select database");
  $cats = array();

//////////////////////////////////////////
////////////// GET BOOKMARKS /////////////
//////////////////////////////////////////
function get_bookmarks() {

  global $connection,$db,$cats;
  $bookmarks = array();

  // CREATE ARRAY OF CATEGORIES
  $sql = "
    SELECT   catName, catID, rank
    FROM     link_cat
    ORDER BY rank ";
  $sql_result = mysqli_query($connection, $sql) or die ("Couldn't execute query.");
  while ($row = mysqli_fetch_array($sql_result)) {
    $bookmarks[$row["catName"]] = array();
    $cats[$row["catName"]] = array("catID"=>$row["catID"],"rank"=>$row["rank"]);
  }


  // ADD LINKS TO CATEGORY ARRAY
  $l = array();
  $sql = "
	SELECT		linkName, url, catName, linkID, clicks
	FROM		links, link_cat
	WHERE		active = 1 AND catID = cat
	ORDER BY	rank, linkName";
  $sql_result = mysqli_query($connection,$sql) or die ("Couldn't execute query.");
  while ($row = mysqli_fetch_array($sql_result)) {
    array_push($bookmarks[$row["catName"]],array(
      "linkName" => $row["linkName"],
      "url"      => $row["url"],
      "linkID"   => $row["linkID"],
      "clicks"   => $row["clicks"]
    ));
  }

  return($bookmarks);
} // get_bookmarks()

//////////////////////////////////////////////////
////////////// GET POPULAR BOOKMARKS /////////////
//////////////////////////////////////////////////
function display_pop_bookmarks() {
  global $connection,$db;
  $pop = array();
  $sql = "
	SELECT		linkName, url, linkID, clicks
	FROM        links
	ORDER BY    clicks DESC
	LIMIT       20";
  $sql_result = mysqli_query($connection,$sql) or die ("Couldn't execute query.");
  while ($row = mysqli_fetch_array($sql_result)) {
    $pop[] = array(
      "linkName" => $row["linkName"],
      "url"      => $row["url"],
      "linkID"   => $row["linkID"],
      "clicks"   => $row["clicks"]
    );
  }

  return $pop;
}

//////////////////////////////////////////
//////////// DISPLAY BOOKMARKS ///////////
//////////////////////////////////////////
function display_bookmarks() {
global $cats;
$pop = display_pop_bookmarks();
?>
<div id="mostclicked" class="block">
  <h3>Most Clicked</h3>
  <ul>
<?php foreach($pop as $link) { ?>
    <li id="mc-<?php echo $link["linkID"]; ?>"><a href="inc/click.php?link=<?php echo $link['linkID']; ?>" title="<?php echo $link['clicks']; ?>"><?php echo $link['linkName']; ?></a></li>
<?php } ?>
  </ul>
</div>
<?php
$b = get_bookmarks();
$badchars = array(" ","/");
foreach($b as $key => $links) {
  $id = strtolower(str_replace($badchars,"-",$key));

  if( sizeof($links) ) { ?>


<div id="<?php echo $id; ?>" class="block">
  <h3><?php echo $key; ?></h3>
  <ul>
<?php foreach($links as $link) { ?>
    <li id="<?php echo $link["linkID"]; ?>"><a href="inc/click.php?link=<?php echo $link['linkID']; ?>" title="<?php echo $link['clicks']; ?>"><?php echo $link['linkName']; ?></a></li>
<?php } ?>
  </ul>
  <input type="hidden" id="<?php echo $id; ?>_id" value="<?php echo $cats[$key]["catID"]; ?>" />
  <input type="number" id="<?php echo $id; ?>_rank" value="<?php echo $cats[$key]["rank"]; ?>" style="display: none;" />
</div>
<?php
    }
  }
} // display_bookmarks()

//////////////////////////////////
//////////// GET FEEDS ///////////
//////////////////////////////////
function get_feeds() {
  global $connection,$db;

  $sql = "SELECT * FROM feeds WHERE inv = 1 ORDER BY active, feedrank";
  $sql_result = mysqli_query($sql, $connection) or die ("Couldn't execute query.");
  while ($row = mysqli_fetch_array($sql_result)) {
    $feedURL = $row["feedURL"];
    $active = $row["active"];
    $feedID = $row["feedID"];
    $showdesc = $row["showdesc"];

    $feed = new SimplePie();
    $feed->set_feed_url($feedURL);
    $feed->init();
    $feed->handle_content_type();

    $badchars = array(" ","/",":");
    $id = strtolower(str_replace($badchars,"-",$feed->get_title() ));
?>
<div id="<?php echo $id; ?>" class="block">
  <h3><?php echo $feed->get_title(); ?></h3>
  <ul>
<?php foreach ($feed->get_items(0,15) as $item): ?>
    <li><a href="<?= $item->get_permalink(); ?>" title="<?= strip_tags($item->get_description()); ?>"><?= $item->get_title(); ?></a></li>
<?php endforeach; ?>
  </ul>
</div>
<?php
  }
}

///////////////////////////////////////////////
//////////// GET LIST OF CATEGORIES ///////////
///////////////////////////////////////////////
function bookmark_cat() {
  global $connection,$db;
  $sql = "
    SELECT   catName,catID
    FROM     link_cat
    ORDER BY catName ";
  $sql_result = mysqli_query($sql, $connection) or die ("Couldn't execute query.");
  while ($row = mysqli_fetch_array($sql_result)) { ?>
          <option value="<?php echo $row["catID"]; ?>"><?php echo $row["catName"]; ?></option>
<?php
  }
}
?>
