<?php
require $_SERVER['DOCUMENT_ROOT'] . "/sosketch/settings/init.php";

$imgId;
$file = $_FILES;
$postData = json_decode(file_get_contents('php://input'));

$canvasImg = $file["canvasImg"]["tmp_name"];

if (!empty($postData)) {
  if (isset($postData->customer)) {
    $imgSql =
      "INSERT INTO images (imgDate) VALUES(:imgDate); SELECT imgId FROM images ORDER BY imgId DESC LIMIT 1";
    $imgBind = [
      ":imgDate" => gmdate("Y-m-d H:i:s"),
    ];

    $imgId = $db->sql($imgSql, $imgBind, false);

    /*
    $orderIdSql = "SELECT orderId FROM orders ORDER BY orderId DESC LIMIT 1";

    $orderId = $db->sql($orderIdSql, null)[0];
    */
  }

  if (!empty($canvasImg) && isset($imgId)) {
    move_uploaded_file($canvasImg, $_SERVER['DOCUMENT_ROOT'] . "/sosketch/uploads/submittedimages" . basename($imgId["name"]));
  }

  echo json_encode($orderId->orderId);
} else {
  echo "TEST 2";
}
?>