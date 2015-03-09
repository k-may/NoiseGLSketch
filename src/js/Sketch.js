tdl.require('tdl.buffers');
tdl.require('tdl.fast');
tdl.require('tdl.fps');
tdl.require('tdl.log');
tdl.require('tdl.math');
tdl.require('tdl.models');
tdl.require('tdl.primitives');
tdl.require('tdl.framebuffers');
tdl.require('tdl.programs');
tdl.require('tdl.textures');
tdl.require('tdl.webgl');

function Sketch() {
    var canvas = document.createElement("canvas");
    var gl;
    var image;
    var loaded = false;

    var noiseFBO, noisePlane;
    var plane;
    var time = 1.0;


    function init() {

        image = new Image();
        image.onload = function () {
            render();
        }
        image.src = "img/render.png";

    }

    function render() {

        //todo use ts for type casting and code completion
        gl = tdl.webgl.setupWebGL(canvas, {premultipliedAlpha: false, antialias: false});

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.clearColor(1,1, 0, 0);
        gl.colorMask(true, true, true, true);

        noiseFBO = tdl.framebuffers.createFramebuffer(canvas.width, canvas.height, false);

        noisePlane = createNoisePlane("vertexShader", "fragmentShader")

        plane = createPlane(image, "vertexShader", "fragmentShaderNoise");
        plane.drawPrep();
        plane.draw();
        loaded = true;
    }

    canvas.draw = function () {
        if (!loaded)
            return;

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clearColor(0, 0, 0, 0);
        gl.colorMask(true, true, true, true);

       // noiseFBO.bind();

        time += 0.001   ;
        //noisePlane.drawPrep({time : time});
       // noisePlane.draw();

       // noiseFBO.unbind();<apach></apach>

        plane.drawPrep({time : time});
        plane.draw();

    }

    function createPlane(image, vertexTagId, fragmentTagId) {
        var textures = {
            texture:  new tdl.textures.loadTexture(image)
        };
        var program = tdl.programs.loadProgram(
            document.getElementById(vertexTagId).text,
            document.getElementById(fragmentTagId).text);

        //todo change array pattern
        var arrays = tdl.primitives.createPlane(2, 2, 1, 1);
        tdl.primitives.reorient(arrays,
            [1, 0, 0, 0,
                0, 0, 1, 0,
                0, 1, 0, 0,
                0, 0, 0, 1]);
        delete arrays.normal;

        //todo is textures an object?
        return new tdl.models.Model(program, arrays, textures);

    }

    function createNoisePlane(vertexTagId, fragmentTagId){
        var program = tdl.programs.loadProgram(
            document.getElementById(vertexTagId).text,
            document.getElementById(fragmentTagId).text);

        var arrays = tdl.primitives.createPlane(2, 2, 1, 1);
        tdl.primitives.reorient(arrays,
            [1, 0, 0, 0,
                0, 0, 1, 0,
                0, 1, 0, 0,
                0, 0, 0, 1]);
        delete arrays.normal;

        return new tdl.models.Model(program, arrays);
    }

    init();

    return canvas;

}
