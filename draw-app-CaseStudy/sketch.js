//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null;
var colourP = null;
var helpers = null;


markerTool = {
    name: "markerTool",
    icon: "assets/markertool.png",
    size: 5, // Adjust the size of the marker
    draw: function(){
        // If the mouse is pressed, draw on the canvas
        // Use the size property to set the marker size
        if(mouseIsPressed){
            stroke(0); // You can adjust the color of the marker here (0 is for black)
            strokeWeight(this.size); // Set the marker size
            line(pmouseX, pmouseY, mouseX, mouseY); // Draw a line from the previous mouse position to the current position
        }
    }
};

//spray can object literal
sprayCan = {
    name: "sprayCanTool",
    icon: "assets/sprayCan.jpg",
    points: 13,
    spread: 10,
    draw: function(){
        //if the mouse is pressed paint on the canvas
        //spread describes how far to spread the paint from the mouse pointer
        //points holds how many pixels of paint for each mouse press.
        if(mouseIsPressed){
            for(var i = 0; i < this.points; i++){
                point(random(mouseX-this.spread, mouseX + this.spread), 
                    random(mouseY-this.spread, mouseY+this.spread));
            }
        }
    }
};

// penTool
var penTool = {
    name: "penTool",
    icon: "assets/pentool.png",
    isDrawing: false, // Track if the mouse is currently being dragged
    prevX: 0, // Previous X coordinate of the mouse
    prevY: 0, // Previous Y coordinate of the mouse,
    strokeWeight: 2, // Adjust the stroke weight as needed

    draw: function() {
        // If the mouse is pressed, draw lines
        if (mouseIsPressed) {
            stroke(0); // Set the stroke color (black in this example)
            strokeWeight(this.strokeWeight); // Set the stroke weight
            if (!this.isDrawing) {
                // If not already drawing, start a new path
                beginShape();
                vertex(mouseX, mouseY);
                this.isDrawing = true;
            } else {
                // Continue the path
                line(this.prevX, this.prevY, mouseX, mouseY);
            }
            this.prevX = mouseX;
            this.prevY = mouseY;
        } else {
            // If the mouse is not pressed, stop drawing
            if (this.isDrawing) {
                endShape();
                this.isDrawing = false;
            }
        }
    }
};


//pen tool
backgroundTool = {
	name: "backgroundTool",
	icon: "assets/backgroundTool.png",
	points: "",
	spread: "",
	draw: function() {
		//change the background
		document.getElementById('changeBackground').addEventListener('click', function () {
			const newBackgroundColor = '#FF0000'; //replace  with your desired background color
			canvas.setBackgroundColor(newBackgroundColor, canvas .renderAll.bind(canvas));
		});
    }
}; 



function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(sprayCan);
	toolbox.addTool(markerTool);
	toolbox.addTool(backgroundTool);
	toolbox.addTool(penTool);
	toolbox.addTool(new mirrorDrawTool());
	background(255);

}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}