function addEventListeners() {
    $(document).on('mouseup', click);
    $(document).on('contextmenu', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
    })
}

function click(evt) {
    action = $(evt.target).closest('*[data-action]').attr('data-action');
    
    switch (action) {
        case 'showmenu':
            showMenu();
            break;
        case 'play':
            chooseLevel();
            break;
        case 'lvl_1': 
            showGrid(1);
            break; 
        case 'lvl_2':
            showGrid(2);
            break;
        case 'lvl_3':
            showGrid(3);
			break;
		case 'login':
			showLogIn();
			break;
		case 'logout':
			showLogOut();
			break;
        case 'rating':
            showRating();
            break;
        case 'about':
            showAbout();
	    	break;
    }    
}

function showMenu() {
    $('.screen').hide().removeClass('show');
    $('#menu').show();
}

function showAbout() {
    $('.screen').hide().removeClass('show');
    $('#about').show();
}

function showRating() {
    $('.screen').hide().removeClass('show');
    $('#rating').show();
}

function chooseLevel() {
    $('.screen').hide().removeClass('show');
    $('#level').show();
}

function showLogIn() {
	window.location.href = 'signup.php';
}

function showLogOut() {
	$('.screen').hide().removeClass('show');
	$('#logout').show();
}

function showGrid(lvl) {
    $('.screen').hide().removeClass('show');
    $('#loader').show();
    
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            drawGrid(lvl);          
            $('.screen').hide().removeClass('show');
            $('#grid').show();
        }
    }, 10);
}



