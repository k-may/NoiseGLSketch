var sketch;


function init() {

    sketch = new Sketch();

    document.body.appendChild(sketch);

    sketch.width = window.innerWidth;
    sketch.height = window.innerHeight;

    loop();
}


function loop() {
    window.requestAnimationFrame(loop)

    sketch.draw();
}

init();
