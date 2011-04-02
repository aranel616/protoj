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

protoj.prototype.hide = function() {
	this.each(function(e){
		e.hide();
	})
	
	return this;
}

protoj.prototype.show = function() {
	this.each(function(e){
		e.show();
	})
	
	return this;
}