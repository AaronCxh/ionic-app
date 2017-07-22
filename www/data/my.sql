SET NAMES UTF8;
DROP DATABASE IF EXISTS my;
CREATE DATABASE my CHARSET=UTF8;
USE my;

/**用户表**/
CREATE TABLE user(
    userId INT PRIMARY KEY AUTO_INCREMENT, /*用户编号*/
    phone VARCHAR(11),                 	/*电话*/
    email VARCHAR(128),                	/*邮箱*/
    upwd VARCHAR(32),	               	/*密码*/
    nickname VARCHAR(32) NOT NULL DEFAULT '',	  /*昵称*/
    sex	VARCHAR(1) NOT NULL DEFAULT '',		  /*性别，M-男，F-女, DEFAULT 'M'*/
    age	VARCHAR(3) NOT NULL DEFAULT '',		  /*年龄*/
    image	VARCHAR(128) NOT NULL DEFAULT '',	      /*图片*/
    imagebg	VARCHAR(128) NOT NULL DEFAULT ''	      /*背景图片*/
);
INSERT INTO user VALUES
(1, '13501234567','123456@qq.com', '123456','韩小米','','','img/detail.jpg','img/timg.jpg'),
(2, '13812345678','234566@qq.com', '123456','韩大米','','','','');

CREATE TABLE my_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  pname VARCHAR(64),          /*产品名称*/
  currprice FLOAT(8,2),     /*现价*/
  origprice FLOAT(8,2),      /*原价*/
  pic VARCHAR(32),          /*图片*/
  pintro VARCHAR(128),     /*简介*/
  type VARCHAR(32),         /*类型*/
  is_favored  VARCHAR(32)       /*收藏*/
);

INSERT INTO my_product VALUES
(1,'博朗1（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','1','0'),
(2,'博朗2（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','1','0'),
(3,'博朗3（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','1','0'),
(4,'博朗4（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','1','0'),
(5,'博朗5（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','2','0'),
(6,'博朗6（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','2','0'),
(7,'博朗7（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','2','0'),
(8,'博朗8（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','2','0'),
(9,'博朗9（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','123456','3','0'),
(10,'博朗10（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','3','0'),
(11,'博朗11（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','3','0'),
(12,'博朗12（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','3','0'),
(13,'博朗13（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','3','0'),
(14,'博朗14（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','4','0'),
(15,'博朗15（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','4','0'),
(16,'博朗16（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','4','0'),
(17,'博朗17（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','4','0'),
(18,'博朗18（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','4','0'),
(19,'博朗19（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','4','0'),
(20,'博朗20（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','4','0'),
(21,'博朗21（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','4','0'),
(22,'博朗22（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','5','0'),
(23,'博朗23（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','5','0'),
(24,'博朗24（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','5','0'),
(25,'博朗25（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','6','0'),
(26,'博朗26（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','6','0'),
(27,'博朗27（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','6','0'),
(28,'博朗28（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','7','0'),
(29,'博朗29（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','7','0'),
(30,'博朗30（BRAUN）CJ3000 电动 榨橙汁机 柳橙机',350.00,300.00,'img/image1.suning.jpg','98765','7','0');



/**购物车表**/
CREATE TABLE my_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  userId INT
);
INSERT INTO my_cart VALUES
(100, 1);

/**购物车详情表**/
CREATE TABLE my_cart_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  cartId INT,
  productId INT,
  count INT
);
INSERT INTO my_cart_detail VALUES
(NULL, 100, 1, 2),
(NULL, 100, 1, 1),
(NULL, 100, 1, 3);


