<?php
  /*
   **  输出请求:
   **  {
   **    "Categories": [
   **      {
   **         "cat_id": "1",
   **         "name": "food",
   **         "media": "",
   **         "sub_categories": [{},{},{}...{}]
   **      },
   **      {
   **       "cat_id": "2",
   **       "name": "home",
   **       "media": "",
   **       "sub_categories": [{},{},{}...{}]
   **       },
   **       ...
   **    ]
   **    "code":1
   **  }
   **
   */
  require('init.php');
  @$cateName = $_REQUEST['main_category'] or $cateName = null;
  if(!$cateName){
    $sql = mysqli_query($conn,"select cat_id,name,media from categories where parent=0");
  }else{
    $sql = mysqli_query($conn,"select cat_id,name,media from categories where name = '$cateName'");
  }
  $categories = array("Categories" => array());

  while ($row = mysqli_fetch_array($sql))
  {
  $cat_id = $row['cat_id'];

  $ssql = mysqli_query($conn,"select * from my_product where type='$cat_id'");

  $category = array();
  $category["cat_id"] = $row["cat_id"];
  $category["name"] = $row["name"];
  $category["media"] = $row["media"];
  $category["sub_categories"] = array();

  while ($srow = mysqli_fetch_array($ssql))
  {
  $subcat = array();
  $subcat["pid"] = $srow['pid'];
  $subcat["name"] = $srow['pname'];
  $subcat["currprice"] = $srow['currprice'];
  $subcat["origprice"] = $srow['origprice'];
  $subcat["pic"] = $srow['pic'];
  $subcat["pintro"] = $srow['pintro'];
  $subcat["type"] = $srow['type'];
  // pushing sub category into subcategories node
  array_push($category["sub_categories"], $subcat);
  }

  // pushing sinlge category into parent
  array_push($categories["Categories"], $category);
  }
  $categories['code'] = 1;
  //echo ((isset($_GET['callback'])) ? $_GET['callback'] : "") . '(' . json_encode($categories) . ')';
  echo json_encode($categories)
?>
