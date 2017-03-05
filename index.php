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
		<script type="text/javascript" src="js/stopwatch.js"></script>
		<script type="text/javascript" src="js/resize.js"></script>
		<script type="text/javascript" src="js/init.js"></script>
		<script type="text/javascript" src="js/grid.js" charset="utf-8"></script>
	</head>
	<body>
		
		
		<div id="container">
			<div id="menu" class="menu screen">
				<?php include "php/greeting.php"; ?>
				<div class="vertical">
					<p data-action="play">Play</p>
					<?php include "php/login_logout_menu_item.php"; ?>
					<p data-action="rating">Rating</p>
					<p data-action="about">About</p>
				</div>
			</div>

			<div id="level" class="screen">
				<div class="vertical">
					<h3>Choose Level</h3>
					<div class="text">
						<p data-action="lvl_1"> > 1 < </p>
						<p data-action="lvl_2"> > 2 < </p>
						<p data-action="lvl_3"> > 3 < </p>
						<h3 data-action="showmenu">Back</h3>
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
					<?php include "php/list_rating.php"; ?>
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
         <div class="gridmenu">
            <div id="stopwatch">Time: </div>
            <div id="grid_button" data-action="play">Concede</div>
         </div>
         <canvas id="HexCanvas"></canvas>
      </div>
	</body>
</html>