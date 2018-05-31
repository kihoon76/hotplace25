/**
 * @namespace hotplace.report 
 * https://brunch.co.kr/@ourlove/60
 * @desc printThis jquery library
 */
(function(report, $) {
	
	function send(type, cfg) {
		var form = document.createElement('form');
		form.action = hotplace.getContextUrl() + 'download/' + type;
		form.encoding = 'application/json',
		form.method = 'POST';
		form.target = '_blank';
		
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
		sujibunseog : function() {
			send('pdf', hotplace.sujibunseog.getPdfParams());
		}
	}

}(
	hotplace.report = hotplace.report || {},
	jQuery
));