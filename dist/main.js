/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var shader_1 = __webpack_require__(/*! ./shader */ "./src/shader.ts");
var App = /** @class */ (function () {
    function App() {
        var canvas = document.getElementById('canvas');
        this.gl = canvas.getContext('webgl');
        this.shader = new shader_1.Shader();
        this.gl.viewport(0, 0, canvas.width, canvas.height);
        this.gl.clearColor(0, 0, 0, 1);
    }
    App.prototype.init = function () {
        this.createShaders();
        this.createVertices();
        this.draw();
    };
    App.prototype.draw = function () {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    };
    App.prototype.createShaders = function () {
        // to put webgl shaders into the page, we need to create a 'program',
        // and attach vertex & fragment shaders into the program
        this.shaderProgram = this.shader.initShaderProgram(this.gl);
        this.gl.useProgram(this.shaderProgram);
    };
    // pass in attributes from the main program (js) to shaders
    // so we can set dynamic values to the shaders here
    App.prototype.createVertices = function () {
        var vertices = [0.1, -0.5, 0.0, -0.9, 0.9, 0.0, 0.5, 0.9, 0.0];
        var buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        var coords = this.gl.getAttribLocation(this.shaderProgram, 'coords');
        this.gl.vertexAttribPointer(coords, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(coords);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        var point = this.gl.getAttribLocation(this.shaderProgram, 'pointSize');
        this.gl.vertexAttrib1f(point, 100);
        var color = this.gl.getUniformLocation(this.shaderProgram, 'color');
        this.gl.uniform4f(color, 1, 1, 0, 0.7);
    };
    return App;
}());
exports.App = App;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
var app = new app_1.App();
app.init();


/***/ }),

/***/ "./src/shader.ts":
/*!***********************!*\
  !*** ./src/shader.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Shader = /** @class */ (function () {
    function Shader() {
    }
    Shader.prototype.initShaderProgram = function (gl) {
        var shaderProgram = gl.createProgram();
        var vs = this.createVertexShader(gl);
        var fs = this.createFragmentShader(gl);
        gl.attachShader(shaderProgram, vs);
        gl.attachShader(shaderProgram, fs);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program', gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        return shaderProgram;
    };
    /**
     * VertexShader - position, size
     */
    Shader.prototype.createVertexShader = function (gl) {
        // shader for the point
        // set its position and size
        // vec4(x, y, z, w)
        //
        // create 2 attributes that can be referenced from the main program
        var vs = "\n\t\tattribute vec4 coords;\n\t\tattribute float pointSize;\n\t\tvoid main(void) {\n\t\t\tgl_Position = coords;\n\t\t\tgl_PointSize = pointSize;\n\t\t}\n\t\t";
        return this.loadShader(gl, gl.VERTEX_SHADER, vs);
    };
    /**
     * FragmentShader - color
     */
    Shader.prototype.createFragmentShader = function (gl) {
        // set the point's color in a fragmentShader
        // vec4(red, green, blue, alpha)
        // for color, we need a `uniform` instead of an attribute
        var fs = "\n\t\tprecision mediump float;\n\t\tuniform vec4 color;\n\t\tvoid main(void) {\n\t\t\tgl_FragColor = color;\n\t\t}\n\t\t";
        return this.loadShader(gl, gl.FRAGMENT_SHADER, fs);
    };
    Shader.prototype.loadShader = function (gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Error compiling shader: " + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    return Shader;
}());
exports.Shader = Shader;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map