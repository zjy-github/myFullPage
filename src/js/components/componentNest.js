
var ComponentNest = function(config) {
	var $sel = $(`<${config.select}></${config.select}>`);
	config.className && $sel.addClass(config.className);
	config.text && $sel.text(config.text);
	config.css && $sel.css(config.css);
	if(config.event) {
		for(var prop in config.event){
			$sel.on(prop, config.event[prop]);
		}
	}
	if(config.attr) {
		for(var prop in config.attr){
			$sel.attr(prop, config.attr[prop]);
		}
	}
	if(config.children && config.children.length != 0){
		config.children.forEach(function(ele, i) {
			var $child = ComponentNest(ele);
			$sel.append($child);
		})
	}
	
	return $sel;
}

// ComponentNest()