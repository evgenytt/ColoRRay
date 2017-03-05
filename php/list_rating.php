<?php
	$con = mysqli_connect('localhost','tl','123123','colorray');
	if (!$con) {
		echo '<p>Could not connect: ' . mysqli_error($con) . '</p>';
	} else {
		mysqli_select_db($con,"colorray");
		$sql="SELECT username, rating FROM users ORDER BY rating DESC;";
		$result1 = mysqli_query($con,$sql);
		
		session_start();
		if (isset($_SESSION['username']) && !empty($_SESSION['username'])) {
			$su = strval($_SESSION['username']);
			$flag = false; //boolean: is user listed in this table?
		} else {
			$su = "";
			$flag = true; //we don't show him anyway
		}
		
		
		for($i=0; $i < 5; $i++) {
			$u = 'empty';
			$r = 0;
			$highlight = '';
			if ($row = mysqli_fetch_assoc($result1)) {
				$u = $row['username'];
				$r = strval($row['rating']);
				
				mysqli_select_db($con,"colorray");
				$sql="SELECT count(*)+1 place FROM users my left join users others on others.rating > my.rating WHERE my.username='$u';";
				$result = mysqli_query($con,$sql);
				$res = mysqli_fetch_assoc($result);
				$place = $res['place'];
				
				if(intval($place) > $i + 1) {
					$place = strval($i + 1);
				}
		
				if ($su == $u) {
					$highlight = ' style="color:#f00;"';
					$flag = true;
				}
			}
			echo '<div id="name' . strval($i+1) . '" class="left"' . $highlight . '>';
			echo '<p>' . $place . '. ' . $u . '</p></div><div id="score' . strval($i+1);
			echo '" class="right"' . $highlight . '><p>' . $r . '</p></div>';
		}
		if (!$flag) {
			mysqli_select_db($con,"colorray");
			$sql="SELECT count(*)+1 place, my.rating FROM users my left join users others on others.rating > my.rating WHERE my.username='$su';";
			$result = mysqli_query($con,$sql);
			$row = mysqli_fetch_assoc($result); 
			$place = strval($row['place']);
			$r = strval($row['rating']);
			
			echo '<div id="name' . 6 . '" class="left" style="color:#f00;">';
			echo '<p>' . $place . '. ' . $su . '</p></div><div id="score' . 6;
			echo '" class="right" style="color:#f00;"><p>' . $r . '</p></div>';
		}
		
	}
	mysqli_close($con);
?>