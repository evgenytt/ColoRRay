$(document).ready(function() {
    init();
});

function init() {
    resize();
    resize_canvas();
    
    addEventListeners();
    showMenu();

    saveRating();
    displayRatings();

    //draw grid
    setTimeout(function() {
        var win_h = $(document).height();
        var rows = 9, cols = 13;
        var hexagonGrid = new HexagonGrid("HexCanvas", win_h/(rows*2));

        hexagonGrid.drawHexGrid(rows, cols, win_h*0.038, win_h*0.038, false);
    }, 500);
}

$(window).on('resize', function() {
    resize();
});


// init Images
var hexImg = new Image();
hexImg.src = "./img/hex.png";

var laserImg = new Image();
laserImg.src = "./img/whitelaser.png";

var lineImg = new Array();
lineImg["white"] = new Image();
lineImg["white"].src = "./img/whitelight.png";
lineImg["red"] = new Image();
lineImg["red"].src = "./img/red.png";
lineImg["blue"] = new Image();
lineImg["blue"].src = "./img/blue.png";
lineImg["green"] = new Image();
lineImg["green"].src = "./img/green.png";

var filterImg = new Array();
filterImg["red"] = new Image();
filterImg["red"].src = "./img/redfilter.png"
filterImg["blue"] = new Image();
filterImg["blue"].src = "./img/bluefilter.png"
filterImg["green"] = new Image();
filterImg["green"].src = "./img/greenfilter.png"

var specImg = new Image();
specImg.src = "./img/spec.png";

var wallImg = new Image();
wallImg.src = "./img/wall.png";

var targetImg = new Array();
targetImg[""] = new Image();
targetImg[""].src = "./img/target.png";

targetImg["white"] = new Image();
targetImg["white"].src = "./img/whitetarget.png";

var mirrorImg = new Array();
mirrorImg[""] = new Image();
mirrorImg[""].src = "./img/mirror.png";

mirrorImg["white"] = new Image();
mirrorImg["white"].src = "./img/whitemirrorreflect.png";

mirrorImg["whiteStop"] = new Image();
mirrorImg["whiteStop"].src = "./img/whitemirrorreflect2.png";

mirrorImg["red"] = new Image();
mirrorImg["red"].src = "./img/redmirrorreflect.png";

mirrorImg["redStop"] = new Image();
mirrorImg["redStop"].src = "./img/redmirrorreflect2.png";

mirrorImg["blue"] = new Image();
mirrorImg["blue"].src = "./img/bluemirrorreflect.png";

mirrorImg["blueStop"] = new Image();
mirrorImg["blueStop"].src = "./img/bluemirrorreflect2.png";

mirrorImg["green"] = new Image();
mirrorImg["green"].src = "./img/greenmirrorreflect.png";

mirrorImg["greenStop"] = new Image();
mirrorImg["greenStop"].src = "./img/greenmirrorreflect2.png";