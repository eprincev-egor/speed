define([
	"funcs",
	"eva",
	"classes/Game/Sprite"
], function(f, Events, Sprite) {
	"use strict";
	
	var BackgroundSprite = Sprite.extend("BackgroundSprite", {});
	
	BackgroundSprite.prototype.drawBy = function(ctx, cnvWidth, cnvHeight) {
		var cx = this.camera.x,
			cy = this.camera.y,
			imgWidth = this.imgWidth,
			imgHeight = this.imgHeight,
			offsetLeft = cx % imgWidth,
			offsetTop = cy % imgHeight;
		
		var pattern = ctx.createPattern(this.image, "repeat");
		ctx.save();
		ctx.fillStyle = pattern;
		ctx.translate(-offsetLeft, -offsetTop);
		
		ctx.fillRect(
			offsetLeft, 
			offsetTop, 
			cnvWidth, 
			cnvHeight);
		
		ctx.restore();
	};
	
	BackgroundSprite.prototype.draw = function() {
		this.drawBy(this.ctx, this.canvas.width, this.canvas.height);
	};
	
	BackgroundSprite.prototype.drawMini = function(ctx, w, h) {
		this.drawBy(ctx, w, h);
	};
	
	return BackgroundSprite;
})