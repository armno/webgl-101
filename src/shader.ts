import { ShaderUtil } from './shader-util';

export class Shader {
	private shaderUtil: ShaderUtil;
	constructor(private gl: WebGLRenderingContext) {
		this.shaderUtil = new ShaderUtil();
	}
	/**
	 * VertexShader - position, size
	 */
	createVertexShader() {
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

		return this.shaderUtil.loadShader(this.gl, this.gl.VERTEX_SHADER, vs);
	}

	/**
	 * FragmentShader - color
	 */
	createFragmentShader() {
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

		return this.shaderUtil.loadShader(this.gl, this.gl.FRAGMENT_SHADER, fs);
	}
}
