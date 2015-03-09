PGraphics g;

void setup(){
size(400, 400);

g = createGraphics(width, height);
g.beginDraw();
g.ellipse(200, 200, 30, 30);
g.endDraw();
g.save("render.png");

//image(g.getImage(), 0,0);
}

