var canvas    = null;
var context   = null;
var imageData = null;

var currentPatchSize = {
    width: 0,
    height: 0
};

function run () {
    console.log("started.");

    canvas = document.getElementById("noise");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    context   = canvas.getContext("2d");
    imageData = context.createImageData(canvas.width, canvas.height);
}

function generateNoisePatch (sX, sY, width, height) {
    for (var x = 0; x < width; ++x) {
        for (var y = 0; y < height; ++y) {
            var color = SimplexNoise(x + sX, y + sY) * 128 + 128 >> 0;
            var i     = 4 * (x + y * imageData.width);

            imageData.data[i]     = color;
            imageData.data[i + 1] = color;
            imageData.data[i + 2] = color;
            imageData.data[i + 3] = 0xff;
        }
    }

    context.putImageData(imageData, sX, sY);
}

function getNoiseData (width, height) {
    if (currentPatchSize.width == 0 || currentPathSize.height == 0) {
        generateNoisePatch(0, 0, width, height);
    }
    else {
        generateNoisePatch(currentPatchSize.width, 0, width - currentPatchSize.width, height);

        currentPatchSize.width   = width;
        currentPaatchSize.height = height;
    }

    return 'url("' + canvas.toDataURL() + '")';
}

window.addEventListener("load", run, false);
