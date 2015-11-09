define([
	"funcs",
	"eva"
], function(f, Events) {
	"use strict";
	
	var Car = f.CreateClass("Car", {}, Events);
	
	Car.prototype.init = function(params) {
		params = params || {};
		// params.sprite: Sprite object
		// params.x: (int)
		// params.y: (int)
		// params.angle: (int)(deg) - направление машины
		// params.width: (int)
		// params.height: (int)
		// params.minSpeed: (int)
		// params.maxSpeed: (int)
		// params.speed: (int) move car on pixel * speed
		
		for (var key in params) {
			this[key] = params[key];
		}
		
		if ( !this.x ) {
			this.x = 0;
		}
		
		if ( !this.y ) {
			this.y = 0;
		}
		
		if ( !this.speed ) {
			this.speed = 0;
		}
		
		if ( !this.angle ) {
			this.angle = 0;
		}
		
		this.vector = {};
		this.updateVector();
	};
	
	Car.prototype.draw = function() {
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.setAngle(this.angle);
		this.sprite.draw();
	};
	
	Car.prototype.move = function() {
		this.x += (this.vector.x * this.speed);
		this.y += (this.vector.y * this.speed);
	};
	
	Car.prototype.rotateOn = function(angle) {
		this.angle += angle;
		this.updateVector();
	};
	
	Car.prototype.updateVector = function() {
		var angle = Math.PI * this.angle / 180
		this.vector.x = Math.cos(angle);
		this.vector.y = Math.sin(angle);
	};
	
	Car.prototype.upSpeed = function(speed) {
		this.speed += speed;
		this.speed = Math.min(this.speed, this.maxSpeed);
		this.speed = Math.max(this.speed, this.minSpeed);
	};
	
	// тормозим машину
	Car.prototype.dragSpeed = function(speed) {
		if ( this.speed > 0 ) {
			this.speed -= speed;
			this.speed = Math.max(0, this.speed);
		} else {
			this.speed += speed;
			this.speed = Math.min(0, this.speed);
		}
	};
	
	return Car;
})