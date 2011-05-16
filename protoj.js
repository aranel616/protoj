Element.addMethods({
	hide: function(element, speed, callback) {
		/* Allow callback to be the first and only parameter */
		if (Object.isFunction(speed)) {
			callback = speed;
			speed = false;
		}
		
		if (!(speed))
			speed = 0;
		
		/* Set speed if value is 'fast' or 'slow' */ 
		if (protoj.speeds[speed])
			speed = protoj.speeds[speed];
		else if (!Object.isNumber(speed))
			speed = protoj.speeds['_default'];
		
		
		if (speed == 0) {
			element.setStyle({display: 'none'});
			
			if (typeof callback == 'function')
				callback.call(element);
		} else {
			Effect.Fade(element, {
				duration: speed / 1000,
				afterFinish: function(){
					if (typeof callback == 'function')
						callback.call(element);
				}
			});
		}
		
		return element;
	},
	
	show: function(element, speed, callback) {
		/* Allow callback to be the first and only parameter */
		if (Object.isFunction(speed)) {
			callback = speed;
			speed = false;
		}
		
		if (!(speed))
			speed = 0;
		
		/* Set speed if value is 'fast' or 'slow' */ 
		if (protoj.speeds[speed])
			speed = protoj.speeds[speed];
		else if (!Object.isNumber(speed + 0))
			speed = protoj.speeds['_default'];
		
		if (speed == 0) {
			element.setStyle({display: ''});
			
			if (typeof callback == 'function')
				callback.call(element);
		} else {
			Effect.Appear(element, {
				duration: speed / 1000,
				afterFinish: function(){
					if (typeof callback == 'function')
						callback.call(element);
				}
			});
		}
		
		return element;
	}
})

delete window.$$;

window.$$ = function() {
  var expression = $A(arguments).join(', ');
  return new protoj(Prototype.Selector.select(expression, document));
};

var events = "blur focus click dblclick mousedown mouseup mousemove " +
             "mouseover mouseout mouseenter mouseleave change select " +
             "submit keydown keypress keyup";
events = events.split(' ');

protoj = function(data) {
	data.hide = function(speed, callback) {
		this.invoke('hide', speed, callback);
		return this;
	};
	
	data.show = function(speed, callback) {
		this.invoke('show', speed, callback);
		return this;
	};
	
	for (i = 0; i < events.length; i++) {
		data[events[i]] = this[events[i]];
	}
	
	return data;
};

protoj.speeds = {
	fast: 200,
	slow: 600,
	_default: 400
};

events.each(function(name){
	protoj.prototype[name] = function(callback) {
		this.each(function(element){
			element.observe(name, function(event){
				callback.call(element, event);
			})
		})

		return this;
	}
})