define([
	"funcs",
	"eva",
	"jquery",
	"classes/Game/Car",
	"classes/Game/Sprite",
	"classes/Game/Camera",
	"classes/Game/BackgroundSprite",
	"classes/Game/Road",
	"classes/Game/MiniMap"
], function(f, Events, $, Car, Sprite, Camera, BackgroundSprite, Road, MiniMap) {
	
	var MainApp = f.CreateClass("MainApp", {}, Events);
	
	MainApp.prototype.init = function(params) {
		params = params || {};
		for (var key in params) {
			this[key] = params[key];
		}
		
		// some inits...
		this.initCanvas();
		this.initCamera();
		this.initRoad();
		this.initBackground();
		this.initCar();
		//this.initMiniMap();
		this.initKeyCodes();
		this.initInterval();
	};
	
	MainApp.prototype.initCanvas = function() {
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
	};
	
	MainApp.prototype.initBackground = function() {
		this.background = new BackgroundSprite({
			src: "/img/bg/1.jpg",
			ctx: this.ctx,
			canvas: this.canvas,
			camera: this.camera
		})
	};
	
	MainApp.prototype.initMiniMap = function() {
		this.miniMap = new MiniMap({
			x: 20,
			y: 20,
			width: 200,
			height: 100,
			road: this.road,
			camera: this.camera,
			background: this.background,
			parent: this.canvas.parentNode,
			scale: 1/10,
			cars: [this.car]
		})
	};
	
	MainApp.prototype.initRoad = function() {
		var w = this.canvas.width;
		var h = this.canvas.height;
		var l = 3000;
		
		this.road = new Road({
			ctx: this.ctx,
			camera: this.camera,
			x: 0,
			y: 0,
			points: [
				{x: w/2, y: -l}, 
				{x: w/2, y: l}, 
				{x: l, y: l}, 
				{x: l, y: -l}
			]
		})
	};
	
	MainApp.prototype.initCamera = function() {
		this.camera = new Camera({
			coeff: .4,
			fixMode: true,
			canvas: this.canvas
		})
	};
	
	MainApp.prototype.initCar = function() {
		this.carSprite = new Sprite({
			src: "/img/car/1.png",
			width: 66,
			height: 34,
			frameX: 5,
			frameY: 173,
			ctx: this.ctx,
			canvas: this.canvas,
			camera: this.camera
		});
		
		this.car = new Car({
			sprite: this.carSprite,
			vector: {x: 0, y:1},
			speed: 0,
			x: this.canvas.width/2 + 40,
			y: this.canvas.height/2,
			maxSpeed: 20,
			minSpeed: -10,
			width: 66,
			height: 34,
			angle: -90
		});
		
		this.camera.setObject(this.car);
	};
	
	MainApp.prototype.initKeyCodes = function() {
		this.keyCodes = {};
		$(document).on("keydown", function(e) {
			if ( e.keyCode > 36 && e.keyCode < 41 ) {
				e.preventDefault();
			}
			
			this.keyCodes[e.keyCode] = true;
		}.bind(this));
		
		$(document).on("keyup", function(e) {
			if ( e.keyCode > 36 && e.keyCode < 41 ) {
				e.preventDefault();
			}
			
			delete this.keyCodes[e.keyCode];
		}.bind(this));
	};
	
	MainApp.prototype.initInterval = function() {
		this.interval = setInterval(this.gameFrame.bind(this), 30);
	};
	
	MainApp.prototype.gameFrame = function() {
		this.canvas.width += 0;
		
		if ( this.keyCodes[39] ) {
			this.car.rotateOn(2);
		}
		if ( this.keyCodes[37] ) {
			this.car.rotateOn(-2);
		}
		
		if ( this.keyCodes[38] ) {
			this.car.upSpeed(.5);
		} else 
		if ( this.keyCodes[40] ) {
			this.car.upSpeed(-0.5);
		} else {
			this.car.dragSpeed(.2);
		}
		
		
		
		this.car.move();
		this.camera.update();
		this.background.draw();
		this.road.draw();
		this.car.draw();
		//this.miniMap.draw();
		
		//clearInterval(this.interval)
	};
	
	return MainApp;
})