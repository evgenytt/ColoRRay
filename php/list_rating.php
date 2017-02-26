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
