<?php
session_start();
require_once("inc/functions.php");
?>
<!DOCTYPE HTML>
<head>
<meta charset="UTF-8" />
<title>Aaron's Portal</title>
<link rel="stylesheet" type="text/css" href="inc/style.css" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="inc/script.js"></script>
</head>

<body>
<div id="wrapper_header">
  <div id="container_header">
    <h1>Aaron’s Portal</h1>
    <div class="header_right">
      <div class="google_search">
        <form action="http://www.google.com/search" method="GET">
          <input type="text" value="" maxlength="255" size="31" name="q" placeholder="Search Google" />
          <input type="submit" value="Search" name="btnG" />
        </form>
      </div>
      <ul>
        <li class="google"><a href="http://www.google.com"><span>Google</span></a></li>
        <li class="gmail"><a href="http://mail.google.com"><span>GMail</span></a></li>
        <li class="facebook"><a href="http://www.facebook.com"><span>Facebook</span></a></li>
        <li class="twitter"><a href="http://www.twitter.com"><span>Twitter</span></a></li>
      </ul>
    </div>
    <div class="clear"></div>
  </div><!-- container_header -->
</div><!-- wrapper_header -->

<div id="wrapper_nav">
  <div id="container_nav">
    <ul>
      <li class="feeds"><a href="#feeds">Feeds</a></li>
      <li class="bookmarks"><a href="#bookmarks">Bookmarks</a></li>
    </ul>
  </div><!-- container_nav -->
</div><!-- wrapper_nav -->

<div id="wrapper_content">
  <div id="container_content">

    <div id="bookmarks" class="blocks">
<?php display_bookmarks(); ?>
    </div><!-- bookmarks -->

    <div id="feeds" class="blocks">
<?php //get_feeds(); ?>
    </div><!-- feeds -->

    <div class="clear"></div>
  </div><!-- container_content -->
</div><!-- wrapper_content -->

<div id="wrapper_footer">
  <div id="container_footer">
<?php if (isset($_SESSION['pw']) && $_SESSION['pw'] == 'monkeys') { ?>
    <div id="control_bookmarks" class="control_panel">
	  <ul class="manage_bookmarks">
		<li><a href="#add">Add Bookmarks</a></li>
		<li><a href="#edit">Edit/Reorder Categories</a></li>
		<li><a href="#delete">Delete Bookmarks</a></li>
	  </ul>

	  <!-- add bookmarks -->
	  <div id="add_bookmarks" class="dialog">
		<form action="inc/action.php?action=add_bookmark" method="post">
		  <p><label for="bookmark_name">Name</label><br />
		  <input type="text" name="bookmark_name" required /></p>

		  <p><label for="bookmark_url">URL</label><br />
		  <input type="url" name="bookmark_url" required /></p>

		  <p><label for="bookmark_cat">Category</label><br />
		  <select name="bookmark_cat" id="bookmark_cat">
			<optgroup label="SELECT A CATEGORY">
	<?php echo bookmark_cat(); ?>
			</optgroup>
			<optgroup label="OR ADD NEW:">
			  <option value="addnew">Add New</option>
			</optgroup>
		  </select></p>
		  <p id="bookmark_cat_add" style="display: none;">
			<input type="text" name="bookmark_cat_add" /><br />
			<input type="text" name="bookmark_cat_add_rank" style="width: 20%;" />
		  </p>

		  <p><input type="submit" value="Submit" name="submit" /></p>
		</form>
	  </div>

	  <!-- delete bookmarks -->
	  <div id="delete_bookmarks" class="dialog">
		<p class="ajax_message">Hello.</p>
		<p>You are about to delete <span class="number">0</span> bookmarks.</p>
		<ul>
		  <li><a href="#">Yes</a></li>
		  <li><a href="#">No</a></li>
		</ul>
		<div class="clear"></div>
	  </div>
	</div><!-- control bookmarks -->

	  <!-- edit bookmark categories -->
	  <div id="edit_cats" class="dialog">
	    <form action="inc/action.php?action=edit_cat" method="post">
	      <input type="submit" name="submit" value="Submit" />
	    </form>
      </div>
	</div><!-- control bookmarks -->

	<div id="control_feeds" class="control_panel">
	  <ul class="manage_bookmarks">
		<li><a href="#add_feed">Add Feeds</a></li>
		<li><a href="#edit_feed">Edit/Reorder Feeds</a></li>
		<li><a href="#delete_feed">Delete Feeds</a></li>
	  </ul>

	  <!-- add feeds -->
	  <div id="add_feeds" class="dialog">
		<form action="inc/action.php?action=add_feed" method="post">
		  <p><label for="feed_url">Feed URL</label><br />
		  <input type="url" name="feed_url" required /></p>
		  <p><label for="feed_rank">Feed Rank</label><br />
		  <input type="number" name="feed_rank" required /></p>
		  <p><input type="submit" value="Submit" name="submit" /></p>
	    </form>
	  </div>

	</div><!-- control_feeds -->

<?php } else if (isset($_SESSION['pw']) && $_SESSION['pw'] != 'monkeys') { ?>
    <p class="wrong_pw">That was the wrong password.</p>
    <form action="inc/action.php?action=login" method="post">
      <input type="password" name="pw" id="pw" />
      <input type="submit" name="submit" value="Log In" />
    </form>
<?php } else { ?>
    <form action="inc/action.php?action=login" method="post">
      <input type="password" name="pw" id="pw" />
      <input type="submit" name="submit" value="Log In" />
    </form>
<?php } ?>
  </div><!-- container_footer -->
</div><!-- wrapper_footer -->

<div id="feedback">feedback</div>

</body>
</html>
