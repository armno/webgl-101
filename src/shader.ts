export class Shader {
	constructor() {}

	initShaderProgram(gl: WebGLRenderingContext): WebGLProgram {
		const shaderProgram = gl.createProgram();
		const vs = this.createVertexShader(gl);
		const fs = this.createFragmentShader(gl);

		gl.attachShader(shaderProgram, vs);
		gl.attachShader(shaderProgram, fs);
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			console.error(
				'Unable to initialize the shader program',
				gl.getProgramInfoLog(shaderProgram)
			);
			return null;
		}

		return shaderProgram;
	}

	/**
	 * VertexShader - position, size
	 */
	createVertexShader(gl: WebGLRenderingContext): WebGLShader {
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

		return this.loadShader(gl, gl.VERTEX_SHADER, vs);
	}

	/**
	 * FragmentShader - color
	 */
	createFragmentShader(gl: WebGLRenderingContext): WebGLShader {
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

		return this.loadShader(gl, gl.FRAGMENT_SHADER, fs);
	}

	loadShader(
		gl: WebGLRenderingContext,
		type: GLenum,
		source: string
	): WebGLShader {
		const shader: WebGLShader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(`Error compiling shader: ${gl.getShaderInfoLog(shader)}`);
			gl.deleteShader(shader);
			return null;
		}

		return shader;
	}
}
