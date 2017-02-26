<?php

echo $_POST['action'].' '.$_POST['username'].' '.$_POST['password'];

if (isset($_POST['action']) && isset($_POST['username']) && isset($_POST['password'])) {
	
	$action = $_POST['action'];
	$u = $_POST['username'];
	$con = mysqli_connect('localhost','tl','123123','colorray');
	if (!$con) {
		echo 'Could not connect: ' . mysqli_error($con);
		exit();
	}

	mysqli_select_db($con,"colorray");
	$sql="SELECT * FROM users WHERE username = '$u'";
	$result = mysqli_query($con,$sql);
		
	$rows = mysqli_num_rows($result);
	echo "</br>There are $rows rows";

	if ($action == "signup")
	{
		if ($rows > 0) {
			echo '<p>This username already exists</p>';
			exit();
		}
			
		$sql = "INSERT INTO users (username, password, rating, lastlogin) VALUES ('" . $u . "', '" . $_POST['password'] . "', 0, '" . date("Y-m-d H:i:s") . "');";		
		echo "</br>$sql";
		$result = mysqli_query($con,$sql);
		
		session_start();
		$_SESSION['username'] = $u;
		echo '<p>Welcome, ' . $_SESSION['username'] . '!</p>';
		header('Location: ../index.php');
		exit;
		
	} elseif ($action=='login') {
		if ($rows < 1) {
			echo '<p>There is no' . $u . 'in our database.</p>';
			exit();
		} else {
			$row = mysqli_fetch_assoc($result);
			if ($row['password'] != $_POST['password']) {
				echo "<p>Incorrect password for $u</p>";
				exit();
			} else {
				session_start();
				$_SESSION['username'] = $u;
				echo '<p>Welcome back, ' . $_SESSION['username'] . '!</p>';
				header('Location: ../index.php');
				exit;
			}
		}
	} else {
		echo 'There was an error.';
		exit();
	}
	mysqli_close($con);
} else {
	echo 'There was an impossible error.';
} 
?>