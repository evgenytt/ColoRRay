<?php 
	session_start();
	
	$sql = "UPDATE users SET lastlogin=".date("Y-m-d H:i:s")." WHERE userid=".$_SESSION['username'].";";
	$result = mysqli_query($con,$sql);

	unset($_SESSION['username']);
	header('Location: ../index.php');
?>