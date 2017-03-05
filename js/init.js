var hexagonGrid;
var stopwatch;

$(document).ready(function() {
    init();
});

$(window).on('resize', function() {
    resize();
});

function init() {
    resize();
    resize_canvas();
    
    addEventListeners();
    showMenu();

    saveRating();
    displayRatings();

};

function drawGrid(lvl) {
    var win_h = $(document).height();
    var rows = 9, cols = 13;
    if (!hexagonGrid)
        hexagonGrid = new HexagonGrid("HexCanvas", win_h/(rows*2));

    initLevelVariables();
    hexagonGrid.drawHexGrid(rows, cols, win_h*0.038, win_h*0.035, lvl, false);

    // start stopwatch
    if (!stopwatch) { 
        stopwatch = new Stopwatch(document.getElementById("stopwatch"), {delay: 10});
        stopwatch.start();
    } else {
        stopwatch.reset();
        stopwatch.start();
    }
};

function initLevelVariables() { // LEVELS FOR THE GAME !!!

    L = [ {},
        {   // LASER 1
            col: 6, row: 0 },
        {   // LASER 2
            col: 0, row: 1 },
        {   // LASER 3
            col: 0, row: 8
        }
    ]; 

    O = [ {} , 
        {   // LEVEL 1
            '1.2': { type: "spec", col: 1, row: 2, dir: 0, texture: specImg, basetexture: specImg }, 
            '1.6': { type: "spec", col: 1, row: 6, dir: 0, texture: specImg, basetexture: specImg }, 
            '2.2': { type: "filter", color: "red", col: 2, row: 2, dir: 0, texture: filterImg["red"], basetexture: filterImg["red"]}, 
            '2.5': { type: "spec", col: 2, row: 5, dir: 0, texture: specImg, basetexture: specImg }, 
            '3.1': { type: "spec", col: 3, row: 1, dir: 0, texture: specImg, basetexture: specImg }, 
            '3.6': { type: "filter", color: "green", col: 3, row: 6, dir: 0, texture: filterImg["green"], basetexture: filterImg["green"] }, 
            '3.7': { type: "spec", col: 3, row: 7, dir: 0, texture: specImg, basetexture: specImg }, 
            '3.8': { type: "spec", col: 3, row: 8, dir: 0, texture: specImg, basetexture: specImg }, 
            '4.8': { type: "target", color: "red", col: 4, row: 8, dir: 240, texture: targetImg["redbase"], basetexture: targetImg["redbase"] }, 
            '6.0': { type: "laser", col: 6, row: 0, dir: 60, texture: laserImg, basetexture: laserImg }, 
            '6.5': { type: "wall", col: 6, row: 5, dir: 0, texture: wallImg, basetexture: wallImg }, 
            '6.7': { type: "spec", col: 6, row: 7, dir: 0, texture: specImg, basetexture: specImg }, 
            '10.2': { type: "spec", col: 10, row: 2, dir: 0, texture: specImg, basetexture: specImg }, 
            '10.4': { type: "filter", color: "blue", col: 10, row: 4, dir: 0, texture: filterImg["blue"], basetexture: filterImg["blue"] }, 
            '10.5': { type: "spec", col: 10, row: 5, dir: 0, texture: specImg, basetexture: specImg },
        },
        {   // LEVEL 2
            '0.1': { type: "laser", col: 0, row: 1, dir: 60, texture: laserImg, basetexture: laserImg }, 
            '0.5': { type: "wall", col: 0, row: 5, dir: 0, texture: wallImg, basetexture: wallImg }, 
            '3.2': { type: "spec", col: 3, row: 2, dir: 0, texture: specImg, basetexture: specImg }, 
            '3.7': { type: "filter", color: "blue", col: 3, row: 7, dir: 0, texture: filterImg["blue"], basetexture: filterImg["blue"] }, 
            '6.1': { type: "spec", col: 6, row: 1, dir: 0, texture: specImg, basetexture: specImg }, 
            '6.4': { type: "wall", col: 6, row: 4, dir: 0, texture: wallImg, basetexture: wallImg }, 
            '6.6': { type: "spec", col: 6, row: 6, dir: 0, texture: specImg, basetexture: specImg }, 
            '6.7': { type: "spec", col: 6, row: 7, dir: 0, texture: specImg, basetexture: specImg }, 
            '7.1': { type: "spec", col: 7, row: 1, dir: 0, texture: specImg, basetexture: specImg }, 
            '7.4': { type: "filter", color: "red", col: 7, row: 4, dir: 0, texture: filterImg["red"], basetexture: filterImg["red"]}, 
            '7.5': { type: "spec", col: 7, row: 5, dir: 0, texture: specImg, basetexture: specImg }, 
            '7.6': { type: "wall", col: 7, row: 6, dir: 0, texture: wallImg, basetexture: wallImg }, 
            '7.7': { type: "spec", col: 7, row: 7, dir: 0, texture: specImg, basetexture: specImg }, 
            '7.8': { type: "target", color: "red", col: 7, row: 8, dir: 240, texture: targetImg["redbase"], basetexture: targetImg["redbase"] }, 
            '8.6': { type: "spec", col: 8, row: 6, dir: 0, texture: specImg, basetexture: specImg }, 
            '8.7': { type: "spec", col: 8, row: 7, dir: 0, texture: specImg, basetexture: specImg }, 
            '10.2': { type: "wall", col: 10, row: 2, dir: 0, texture: wallImg, basetexture: wallImg }, 
            '10.5': { type: "filter", color: "green", col: 10, row: 5, dir: 0, texture: filterImg["green"], basetexture: filterImg["green"] }, 
            '12.3': { type: "spec", col: 12, row: 3, dir: 0, texture: specImg, basetexture: specImg },
        }, 
        {  // LEVEL 3
            '0.4': { type: "spec", col: 0, row: 4, dir: 0, texture: specImg, basetexture: specImg }, 
            '0.8': { type: "laser", col: 0, row: 8, dir: 60, texture: laserImg, basetexture: laserImg }, 
            '2.3': { type: "target", color: "blue", col: 2, row: 3, dir: 240, texture: targetImg["bluebase"], basetexture: targetImg["bluebase"] }, 
            '3.2': { type: "spec", col: 3, row: 2, dir: 0, texture: specImg, basetexture: specImg }, 
            '3.4': { type: "spec", col: 3, row: 4, dir: 0, texture: specImg, basetexture: specImg }, 
            '4.2': { type: "spec", col: 4, row: 2, dir: 0, texture: specImg, basetexture: specImg }, 
            '4.5': { type: "spec", col: 4, row: 5, dir: 0, texture: specImg, basetexture: specImg }, 
            '6.1': { type: "spec", col: 6, row: 1, dir: 0, texture: specImg, basetexture: specImg }, 
            '6.2': { type: "wall", col: 6, row: 2, dir: 0, texture: wallImg, basetexture: wallImg }, 
            '6.3': { type: "target", color: "red", col: 6, row: 3, dir: 240, texture: targetImg["redbase"], basetexture: targetImg["redbase"] }, 
            '6.5': { type: "spec", col: 6, row: 5, dir: 0, texture: specImg, basetexture: specImg }, 
            '7.2': { type: "wall", col: 7, row: 2, dir: 0, texture: wallImg, basetexture: wallImg }, 
            '8.0': { type: "spec", col: 8, row: 0, dir: 0, texture: specImg, basetexture: specImg }, 
            '8.6': { type: "filter", color: "red", col: 8, row: 6, dir: 0, texture: filterImg["red"], basetexture: filterImg["red"]}, 
            '9.0': { type: "spec", col: 9, row: 0, dir: 0, texture: specImg, basetexture: specImg }, 
            '9.1': { type: "spec", col: 9, row: 1, dir: 0, texture: specImg, basetexture: specImg }, 
            '10.2': { type: "spec", col: 10, row: 2, dir: 0, texture: specImg, basetexture: specImg }, 
            '10.7': { type: "spec", col: 10, row: 7, dir: 0, texture: specImg, basetexture: specImg }, 
            '11.7': { type: "target", color: "green", col: 11, row: 7, dir: 240, texture: targetImg["greenbase"], basetexture: targetImg["greenbase"] }, 
            '12.3': { type: "spec", col: 12, row: 3, dir: 0, texture: specImg, basetexture: specImg }, 
            '12.6': { type: "spec", col: 12, row: 6, dir: 0, texture: specImg, basetexture: specImg },
        }
    ];

    Base = { laser: 60, mirror: 180, target: 240 };
};


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
lineImg["littlewhite"] = new Image();
lineImg["littlewhite"].src = "./img/littlewhite.png";
lineImg["littlered"] = new Image();
lineImg["littlered"].src = "./img/littlered.png";
lineImg["littleblue"] = new Image();
lineImg["littleblue"].src = "./img/littleblue.png";
lineImg["littlegreen"] = new Image();
lineImg["littlegreen"].src = "./img/littlegreen.png";

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
targetImg['whitebase'] = new Image();
targetImg['whitebase'].src = "./img/target.png";
targetImg['redbase'] = new Image();
targetImg['redbase'].src = "./img/redtarget.png";
targetImg['bluebase'] = new Image();
targetImg['bluebase'].src = "./img/bluetarget.png";
targetImg['greenbase'] = new Image();
targetImg['greenbase'].src = "./img/greentarget.png";

targetImg['white'] = new Image();
targetImg['white'].src = "./img/whitetarget.png";
targetImg['red'] = new Image();
targetImg['red'].src = "./img/redtargetred.png";
targetImg['blue'] = new Image();
targetImg['blue'].src = "./img/bluetargetblue.png";
targetImg['green'] = new Image();
targetImg['green'].src = "./img/greentargetgreen.png";

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