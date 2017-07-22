<?php
/**
*请求参数：
  pageNum-需显示的页号；默认为1
*输出结果：
  {
    totalRecord: ,  //总条数
    pageSize: ,     //每页显示的条数
    pageCount: ,     //总页数
    pageNum: 1,       //请求的页码
    data: [{},{} ... {}]  //数据
  }
*/
require('init.php');
@$pageNum = $_REQUEST['pageNum'] or $pageNum = 1;
$output['pageNum'] = intval($pageNum);
$output['pageSize'] = 6;
//获取总记录数和总页数
$sql = "SELECT COUNT(*) FROM my_product";
$result = mysqli_query($conn,$sql);
$output['totalRecord'] = intval( mysqli_fetch_row($result)[0] );
$output['pageCount'] = ceil($output['totalRecord']/$output['pageSize']);

//获取指定页中的数据
$start = ($output['pageNum']-1)*$output['pageSize'];
$count = $output['pageSize'];
$sql = "SELECT * FROM my_product LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
$output['code'] = 1;
echo json_encode($output);
?>
