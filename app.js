class App {
	constructor() {
		this.init();
		this.createShaders();
		this.createVertices();
		this.draw();
	}

	init() {
		const canvas = document.getElementById('canvas');
		this.gl = canvas.getContext('webgl');
		this.gl.viewport(0, 0, canvas.width, canvas.height);
		this.gl.clearColor(0, 0, 0, 1);
	}

	draw() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
	}

	createShaders() {
		const vertexShader = this._createVertexShader();
		const fragmentShader = this._createFragmentShader();

		// to put webgl shaders into the page, we need to create a 'program',
		// and attach vertex & fragment shaders into the program
		this.shaderProgram = this.gl.createProgram();
		this.gl.attachShader(this.shaderProgram, vertexShader);
		this.gl.attachShader(this.shaderProgram, fragmentShader);

		this.gl.linkProgram(this.shaderProgram);
		this.gl.useProgram(this.shaderProgram);
	}

	// pass in attributes from the main program (js) to shaders
	// so we can set dynamic values to the shaders here
	createVertices() {
		const vertices = [0.1, -0.5, 0.0, -0.9, 0.9, 0.0, 0.5, 0.9, 0.0];
		const buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array(vertices),
			this.gl.STATIC_DRAW
		);

		const coords = this.gl.getAttribLocation(this.shaderProgram, 'coords');
		// this.gl.vertexAttrib3f(coords, 0, 0.5, 0);
		this.gl.vertexAttribPointer(coords, 3, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(coords);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		const point = this.gl.getAttribLocation(this.shaderProgram, 'pointSize');
		this.gl.vertexAttrib1f(point, 100);

		const color = this.gl.getUniformLocation(this.shaderProgram, 'color');
		this.gl.uniform4f(color, 1, 1, 0, 0.7);
	}

	/**
	 * VertexShader - position, size
	 */
	_createVertexShader() {
		// shader for the point
		// set its position and size
		// vec4(x, y, z, w)
		//
		// create 2 attributes that can be referenced from the main program
		const vs = `
		attribute vec4 coords;
		attribute float pointSize;
		void main(void) {
			gl_Position = coords;
			gl_PointSize = pointSize;
		}
		`;

		const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
		this.gl.shaderSource(vertexShader, vs);
		this.gl.compileShader(vertexShader);

		return vertexShader;
	}

	/**
	 * FragmentShader - color
	 */
	_createFragmentShader() {
		// set the point's color in a fragmentShader
		// vec4(red, green, blue, alpha)
		// for color, we need a `uniform` instead of an attribute
		const fs = `
		precision mediump float;
		uniform vec4 color;
		void main(void) {
			gl_FragColor = color;
		}
		`;
		var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource(fragmentShader, fs);
		this.gl.compileShader(fragmentShader);

		return fragmentShader;
	}
}

new App();
