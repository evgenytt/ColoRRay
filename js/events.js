function addEventListeners() {
    $(document).on('mouseup', click);
//     $(document).on('contextmenu', function(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         e.stopImmediatePropagation();
//         return false;
//     })
}

function click(evt) {
    action = $(evt.target).closest('*[data-action]').attr('data-action');
    
    switch (action) {
        case 'showmenu':
            showMenu();
            break;
        case 'play':
            showPlay();
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
		case 'arcade':
	    	showGrid();
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


function showPlay() {
    $('.screen').hide().removeClass('show');
    $('#play').show();
}

function showLogIn() {
	$('.screen').hide().removeClass('show');
	$('#login').show();
}

function showLogOut() {
	$('.screen').hide().removeClass('show');
	$('#logout').show();
}

function showGrid() {

    $('.screen').hide().removeClass('show');
    $('#loader').show();
    
    setTimeout(function() {
        $('.screen').hide().removeClass('show');
        $('#grid').show();
    }, 500);

}



