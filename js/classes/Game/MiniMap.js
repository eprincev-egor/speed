define([
	"funcs",
	"eva"
], function(f, Events) {
	"use strict";
	
	var MiniMap = f.CreateClass("MiniMap", {}, Events);
	
	MiniMap.prototype.init = function(params) {
		params = params || {};
		
		// params.camera: (GameCamera)(object) - следим за камерой
		// params.x: (int) - координаты карты на холсте (независимо от камеры)
		// params.y: (int)
		// params.width: (int) - размеры карты внутри холста
		// params.height: (int)
		// params.scale: (int) 0 ... 1  масштаб карты
		// params.parent: (DOMElement)(object) - место где создаем новый canvas для карты
		// params.road: (GameRoad)(object) дорога
		// params.background: (GameBackgroundSprite)(Sprite)(Object) - фон для отрисовки
		// params.cars: (array) of (GameCar)(object) - массив машин, которые рисуем в виде точек
		
		for (var key in params) {
			this[key] = params[key];
		}
		
		this.initCanvas();
	};
	
	MiniMap.prototype.initCanvas = function() {
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.style.position = "absolute";
		canvas.style.border = "1px solid black";
		canvas.style.left = this.x + "px";
		canvas.style.top = this.y + "px";
		canvas.style.zIndex = 10;
		
		this.parent.appendChild(canvas);
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
	};
	
	MiniMap.prototype.draw = function() {
		this.canvas.width += 0;
		
		var picWidth = this.width / this.scale,
			picHeight = this.height / this.scale;
		
		this.ctx.scale(this.scale, this.scale);
		this.ctx.translate(picWidth/2, picHeight/2);
		
		this.background.drawMini(this.ctx, picWidth, picHeight);
		this.road.drawMini(this.ctx, picWidth, picHeight);
		this.ctx.beginPath();
		
		var car, x, y, w, h;
		for (var i=0, n=this.cars.length; i<n; i++) {
			car = this.cars[i];
			x = car.x - this.camera.y;
			y = car.y - this.camera.x;
			w = car.width;
			
			this.ctx.arc(x, y, w/2, 0, Math.PI * 2)
			this.ctx.fillStyle = "red";
			this.ctx.fill();
		}
		
	};
	
	return MiniMap;
})