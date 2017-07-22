<?php

@$email=$_REQUEST['email'] or die('email required');
@$upwd=$_REQUEST['password'] or die('upwd required');

require('init.php');

/*去数据库中查询*/
$sql="SELECT userId,image,nickname,imagebg FROM user WHERE email='$email' AND upwd='$upwd'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);

if($row){
    $output['code']=1;
    $output['userId']=intval($row['userId']);
    $output['image']=$row['image'];
    $output['imagebg']=$row['imagebg'];
    $output['nickname']=$row['nickname'];
}else{
    $output['code']=400;
}

/*返回响应*/
echo json_encode($output);
