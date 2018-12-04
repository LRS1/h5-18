<?php
  /*
        将商品的id和数量添加到购物车里('GET')
        id=id(商品id)
        number=num(商品数量)
     */
    
    //连接数据库,并判断是用GET还是POST方式
  include 'connect.php';

  //购买商品的id
  // $id=isset($_GET['id']) ? $_GET['id'] : '';
  // 购买商品数量
  
  $title=isset($_POST['title']) ? $_POST['title'] : '12';
  $num=isset($_POST['num']) ? $_POST['num'] : '12';
  $price=isset($_POST['price']) ? $_POST['price'] : '12';
  $url=isset($_POST['url']) ? $_POST['url'] : '12';

  $sql1="SELECT * FROM orderCar where price=$price";

  // $sql2="update shopcar set num=$num where name='$name'";

  // echo $sql2;

  $res1=$conn->query($sql1);
  if($res1->num_rows>0){// 如果商品存在，

      $row1=$res1->fetch_all(MYSQLI_ASSOC);
      // echo $row1;
      $num2=$row1[0]['num']+$num;
        $sql2="update orderCar set num='$num2' where price='$price'";
        $res2=$conn->query($sql2);
         if($res2){
              echo '1';//更新成功
          }else{
              echo '0';//更新失败
          };


        }else{//如果商品不存在，
            $sql3="INSERT INTO orderCar (title,num,price,url) VALUES ('$title','$num','$price','$url')";
            $res3=$conn->query($sql3);
             if($res3){
                  echo '2';//添加成功
              }else{
                  echo '3';//添加失败
              };
        }

  //关闭结果集
    // $res->close();
    //关闭数据库
    $conn->close();
?>