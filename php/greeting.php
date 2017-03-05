<?php 
	session_start();
	if (isset($_SESSION['username']) && !empty($_SESSION['username'])) {
		$u = $_SESSION['username'];
		echo "<h3>Hello, $u!</h3>";
	}
?> 
