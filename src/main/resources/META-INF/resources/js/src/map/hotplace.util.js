/**
 * @namespace hotplace.util
 * */
(function(util, $) {
	util.maskAll = function(val, shape) {
		var s = '';
		var len = val.length;
		shape = shape || '#';
		
		if(len) {
			for(var i=0; i<len; i++) {
				s += shape;
			}
		}
		
		return s;
	}
	
	util.getEmail = function($txt, $sel) {
		var selV = $sel.val();
		if(selV == 'D') {
			return $txt.val();
		}
		
		return $txt.val() + '@' + selV;
	}
}(
	hotplace.util = hotplace.util || {},
	jQuery
));