/*商品图片*/
CREATE TABLE myimg(
    ImgId INT PRIMARY KEY AUTO_INCREMENT,
    PID INT,
    URL VARCHAR(64)
);
INSERT INTO myimg VALUES
(NULL,'1','img/image1.suning.jpg'),
(NULL,'1','img/image2.suning.jpg'),
(NULL,'1','img/image3.suning.jpg'),
(NULL,'1','img/image5.suning.jpg'),
(NULL,'1','img/image5.suning.jpg'),
(NULL,'2','img/image5.suning.jpg'),
(NULL,'2','img/image5.suning.jpg'),
(NULL,'2','img/image5.suning.jpg'),
(NULL,'3','img/image5.suning.jpg'),
(NULL,'3','img/image5.suning.jpg'),
(NULL,'3','img/image5.suning.jpg'),
(NULL,'3','img/image5.suning.jpg'),
(NULL,'4','img/image5.suning.jpg'),
(NULL,'4','img/image5.suning.jpg'),
(NULL,'4','img/image5.suning.jpg'),
(NULL,'5','img/image5.suning.jpg'),
(NULL,'5','img/image5.suning.jpg'),
(NULL,'5','img/image5.suning.jpg'),
(NULL,'5','img/image5.suning.jpg'),
(NULL,'5','img/image5.suning.jpg'),
(NULL,'6','img/image5.suning.jpg'),
(NULL,'6','img/image5.suning.jpg'),
(NULL,'6','img/image5.suning.jpg'),
(NULL,'6','img/image5.suning.jpg'),
(NULL,'6','img/image5.suning.jpg'),
(NULL,'7','img/image5.suning.jpg'),
(NULL,'7','img/image5.suning.jpg'),
(NULL,'7','img/image5.suning.jpg'),
(NULL,'8','img/image5.suning.jpg'),
(NULL,'8','img/image5.suning.jpg'),
(NULL,'9','img/image5.suning.jpg'),
(NULL,'9','img/image5.suning.jpg'),
(NULL,'10','img/image5.suning.jpg'),
(NULL,'10','img/image5.suning.jpg'),
(NULL,'10','img/image5.suning.jpg'),
(NULL,'10','img/image5.suning.jpg'),
(NULL,'11','img/image5.suning.jpg'),
(NULL,'11','img/image5.suning.jpg'),
(NULL,'11','img/image5.suning.jpg'),
(NULL,'12','img/image5.suning.jpg'),
(NULL,'12','img/image5.suning.jpg'),
(NULL,'13','img/image5.suning.jpg'),
(NULL,'13','img/image5.suning.jpg'),
(NULL,'13','img/image5.suning.jpg'),
(NULL,'13','img/image5.suning.jpg'),
(NULL,'14','img/image5.suning.jpg'),
(NULL,'14','img/image5.suning.jpg'),
(NULL,'14','img/image5.suning.jpg'),
(NULL,'14','img/image1.suning.jpg'),
(NULL,'15','img/image5.suning.jpg'),
(NULL,'15','img/image5.suning.jpg'),
(NULL,'15','img/image5.suning.jpg'),
(NULL,'15','img/image1.suning.jpg'),
(NULL,'16','img/image5.suning.jpg'),
(NULL,'16','img/image5.suning.jpg'),
(NULL,'17','img/image5.suning.jpg'),
(NULL,'17','img/image5.suning.jpg'),
(NULL,'18','img/image5.suning.jpg'),
(NULL,'18','img/image5.suning.jpg'),
(NULL,'19','img/image5.suning.jpg'),
(NULL,'19','img/image5.suning.jpg'),
(NULL,'20','img/image5.suning.jpg'),
(NULL,'20','img/image5.suning.jpg'),
(NULL,'20','img/image5.suning.jpg'),
(NULL,'21','img/image5.suning.jpg'),
(NULL,'21','img/image5.suning.jpg'),
(NULL,'21','img/image5.suning.jpg'),
(NULL,'22','img/image5.suning.jpg'),
(NULL,'22','img/image5.suning.jpg'),
(NULL,'23','img/image5.suning.jpg'),
(NULL,'23','img/image1.suning.jpg'),
(NULL,'23','img/image5.suning.jpg'),
(NULL,'24','img/image5.suning.jpg'),
(NULL,'24','img/image5.suning.jpg'),
(NULL,'24','img/image5.suning.jpg'),
(NULL,'25','img/image5.suning.jpg'),
(NULL,'25','img/image1.suning.jpg'),
(NULL,'25','img/image5.suning.jpg'),
(NULL,'26','img/image5.suning.jpg'),
(NULL,'26','img/image5.suning.jpg'),
(NULL,'27','img/image5.suning.jpg'),
(NULL,'27','img/image1.suning.jpg'),
(NULL,'27','img/image5.suning.jpg'),
(NULL,'28','img/image5.suning.jpg'),
(NULL,'28','img/image1.suning.jpg'),
(NULL,'29','img/image5.suning.jpg'),
(NULL,'29','img/image5.suning.jpg'),
(NULL,'30','img/image5.suning.jpg'),
(NULL,'30','img/image1.suning.jpg');

/*categories*/
CREATE TABLE categories
(
cat_id int(11) NOT NULL AUTO_INCREMENT,
name varchar(150),
parent int(11),
media varchar(100),
PRIMARY KEY (`cat_id`)
);

INSERT INTO categories VALUES
(NULL,'food',0,''),
(NULL,'home',0,''),
(NULL,'clothes',0,''),
(NULL,'accessories',0,''),
(NULL,'electronics',0,''),
(NULL,'office and school supplies',0,''),
(NULL,'sports',0,'');








