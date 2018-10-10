import { ShaderUtil } from './shader-util';
import { Shader } from './shader';

export class App {
	private gl: WebGLRenderingContext;
	private shaderProgram: WebGLProgram;
	private shader: Shader;

	constructor() {
		const canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.gl = canvas.getContext('webgl');
		this.shader = new Shader(this.gl);

		this.gl.viewport(0, 0, canvas.width, canvas.height);
		this.gl.clearColor(0, 0, 0, 1);
	}

	init() {
		this.createShaders();
		this.createVertices();
		this.draw();
	}

	draw() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
	}

	createShaders() {
		const vertexShader = this.shader.createVertexShader();
		const fragmentShader = this.shader.createFragmentShader();

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
		this.gl.vertexAttribPointer(coords, 3, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(coords);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		const point = this.gl.getAttribLocation(this.shaderProgram, 'pointSize');
		this.gl.vertexAttrib1f(point, 100);

		const color = this.gl.getUniformLocation(this.shaderProgram, 'color');
		this.gl.uniform4f(color, 1, 1, 0, 0.7);
	}
}
