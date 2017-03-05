<?php
	session_start();
	if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
		echo '<p data-action="login">Sign Up / Log In</p>';
	} else {
		echo '<p data-action="logout">Log Out</p>';
	}
?> 
