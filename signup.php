<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>ColoRRay</title>

		<link rel="icon" type="image/png" href="img/icon.png" />
		<link href="css/main.css" rel="stylesheet" type="text/css">
		<link href="css/login.css" rel="stylesheet" type="text/css">
		<link href="css/fonts.css" type="text/css" rel="stylesheet" />
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>

		<script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
		<script type="text/javascript" src="js/events.js"></script>
		<script type="text/javascript" src="js/resize.js"></script>
		<script type="text/javascript" src="js/init.js"></script>
		<script type="text/javascript" src="js/rating.js"></script>
		<script type="text/javascript" src="js/grid.js" charset="utf-8"></script>
	</head>
	<body>
		<div id="container">
			<div id="login" class="vertical">
				<?php
					$e = intval($_GET["error"]);
					switch($e) {
						case 1:
							echo '<p>Sorry, error connecting to the database</p>';
							break;
						case 2:
							echo '<p>A user with this username already exists!</p>';
							break;
						case 3:
							echo '<p>A user with this username doesn\'t exist!</p>';
							break;
						case 4:
							echo '<p>Incorrect password</p>';
							break;
						case 5:
							echo '<p>Universe shifted and caused an error.</p>';
							break;
					}
				?>
				<form action="/php/login.php" method="post">
					<input type="text"required name="username" placeholder="Username" autocomplete="off" maxlength=22/>
					<input type="password"required name="password" placeholder="Password" autocomplete="off"/>
					<input type="submit" name="action" value="Sign Up"/>
					<input type="submit" name="action" value="Log In"/>
					<p><a href="index.php">Cancel</a></p>
				</form>
			</div>
		</div>
	</body>
</html> 
