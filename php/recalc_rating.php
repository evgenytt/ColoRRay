<?php

// 	Перерасчёт рейтинга. Никуда не прикручен ещё, потому что уровни не реализованы.

	session_start();
	if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
		header('Location: ../index.php');
		exit();
	}

	$con = mysqli_connect('localhost','tl','123123','colorray');
	if (!$con) {
		echo 'Could not connect: ' . mysqli_error($con);
		header('Location: ../index.php');
		exit();
	}
	
	$u = $_SESSION['username'];
	$t = intval($_POST[timems]);
	$cl = strval($_POST[level]);
	
	mysqli_select_db($con,"colorray");
	$sql = "SELECT level$cl FROM users WHERE username = '$u'";
	$result = mysqli_query($con,$sql);
	$row = mysqli_fetch_assoc($result);
	
	if ($row['level'.$cl] == NULL || intval($row['level'.$cl]) >= $t) {
		$sql = "UPDATE users SET level$cl=" . strval($t) . " WHERE username='$u';";
		$result = mysqli_query($con,$sql);
		
		$sql = "SELECT levels_num FROM info";
		$result = mysqli_query($con,$sql);
		$levels_num = mysqli_fetch_assoc($result);
		$l = $levels_num['levels_num'];
		
		$sql = "SELECT * FROM users WHERE username = '$u'";
		$result = mysqli_query($con,$sql);
		$row = mysqli_fetch_assoc($result);
		
		$rating = 0;
		
		for($i = 0; $i < $l; $i++) {
			echo '# ' . floatval($row['level'.strval($i+1)]) . '<br>';
			if (floatval($row['level'.strval($i+1)]) > 0) {
				$rating += 1200000.0 / floatval($row['level'.strval($i+1)]) + 1;
			}
		}
		
		$sql = "UPDATE users SET rating=".strval($rating)." WHERE username='$u';";
		$result = mysqli_query($con,$sql);
	}
	
	mysqli_close($con);
	header('Location: ../index.php');
?>