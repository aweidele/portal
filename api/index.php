<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
$connection = mysqli_connect("localhost", "angrychi_angryc", "gS87gh7IGHas") or die ("Couldn't connect to server.");
$db = mysqli_select_db($connection,"angrychi_portal") or die ("Couldn't select database");

$sql = "
	SELECT		*
	FROM		links, link_cat
	WHERE		active = 1 AND catID = cat
	ORDER BY	rank, linkName";
$sql_result = mysqli_query($connection, $sql) or die ("Couldn't execute query.");
$results = mysqli_fetch_all($sql_result, MYSQLI_ASSOC);
echo json_encode($results);