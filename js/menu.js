function formatZipcode(zipcode) {
	if (zipcode) {
		zipcode = zipcode.replace(/[^0-9]/g, '').substring(0, 9);
		if (zipcode.length > 5) {
			return  zipcode.replace(/(\d{5})(\d{4})/, "$1-$2");
		}
		return zipcode;
	} else {
		return '';
	}
}

function checkAddress(){
	var payload = {};
	payload['firstname'] = $('#firstname').val();
	payload['lastname'] = $('#lastname').val();
	payload['dob'] = $('#dob').val();
	payload['house'] = $('#house').val();
	payload['zip'] = $('#zip').val();
	$.post('api/processAddress.cfm',
			payload,
			function(response){
				var statusText = '';
				if ('result' in response && response.result >= 0) {
					$('#city').val(response.city);
					$('#hidden_fields').slideDown();
				} else {
					$('#city').val('');
					$('#hidden_fields').slideUp();
				}
				$('#pivot_element').text(statusText);
				
			},
			'json'
	);
}

$(document).ready(function(){
	$('#pivot_array').on("propertychange keyup change paste", function(event){
		var KeyID = event.keyCode;
		if (KeyID >= 48 && KeyID <= 57 && this.value.length > 4) {
			var payload = {};
			payload['arrToTest'] = this.value;
			$.post('api/processPivot.cfm',
					payload,
					function(response){
						var statusText = '';
						if ('result' in response && response.result >= 0) {
							statusText = 'Pivot element: ' + response.element + '(#' + response.result + ')';
						} else {
							statusText = 'Pivot element not found';
						}
						$('#pivot_element').text(statusText);
						
					},
					'json'
			);
		}
	});
	$('#zip').on("propertychange keyup change paste", function(event){
		var KeyID = event.keyCode;
		switch(KeyID) {
			case 8: break; 
			case 46: break;
			default: $(this).val(formatZipcode($(this).val())); break;
		}
	});
})