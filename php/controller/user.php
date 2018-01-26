<?php
require_once("../init.php");



function register(){
	global $conn;
	@$uphone=$_REQUEST["uphone"];
	@$upwd=$_REQUEST["upwd"];
	@$gender=$_REQUEST["gender"];
	@$birth=$_REQUEST["birth"];
	@$email=$_REQUEST["email"];
	if($uphone&&$upwd){
		$sql="INSERT INTO mx_user (uid,uphone,upwd,gender,birth,email) VALUES (null,'$uphone','$upwd','$gender','$birth','$email')";
		mysqli_query($conn,$sql);
	}
}
function checkphone(){
	global $conn;
	@$uphone=$_REQUEST["uphone"];
	if($uphone){
		$sql="SELECT uphone FROM mx_user WHERE uphone='$uphone'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$users[]= $row;}
		if(count($users)==0){
			echo 0;
		}else{
			echo 1;
		}
	}
}
function login(){
	global $conn;
	@$uphone=$_REQUEST["uphone"];
	@$upwd=$_REQUEST["upwd"];
	if($uphone&&$upwd){
		$sql="SELECT uid FROM mx_user WHERE uphone='$uphone' AND BINARY upwd='$upwd'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$user[]= $row;}
		if(count($user)!=0){
			session_start();
			$_SESSION["uid"]=$user[0]["uid"];
			echo $user[0]["uid"];
		}else{
			echo 0;
		}
	}
}
function autologin(){
	global $conn;
	@$uid=$_REQUEST["uid"];
	if($uid){
		$sql="SELECT uid,uphone FROM mx_user WHERE uid='$uid'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$user[]= $row;}
		if(count($user)!=0){
			session_start();
			$_SESSION["uid"]=$user[0]["uid"];
			echo 1;
		}else{
			echo 0;
		}
	}
}
function phonelogin(){
	global $conn;
	@$uphone=$_REQUEST["uphone"];
	if($uphone){
		$sql="SELECT uid FROM mx_user WHERE uphone='$uphone'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$user[]= $row;}
		if(count($user)!=0){
			session_start();
			$_SESSION["uid"]=$user[0]["uid"];
			echo 1;
		}else{
			echo 0;
		}
	}
}
function phoneregister(){
	global $conn;
	@$uphone=$_REQUEST["uphone"];
	if($uphone){
		$sql="INSERT INTO mx_user (uphone,upwd) VALUES ('$uphone','$uphone')";
		mysqli_query($conn,$sql);
		$sql="SELECT uid FROM mx_user WHERE uphone='$uphone'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$user[]= $row;}
		session_start();
		$_SESSION["uid"]=$user[0]["uid"];
	}
}
function islogin(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="SELECT uid,uphone FROM mx_user where uid='$uid'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$uphone[]= $row;}
		echo json_encode($uphone[0]);
	}else{
		echo json_encode(0);
	}
}
function checkcart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="SELECT COUNT(uid) FROM mx_cart where uid='$uid'";
		$result=mysqli_query($conn,$sql);
		$output=mysqli_fetch_row($result);
		echo $output[0];
	}else{
		echo 0;
	}
}

function userdetail(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="SELECT uphone,gender,birth,email FROM mx_user where uid='$uid'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$user[]= $row;}
		echo json_encode($user[0]);
	}else{
		echo json_encode(0);
	}
}

function userupdate(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$gender=$_REQUEST["gender"];
	@$birth=$_REQUEST["birth"];
	@$email=$_REQUEST["email"];
	if($uid){
		$sql="UPDATE mx_user SET gender='$gender',birth='$birth',email='$email' where uid='$uid'";
		mysqli_query($conn,$sql);
		echo 1;
	}
}

function useraddress(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="SELECT aid,receive,province,city,block,phone,homenumber,postcode,details FROM `mx_address` WHERE uid='$uid'";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$user[]= $row;}
		echo json_encode($user[0]);
	}else{
		echo json_encode(0);
	}
}

function deladdress(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$aid=$_REQUEST["aid"];
	if($uid){
		$sql="DELETE FROM mx_address WHERE aid='$aid' AND uid = '$uid'";
		mysqli_query($conn,$sql);
		echo 1;
	}else{
		echo 0;
	}
}
function addaddress(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$receiver=$_REQUEST["receiver"];
	@$province=$_REQUEST["province"];
	@$city=$_REQUEST["city"];
	@$block=$_REQUEST["block"];
	@$phone=$_REQUEST["phone"];
	@$homenumber=$_REQUEST["homenumber"];
	@$postcode=$_REQUEST["postcode"];
	@$details=$_REQUEST["details"];
	if($uid){
		$sql="INSERT INTO mx_address (uid,receiver,province,city,block,phone,homenumber,postcode,details) VALUES ('$uid','$receiver','$province','$city','$block','$phone','$homenumber','$postcode','$details')";
		mysqli_query($conn,$sql);
		echo 1;
	}else{
		echo 0;
	}
}

function getorder(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	if($uid){
		$sql="SELECT mx_order.pid,mx_product_pic.simg,mx_product.title,mx_product.nprice,mx_order.count,mx_order.status,mx_order.order_time FROM mx_order,mx_product,mx_product_pic WHERE uid='$uid' AND mx_order.pid=mx_product.pid AND mx_order.pid=mx_product_pic.pid";
		$result=mysqli_query($conn,$sql);
		while($row = mysqli_fetch_array($result,MYSQLI_ASSOC)){$order[]= $row;}
		echo json_encode($order);
	}else{
		echo json_encode(0);
	}
}









?>