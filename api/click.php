<?php
if(isset($_GET['link']) && $_GET['link'] != '') {
include("functions.php");
  $sql = "
	SELECT		url, linkID, clicks
	FROM		links
	WHERE       linkID = ".$_GET['link'];

  $sql_result = mysqli_query($connection, $sql) or die ("Couldn't execute query.<br />$sql");
  $row = mysqli_fetch_array($sql_result);
  $url = $row['url'];
  $clicks = $row['clicks'];
  $clicks++;

  $sql = "UPDATE links SET clicks = ".$clicks." WHERE linkID = ".$row['linkID']." LIMIT 1";
  $sql_result = mysqli_query($connection, $sql) or die ("Couldn't execute query.<br />$sql");
  header("Location: ".$url);
}

?>
