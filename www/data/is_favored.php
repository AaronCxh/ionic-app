<?php
  require('init.php');
  $itemId = $_REQUEST['itemId'];
  $is_favored = $_GET['is_favored'];
  $sql = "UPDATE my_product SET is_favored = '$is_favored' WHERE pid = '$itemId'";
  mysqli_query($conn,$sql);
  $result = mysqli_query($conn,"select * from my_product WHERE pid = '$itemId'");
  $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
  echo json_encode($row);
?>
