export class ShaderUtil {
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
