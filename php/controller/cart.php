<?php
require_once("../init.php");
function addcart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$pid=$_REQUEST["pid"];
	@$count=$_REQUEST["count"];
	@$bless=$_REQUEST["bless"];
	if($uid&&$pid&&$count){
		$sql="INSERT INTO mx_cart(uid,pid,count,bless) VALUES('$uid','$pid','$count','$bless')";
		mysqli_query($conn,$sql);
		echo 1;
	}else{
		echo 0;
	}
}
function showcart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="	SELECT mx_cart.pid,mx_cart.count,mx_cart.cid,mx_cart.bless,mx_product.title,mx_product.pound,mx_product.taste,mx_product.nprice,mx_product_pic.simg 
					FROM mx_cart,mx_product,mx_product_pic 
					WHERE mx_cart.uid='$uid' AND mx_cart.pid=mx_product.pid AND mx_cart.pid=mx_product_pic.pid";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
		echo json_encode($products);
	}else{
		echo json_encode(0);
	}
}
function deletecart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$cid=$_REQUEST["cid"];
	if($uid&&$cid){
		$sql="DELETE  FROM mx_cart where cid='$cid' AND uid='$uid'";
		mysqli_query($conn,$sql);
		echo 1;
	}else{
		echo 0;
	}
}
function useraddress(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="SELECT *FROM `mx_address` WHERE uid='$uid'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$products[]= $row;}
		echo json_encode($products);
	}else{
		echo json_encode(0);
	}
}


function addorder(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$pid=$_REQUEST["pid"];
	@$aid=$_REQUEST["aid"];
	@$count=$_REQUEST["count"];
	@$order_time=$_REQUEST["order_time"];
	@$cid=$_REQUEST["cid"];
	if($uid){
		$sql="INSERT INTO mx_order (uid,aid,pid,count,order_time) VALUES('$uid','$aid','$pid','$count','$order_time')";
		$result=mysqli_query($conn,$sql);
		if($result){
			$sql="DELETE  FROM mx_cart where cid='$cid' AND uid='$uid'";
			mysqli_query($conn,$sql);
			echo 1;
		}else{
			echo 0;
		}
	}
}




?>