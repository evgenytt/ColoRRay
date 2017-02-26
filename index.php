<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>ColoRRay</title>

		<link rel="icon" type="image/png" href="img/icon.png" />
		<link href="css/main.css" rel="stylesheet" type="text/css">
		<link href="css/fonts.css" type="text/css" rel="stylesheet" />
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>

		<script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
		<script type="text/javascript" src="js/events.js"></script>
		<script type="text/javascript" src="js/resize.js"></script>
		<script type="text/javascript" src="js/init.js"></script>
		<script type="text/javascript" src="js/grid.js" charset="utf-8"></script>
	</head>
	<body>
		
		
		<div id="container">
			<div id="menu" class="menu screen">
				<div class="vertical">
					<?php 
						session_start();
						if (isset($_SESSION['username']) && !empty($_SESSION['username'])) {
							echo "<h3>Hello, " . $_SESSION['username'] . "!</h3>";
						}
					?>
					<p data-action="play">Play</p>
					<?php
						session_start();
						if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
							echo '<p data-action="login">Sign Up / Log In</p>';
						} else {
							echo '<p data-action="logout">Log Out</p>';
						}
					?>
					<p data-action="rating">Rating</p>
					<p data-action="about">About</p>
				</div>
			</div>

			<div id="play" class="menu screen">
				<div class="vertical">
					<p data-action="arcade">Arcade</p>
					<p data-action="showmenu">Back</p>
				</div>
			</div>
			
			<div id="login" class="screen">
				<div class="vertical">
					<div><?php include('/php/greeting.php'); ?></div>
					<div>
						<div id="login">
							<form action="/php/login.php" method="post">
								<input type="text"required name="username" placeholder="Username" autocomplete="off"/>
								<input type="password"required name="password" placeholder="Password" autocomplete="off"/>
									
								<button type="submit" name="action" value="signup">Sign Up</button>
								<button type="submit" name="action" value="login">Log In</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			<div id="logout" class="screen">
				<div class="vertical">
					<h3>Are you sure you want to log out?</h3>
					<p><a href="/php/logout.php">Positive</a></p>
					<p data-action="showmenu">No, go back</p>
				</div>
			</div>

			<div id="rating" class="screen" data-action="showmenu">
				<h3>Rating</h3>
				<div class="table">
					<?php
						$con = mysqli_connect('localhost','tl','123123','colorray');
						if (!$con) {
							echo 'Could not connect: ' . mysqli_error($con);
						} else {
							mysqli_select_db($con,"colorray");
							$sql="SELECT username, rating FROM users ORDER BY rating DESC;";
							$result = mysqli_query($con,$sql);
							
							for($i=0; $i < 5; $i++) {
								$u = 'empty';
								$r = 0;
								$highlight = '';
								if ($row = mysqli_fetch_assoc($result)) {
									$u = $row['username'];
									$r = strval($row['rating']);
									session_start();
									if (isset($_SESSION['username']) && !empty($_SESSION['username']) && $_SESSION['username'] == $row['username']) {
										$highlight = ' style="color:#f00"';
									}
								}
								echo '<div id="name' . strval($i+1) . '" class="left"' . $highlight . '>';
								echo $u . '</div><div id="score' . strval($i+1) . '" class="right"';
								echo $highlight . '>' . $r . '</div>';
							}
						}
						mysqli_close($con);
					?>
				</div>
			</div>
			
			<div id="about" class="screen" data-action="showmenu">
				<div class="vertical">
					<h3>About</h3>
					<div class="text">
						<p>
							An awesome laser game
							<br>Created by PPk team
							<br>Enjoy!
							<br><br>© 2016
						</p>
					</div>
				</div>
			</div>

		</div>

		<div id="loader" class="screen"></div>

		<div id="grid" class="screen">
			<canvas id="HexCanvas" width="1000" height="700"></canvas>
		</div>
	</body>