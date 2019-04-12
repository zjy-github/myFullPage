
var ComponentJSX = function(config) {
	var $JSX = $();
	if( typeof config.templete == 'string'){
		$JSX = $(config.templete);
	}
	config.className && $JSX.addClass(config.className);
	config.css && $JSX.css(config.css);
	
	if(config.event) {
		for(var prop in config.event){
			$JSX.on(prop, config.event[prop]);
		}
	}
	return $JSX;
}

// ComponentNest()