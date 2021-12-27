<?php
require $_SERVER['DOCUMENT_ROOT'] . "/sosketch/settings/init.php";

$imgSql = "SELECT * from images ORDER BY imgDate DESC";

$images = $db->sql($imgSql);

echo(json_encode($images));

?>