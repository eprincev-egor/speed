define([
	"funcs",
	"eva"
], function(f, Events) {
	"use strict";
	
	var Road = f.CreateClass("Road", {}, Events);
	
	Road.prototype.init = function(params) {
		params = params || {};
		// params.points: (array) of (object)({x: (int), y: (int)}) - массив точек, по которым рисуем карту
		// params.x: (int)
		// params.y: (int)
		// params.camera: (GameCamera)(object) - следим за камерой
		// params.ctx: (Canvas 2d Context)(object) - рисуем на этом холсте
		
		for (var key in params) {
			this[key] = params[key];
		}
		
		
	};
	
	Road.prototype.offsetPoint = function(point) {
		return {
			x: this.x - this.camera.x + point.x, 
			y: this.y - this.camera.y + point.y
		}
	};
	
	Road.prototype.drawLine = function(ctx, color, width) {
		ctx.beginPath();
		
		var point = this.offsetPoint( this.points[0] );
		ctx.moveTo(point.x, point.y);
		
		for (var i=1, n=this.points.length; i<n; i++) {
			point = this.offsetPoint( this.points[i] );
			ctx.lineTo(point.x, point.y);
		}
		ctx.closePath();
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.stroke();
	};
	
	Road.prototype.draw = function() {
		this.drawLine(this.ctx, "gray", 148);
		this.drawLine(this.ctx, "white", 10);
	};
	
	Road.prototype.drawMini = function(ctx) {
		this.drawLine(ctx, "gray", 148);
		this.drawLine(ctx, "white", 10);
	};
	
	return Road;
})