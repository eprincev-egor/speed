define([
	"funcs",
	"eva"
], function(f, Events) {
	"use strict";
	
	var Sprite = f.CreateClass("Sprite", {
		angle: 0
	}, Events);
	
	Sprite.prototype.init = function(params) {
		params = params || {};
		// params.ctx: canvas 2d context
		// params.frameX: frame position x in sprite image
		// params.frameY: frame position y in sprite image
		// params.width: frame width
		// params.height: frame height
		// params.src: url on sprite image
		// params.x: sprite position x
		// params.y: sprite position y
		// params.angle: (int)(deg) - поворот изображения
		// params.camera: (GameCamera)(object) - рисуем относительно координат камеры
		// params.canvas: (Canvas) - определяем размеры картинки по размеру канваса
		
		for (var key in params) {
			this[key] = params[key];
		}
		
		if ( !this.x ) {this.x = 0;}
		if ( !this.y ) {this.y = 0;}
		
		this.load();
	};
	
	Sprite.prototype.load = function() {
		var image = new Image();
		this.image = image;
		image.onload = this.onLoad.bind(this, image);
		image.src = this.src;
	};
	
	Sprite.prototype.onLoad = function(image) {
		this.imgWidth = image.width;
		this.imgHeight = image.height;
	};
	
	Sprite.prototype.draw = function() {
		var angle = this.angle * Math.PI / 180;
		
		var cameraX = this.camera.x,
			cameraY = this.camera.y,
			x = this.x - cameraX,
			y = this.y - cameraY,
			r = Math.sqrt(x*x + y*y),
			betaAngle = Math.asin( y / r ),
			rx = r * Math.cos(angle + betaAngle),
			ry = r * Math.sin(angle + betaAngle),
			tx = rx - x,
			ty = ry - y;
		
		this.ctx.save();
		this.ctx.translate(-tx, -ty);
		this.ctx.rotate(angle);
		
		this.ctx.drawImage(this.image, 
			this.frameX, 
			this.frameY,
			this.width, 
			this.height,
			x - this.width/2,
			y - this.height/2,
			this.width, 
			this.height);
		
		this.ctx.restore();
	};
	
	Sprite.prototype.setAngle = function(angle) {
		this.angle = angle;
	};
	
	return Sprite;
})