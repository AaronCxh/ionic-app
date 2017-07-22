<?php
  //商品详情
  require('init.php');
  @$pid = $_REQUEST['pid'] or die('{"code":-1,"msg":"error"}');
  $sql = "SELECT * FROM my_product WHERE pid = '$pid'";
  $result = mysqli_query($conn,$sql);
  $output = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $sql = "SELECT URL FROM myimg WHERE PID = $pid";
  $result = mysqli_query($conn,$sql);
  $output['images'] = mysqli_fetch_all($result,MYSQLI_ASSOC);
  echo json_encode($output);
?>
