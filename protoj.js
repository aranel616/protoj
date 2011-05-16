delete window.$$;

window.$$ = function() {
  var expression = $A(arguments).join(', ');
  return new protoj(Prototype.Selector.select(expression, document));
};

protoj = function(data) {
	data.hide = this.hide;
	data.show = this.show;
	
	return data;
};

protoj.speeds = {
	fast: 200,
	slow: 600,
	_default: 400
};

protoj.prototype.hide = function(speed, callback) {
	/* Allow callback to be the first and only parameter */
	if (Object.isFunction(speed))
		callback = speed;
	
	/* Set speed if value is 'fast' or 'slow' */ 
	if (protoj.speeds[speed])
		speed = protoj.speeds[speed];
	else if (!Object.isNumber(speed))
		speed = 0;
	
	this.each(function(e){
		if (speed == 0) {
			e.hide();
			
			if (typeof callback == 'function')
				callback.call(e);
		} else {
			Effect.Fade(e, {
				duration: speed / 1000,
				afterFinish: function(){
					if (typeof callback == 'function')
						callback.call(e);
				}
			});
		}
	})
	
	return this;
}

protoj.prototype.show = function(speed, callback) {
	/* Allow callback to be the first and only parameter */
	if (Object.isFunction(speed))
		callback = speed;
	
	/* Set speed if value is 'fast' or 'slow' */ 
	if (protoj.speeds[speed])
		speed = protoj.speeds[speed];
	else if (!Object.isNumber(speed))
		speed = 0;
	
	this.each(function(e){
		if (speed == 0) {
			e.show();
			
			if (typeof callback == 'function')
				callback.call(e);
		} else {
			Effect.Appear(e, {
				duration: speed / 1000,
				afterFinish: function(){
					if (typeof callback == 'function')
						callback.call(e);
				}
			});
		}
	})
	
	return this;
}
