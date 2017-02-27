var globalRows;
var globalCols;
var globalLines = [];
var Objects = [];
var Base = [];

var LAS = { col: 3, row: 5 };

Objects[LAS.col + "." + LAS.row] = {type: "laser", dir: 60, texture: laserImg, col: LAS.col, row: LAS.row, basetexture: laserImg};
Objects["6.4"] = {type: "mirror", dir: 180, texture: mirrorImg[""], col:6, row:4, basetexture: mirrorImg[""]};
Objects["8.5"] = {type: "spec", dir: 0, texture: specImg, col:8, row:5, basetexture: specImg};
Objects["11.6"] = {type: "wall", dir: 0, texture: wallImg, col:11, row:6, basetexture: wallImg};
Objects["6.0"] = {type: "target", color: "white", dir: 240, texture: targetImg[""], col:6, row:0, basetexture: targetImg[""]};
Objects["6.2"] = {type: "filter", color: "blue", dir: 0, texture: filterImg["blue"], col:6, row:2, basetexture: filterImg["blue"]};
Objects["4.5"] = {type: "filter", color: "green", dir: 0, texture: filterImg["green"], col:4, row:5, basetexture: filterImg["green"]};

Base["laser"] = 60;
Base["mirror"] = 180;
Base["target"] = 240;

function GetDirection(angle, row, col) {
    var dx, dy;
    switch (angle%360) {
        case 0:   return { dx:  0, dy: -1 };
        case 60:  return { dx:  1, dy: col&1 ? 0 : -1 };
        case 120: return { dx:  1, dy: col&1 ? 1 : 0 };
        case 180: return { dx:  0, dy: 1 };
        case 240: return { dx: -1, dy: col&1 ? 1 : 0 };
        case 300: return { dx: -1, dy: col&1 ? 0 : -1 };
    }
}

function HexagonGrid(canvasId, radius) {
    this.radius  = radius;
    this.height  = Math.sqrt(3) * radius;
    this.width   = 2 * radius;
    this.side    = (3 / 2) * radius;
    this.canvas  = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');

    this.canvasOriginX = 0;
    this.canvasOriginY = 0;
    
    this.canvas.addEventListener("mousedown", this.clickEvent.bind(this), false);
};



HexagonGrid.prototype.drawHexGrid = function (rows, cols, originX, originY, isDebug) {
    globalRows = rows; 
    globalCols = cols;
    this.canvasOriginX = originX;
    this.canvasOriginY = originY;
    
    var currentHexX;
    var currentHexY;

    var offsetColumn = false;

    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {

            if (!offsetColumn) {
                currentHexX = (col * this.side) + originX;
                currentHexY = (row * this.height) + originY;
            } else {
                currentHexX = col * this.side + originX;
                currentHexY = (row * this.height) + originY + (this.height * 0.5);
            }
                this.drawHex(currentHexX, currentHexY, 0, 0, 0);

        }
        offsetColumn = !offsetColumn;
    }
    this.clean();
    this.drawHexAtColRow(LAS.col, LAS.row, 1, laserImg, Objects[LAS.col + "." +LAS.row].dir, "white");   
    
};

HexagonGrid.prototype.drawHexAtColRow = function(column, row, rotateHex, texture, dir, color) {
    dir %= 360;
    var coord = column + "." + row;
    if (texture == lineImg[color] && (coord in Objects)) {   
        if (Objects[coord].type == "mirror") {
            var dif = Math.abs(Objects[coord].dir-dir);
            if (dif == 180 ) {
                Objects[coord].texture=mirrorImg[color+"Stop"];             
                this.RotateHex(column, row, coord, false);
                return;
            }
            if (dif%120!=0 || dif == 0) {
                Objects[coord].texture=mirrorImg[""];
                this.RotateHex(column, row, coord, false);
                return;
            }
            else {
                Objects[coord].texture=mirrorImg[color];
                this.RotateHex(column, row, coord, false);
                var f = dir + 240;
                if ((f%360) == Objects[coord].dir) 
                    dir = (f+60%360);
                else
                    dir = (f-180)%360;

                var DIR = GetDirection(dir, row, column);
                var target = { col: column+DIR.dx, 
                               row: row+DIR.dy};
                if (target.col < globalCols && target.row < globalRows  && target.col >= 0 && target.row >= 0) 
                    this.drawHexAtColRow(target.col, target.row, 0, lineImg[color], dir, color);
                return;
            }
        }

        if (Objects[coord].type == "wall")
            return;

        if (Objects[coord].type == "target") {
            if (color == Objects[coord].color || color == "white" || Objects[coord].color=="white") {
                Objects[coord].texture = targetImg["white"];
                while( (Objects[coord].dir + 180) % 360 != dir) 
                    this.RotateHex(column, row, coord, 1);
                this.RotateHex(column, row, coord, 0);
            }
            return;
        }

        if (Objects[coord].type == "filter") {
            if (color == Objects[coord].color || color == "white") {
                color = Objects[coord].color;
                texture = lineImg[color];
            }
            else return;
        }
    }
    var drawx = (column * this.side) + this.canvasOriginX;
    var drawy = column % 2 == 0 ? (row * this.height) + this.canvasOriginY : (row * this.height) + this.canvasOriginY + (this.height / 2);
    this.drawHex(drawx, drawy, rotateHex, texture, {col: column, row: row}, dir, color);
};


