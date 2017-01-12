//
//var myImage; //Declare a variable of the PImage data type.
//
//function preload(){
//  //myImage = loadImage("mesh.png"); //the source image must be in the data folder of the sketch
//  println("Preload from js file");
//}
function setup(){
  
  createCanvas(400,400);
  background(0);
  println("Setup from js file");
  //println("Original size of the image is "+myImage.width+" x "+myImage.height);
  //***The following no longer works in Processing***
  //size(myImage.width, myImage.height); //we can set the size of the display window by using 
  //the width and height fields associated with the PImage data type
  //createCanvas(myImage.width,myImage.height);
  //background(0);
    
}

//function draw(){
//    image(myImage, 0, 0, width, height); //add 2 more args to fit the image to the size provided
//    
//}
