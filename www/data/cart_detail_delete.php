<?php
/*
*接收客户端提交的详情编号did，从购物车详情中删除该记录，返回{"code":1,"msg":"删除成功"}
*/
header('Content-Type: application/json');

@$pid = $_REQUEST['pid'] or die('{"code":-2,"msg":"购买详情记录的编号不能为空"}');
@$userId = $_REQUEST['uid'] or die('{"code":-2,"msg":"用户编号不能为空"}');
require('init.php');

$sql = "DELETE FROM my_cart_detail WHERE productId=$pid";
$result = mysqli_query($conn, $sql);

$sql = "SELECT pid,pname,origprice,pic,did,count FROM my_product,my_cart_detail WHERE cartId=( SELECT cid FROM my_cart WHERE userId=$userId ) AND pid=productId";
$result = mysqli_query($conn, $sql);
$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($list);


