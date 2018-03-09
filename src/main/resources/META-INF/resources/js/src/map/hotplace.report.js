/**
 * @namespace hotplace.report 
 * https://brunch.co.kr/@ourlove/60
 * @desc printThis jquery library
 */
(function(report, $) {
	
	function send(type, cfg) {
		var form = document.createElement('form');
		form.action = hotplace.getContextUrl() + 'download/' + type;
		form.method = 'POST';
		form.target = '_self';
		
		var input = document.createElement('input');
		input.type = 'hidden';
	    input.name = 'json';
	    input.value = JSON.stringify(cfg);
	   
	    form.appendChild(input);
		form.style.display = 'none';
		document.body.appendChild(form);
		form.submit();
	}
	
	report.PDF = {
		profit : function() {
			//console.log(cfg);
			send('pdf', hotplace.sujibunseog.getPdfParams());
		}
	}

}(
	hotplace.report = hotplace.report || {},
	jQuery
));