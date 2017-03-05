<?php

if (isset($_POST['action']) && isset($_POST['username']) && isset($_POST['password'])) {
	
	$action = $_POST['action'];
	$u = $_POST['username'];
	$con = mysqli_connect('localhost','tl','123123','colorray');
	if (!$con) {
		header('Location: ../signup.php?error=1');
		exit();
	}

	mysqli_select_db($con,"colorray");
	$sql="SELECT * FROM users WHERE username = '$u'";
	$result = mysqli_query($con,$sql);
		
	$rows = mysqli_num_rows($result);

	if ($action == "Sign Up")
	{
		if ($rows > 0) {
			header('Location: ../signup.php?error=2');
			exit();
		}
			
		$sql = "INSERT INTO users (username, password, rating, lastlogin) VALUES ('" . $u . "', '" . $_POST['password'] . "', 0, '" . date("Y-m-d H:i:s") . "');";		
		$result = mysqli_query($con,$sql);
		
		$sql = "UPDATE users SET lastlogin=".date("Y-m-d H:i:s")." WHERE userid=".$u.";";
		$result = mysqli_query($con,$sql);
		
		session_start();
		$_SESSION['username'] = $u;
		header('Location: ../index.php');
		exit;
		
	} elseif ($action=='Log In') {
		header('Location: ../signup.php?error=3');
		if ($rows < 1) {
			exit();
		} else {
			$row = mysqli_fetch_assoc($result);
			if ($row['password'] != $_POST['password']) {
				header('Location: ../signup.php?error=4');
				exit();
			} else {
				session_start();
				$_SESSION['username'] = $u;
				header('Location: ../index.php');
				exit;
			}
		}
	} else {
		header('Location: ../signup.php?error=5');
		exit();
	}
	mysqli_close($con);
} else {
	header('Location: ../signup.php?error=5');
} 
?>