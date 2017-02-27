
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

}

function drawGrid(lvl) {
    var win_h = $(document).height();
    var rows = 9, cols = 13;
    var hexagonGrid = new HexagonGrid("HexCanvas", win_h/(rows*2));

    initLevelVariables();
    hexagonGrid.drawHexGrid(rows, cols, win_h*0.038, win_h*0.035, lvl, false);
}

function initLevelVariables() { // LEVELS FOR THE GAME !!!

    L = [ {},
        {   // LASER 1
            col: 3, row: 5 },
        {   // LASER 2
            col: 1, row: 1 },
        {   // LASER 3
        
        }
    ]; 

    O = [ {} , 
        {   // LEVEL 1
            3.5:  { type: "laser",                  col: 3,  row: 5, dir: 60,  texture: laserImg,           basetexture: laserImg           },
            6.4:  { type: "mirror",                 col: 6,  row: 4, dir: 180, texture: mirrorImg[""],      basetexture: mirrorImg[""]      },
            8.5:  { type: "spec",                   col: 8,  row: 5, dir: 0,   texture: specImg,            basetexture: specImg            },
            11.6: { type: "wall",                   col: 11, row: 6, dir: 0,   texture: wallImg,            basetexture: wallImg            },
            6.0:  { type: "target", color: "white", col: 6,  row: 0, dir: 240, texture: targetImg[""],      basetexture: targetImg[""]      },
            6.2:  { type: "filter", color: "blue",  col: 6,  row: 2, dir: 0,   texture: filterImg["blue"],  basetexture: filterImg["blue"]  },
            4.5:  { type: "filter", color: "green", col: 4,  row: 5, dir: 0,   texture: filterImg["green"], basetexture: filterImg["green"] },
        },
        {   // LEVEL 2
            1.1:  { type: "laser",                  col: 1,  row: 1, dir: 60,  texture: laserImg,           basetexture: laserImg           },
            6.4:  { type: "mirror",                 col: 6,  row: 4, dir: 180, texture: mirrorImg[""],      basetexture: mirrorImg[""]      },
            8.3:  { type: "spec",                   col: 8,  row: 3, dir: 0,   texture: specImg,            basetexture: specImg            },
            8.2:  { type: "spec",                   col: 8,  row: 2, dir: 0,   texture: specImg,            basetexture: specImg            },
            11.6: { type: "wall",                   col: 11, row: 6, dir: 0,   texture: wallImg,            basetexture: wallImg            },
            6.0:  { type: "target", color: "white", col: 6,  row: 0, dir: 240, texture: targetImg[""],      basetexture: targetImg[""]      },
            6.2:  { type: "filter", color: "blue",  col: 6,  row: 2, dir: 0,   texture: filterImg["blue"],  basetexture: filterImg["blue"]  },
            4.5:  { type: "filter", color: "green", col: 4,  row: 5, dir: 0,   texture: filterImg["green"], basetexture: filterImg["green"] },
        }, 
        {  // LEVEL 3

        }
    ];

    Base = { laser: 60, mirror: 180, target: 240 };
}


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