HexagonGrid.prototype.RotateHex = function(col, row, coord, rot) {

   if (rot == true) Objects[coord].dir = (Objects[coord].dir+60)%360;
    var x0 =  (col * this.side) + this.canvasOriginX;
    var y0 =  col % 2 == 0 ? (row * this.height) + this.canvasOriginY : (row * this.height) + this.canvasOriginY + (this.height / 2);
    this.context.save(); 

        this.context.translate(x0+this.width/2, y0+this.height/2);
        this.context.rotate((Objects[coord].dir-Base[Objects[coord].type])*Math.PI/180); 
        this.context.translate(-(x0+this.width/2), -(y0+this.height/2));
    
        this.context.drawImage(Objects[coord].texture, x0, y0, (this.width), (this.height));
    this.context.restore();
};

HexagonGrid.prototype.drawHex = function(x0, y0, rotateHex, texture, colrow,dir, color) {

    if (texture) {  

        angle = dir - 60;
        if (texture == lineImg[color]) globalLines.push({ x: x0, y: y0 });
        
        this.context.save(); 
        this.context.translate(x0+this.width/2, y0+this.height/2);
        this.context.rotate(angle*Math.PI/180); 
        this.context.translate(-(x0+this.width/2), -(y0+this.height/2));
        this.context.drawImage(texture, x0, y0, (this.width), (this.height));
        this.context.restore();
        
        var DIR = GetDirection(dir, colrow.row,colrow.col);
        var target = { col: colrow.col+DIR.dx, 
                       row: colrow.row+DIR.dy };
        
        if (target.col < globalCols && target.row < globalRows  && target.col >= 0 && target.row >= 0) 
            this.drawHexAtColRow(target.col, target.row, 0, lineImg[color], dir,color);
    }
    else {
        this.context.drawImage(hexImg, x0, y0, (this.width), (this.height));
    }

};

//Recusivly step up to the body to calculate canvas offset.
HexagonGrid.prototype.getRelativeCanvasOffset = function() {
    var x = 0, y = 0;
    var layoutElement = this.canvas;
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);
        
        return { x: x, y: y };
    }
}

//Uses a grid overlay algorithm to determine hexagon location
//Left edge of grid has a test to acuratly determin correct hex
HexagonGrid.prototype.getSelectedTile = function(mouseX, mouseY) {

    var offSet = this.getRelativeCanvasOffset();
    mouseX -= offSet.x;
    mouseY -= offSet.y;

    var column = Math.floor((mouseX) / this.side);
    var row = Math.floor(
        column % 2 == 0
            ? Math.floor((mouseY) / this.height)
            : Math.floor(((mouseY + (this.height * 0.5)) / this.height)) - 1);


    //Test if on left side of frame            
    if (mouseX > (column * this.side) && mouseX < (column * this.side) + this.width - this.side) {

        //Now test which of the two triangles we are in 
        //Top left triangle points
        var p1 = new Object();
        p1.x = column * this.side;
        p1.y = column % 2 == 0
            ? row * this.height
            : (row * this.height) + (this.height / 2);

        var p2 = new Object();
        p2.x = p1.x;
        p2.y = p1.y + (this.height / 2);

        var p3 = new Object();
        p3.x = p1.x + this.width - this.side;
        p3.y = p1.y;

        var mousePoint = new Object();
        mousePoint.x = mouseX;
        mousePoint.y = mouseY;

        if (this.isPointInTriangle(mousePoint, p1, p2, p3)) {
            column--;

            if (column % 2 != 0)
                row--;
        }

        //Bottom left triangle points
        var p4 = new Object();
        p4 = p2;

        var p5 = new Object();
        p5.x = p4.x;
        p5.y = p4.y + (this.height / 2);

        var p6 = new Object();
        p6.x = p5.x + (this.width - this.side);
        p6.y = p5.y;

        if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
            column--;

            if (column % 2 == 0) {
                row++;
            }
        }
    }

    return  { column: column, row: row };
};


HexagonGrid.prototype.sign = function(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};

HexagonGrid.prototype.clean = function() {

        var curline=globalLines.pop();
        while (curline != undefined) {
            this.drawHex(curline.x, curline.y,0,0,0);
            curline=globalLines.pop();
        }

            for (var key in Objects) {
                Objects[key].texture =  Objects[key].basetexture;
                this.RotateHex(Objects[key].col,  Objects[key].row, key, false);
            }
}

HexagonGrid.prototype.isPointInTriangle = function isPointInTriangle(pt, v1, v2, v3) {
    var b1, b2, b3;

    b1 = this.sign(pt, v1, v2) < 0.0;
    b2 = this.sign(pt, v2, v3) < 0.0;
    b3 = this.sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
};

HexagonGrid.prototype.clickEvent = function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;

    var tile = this.getSelectedTile(localX, localY);
    if (tile.column >= 0 && tile.row >= 0 && tile.column < globalCols && tile.row < globalRows) {
        var drawy = tile.column % 2 == 0 ? (tile.row * this.height) + this.canvasOriginY : (tile.row * this.height) + this.canvasOriginY + (this.height / 2);
        var drawx = (tile.column * this.side) + this.canvasOriginX;

        var coord = tile.column + "." + tile.row;
        if (coord in Objects) {
            if (Objects[coord].type == "spec") {
                Objects[coord].type = "mirror";
                Objects[coord].basetexture = mirrorImg[""];
                Objects[coord].dir = 180;
                this.clean();
            }
            else {
                this.clean();
                this.RotateHex(tile.column, tile.row, coord, true);
            }

            var DIR = GetDirection(Objects[LAS.col + "." +LAS.row].dir, LAS.row, LAS.col);
             var target = { col: LAS.col+DIR.dx, 
                       row: LAS.row+DIR.dy};
        
            if (target.col < globalCols && target.row < globalRows  && target.col >= 0 && target.row >= 0) 
                this.drawHexAtColRow(target.col, target.row, 0, lineImg["white"], Objects[LAS.col + "." +LAS.row].dir, "white");
        }

    } 
};
