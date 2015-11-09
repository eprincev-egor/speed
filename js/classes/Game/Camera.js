define([
	"funcs",
	"eva"
], function(f, Events) {
	"use strict";
	
	var Camera = f.CreateClass("Camera", {}, Events);
	
	Camera.prototype.init = function(params) {
		params = params || {};
		
		// params.object: (GameObject) - следим за перемещение объекта
		// params.canvas: (Canvas) - размер камеры равен размеру холста
		// params.coeff: (int) - от 0 до 1, определяем границы внутри камера, 
		// за которые объект не может выйти
		
		for (var key in params) {
			this[key] = params[key];
		}
		
		this.x = 0;
		this.y = 0;
	};
	
	Camera.prototype.setObject = function(obj) {
		this.object = obj;
	};
	
	Camera.prototype.update = function() {
		var objWidth = this.object.width,
			objHeight = this.object.height,
			cameraWidth = this.canvas.width,
			cameraHeight = this.canvas.height,
			ox = this.object.x,
			oy = this.object.y,
			cx = this.x,
			cy = this.y,
			coeff = this.coeff,
			coeffWidth = cameraWidth * coeff,
			coeffHeight = cameraHeight * coeff,
			coeffX = (cameraWidth - coeffWidth) / 2,
			coeffY = (cameraHeight - coeffHeight) / 2,
			leftBound = cx + coeffX,
			rightBound = leftBound + coeffWidth,
			topBound = cy + coeffY,
			bottomBound = topBound + coeffHeight,
			nx = cx,
			ny = cy;
		
		if ( this.fixMode ) {
			this.x = ox - cameraWidth/2;
			this.y = oy - cameraHeight/2;
			return;
		}
		
		if ( ox + objWidth > rightBound ) {
			nx = cx - (rightBound - (ox + objWidth));
		}
		
		if ( ox < leftBound ) {
			nx = cx - (leftBound - ox);
		}
		
		if ( oy + objHeight > bottomBound ) {
			ny = cy - (bottomBound - (oy + objHeight));
		}
		
		if ( oy < topBound ) {
			ny = cy - (topBound - oy);
		}
		
		this.x = nx;
		this.y = ny;
	};
	
	return Camera;
})