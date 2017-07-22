<?php
@$email = $_REQUEST['email'] or die('email required');
@$upwd = $_REQUEST['password'] or die('upwd required');
@$nickname = $_REQUEST['name'] or die('nickname required');
@$image = $_REQUEST['image'] or $image = 'img/136518490.jpg';
@$imagebg = $_REQUEST['imagebg'] or $imagebg = 'img/detail01.jpg';

require('init.php');

$sql = "select * from user where email = '$email'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
  $output['code'] = -1;
  $output['msg'] = '邮箱已注册';
}else{
$sql = "INSERT INTO user (userId,phone,email,upwd,nickname,sex,age,image,imagebg) VALUES(NULL,'','$email','$upwd','$nickname','','','$image','$imagebg')";
$result = mysqli_query($conn,$sql);

if($result){
  $output['code'] = 1;
  $output['userId'] = intval(mysqli_insert_id($conn));
  $output['image']=$image;
  $output['imagebg']=$imagebg;
  $output['nickname']=$nickname;
}else {
  $output['code'] = 500;
}
}

echo json_encode($output);
