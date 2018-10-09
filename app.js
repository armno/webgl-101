var gl;

init();
draw();

function init() {
	const canvas = document.getElementById('canvas');
	gl = canvas.getContext('webgl');
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(1, 0, 0, 1);
}

function draw() {
	gl.clear(gl.COLOR_BUFFER_BIT);
}
