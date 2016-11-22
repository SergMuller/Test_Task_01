var arrTests = [
                {
                	'case': 'Empty',
					'data': '',
					'result': -1
				},
				{
					'case': 'Too short',
					'data': '5,6',
					'result': -1
				},
				{
					'case': 'Min passing',
					'data': '5,6,5',
					'result': 2
				},
				{
					'case': 'Example',
					'data': '5,9,7,17,6,5,4,6',
					'result': 4
				},
				{
					'case': 'Non-numeric',
					'data': '"a",1,"a"',
					'result': 2
				}];
	
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
					$('#status').text('');
					$('#city').val(response.city);
					$('#hidden_fields').slideDown();
				} else {
					$('#status').text('Address not found');
					$('#city').val('');
					$('#hidden_fields').slideUp();
				}
				$('#pivot_element').text(statusText);
				
			},
			'json'
	);
}

function checkArray(arrData, runAsync, testCase, expected) {
	if ((typeof runAsync === "undefined") || (runAsync === null)) runAsync = true;
	if ((typeof testCase === "undefined") || (testCase === null)) testCase = 'Unknown';
	if ((typeof expected === "undefined") || (expected === null)) expected = '';
	
	var payload = {},
		result = '';
	payload['arrToTest'] = arrData;
	$.ajax({
		url: 'api/processPivot.cfm',
		type: 'post',
		data: payload,
		async: runAsync,
		dataType: 'json',
		success:
			function(response){				
				if (runAsync) {
					var statusText = '';
					if ('result' in response && response.result >= 0) {
						statusText = 'Pivot element: ' + response.element + '(#' + response.result + ')';
					} else {
						statusText = 'Pivot element not found';
					}
					$('#pivot_element').text(statusText);
				} else {
					var status = '';
					if (response.result == expected) {
						status = '<span class="success">passed</span>';
					} else {
						status = '<span class="fail">failed</span>';
					}
					$('#test_log').append('<p>' + testCase + ': ' + status + '</p>');
				}
				
				result = response.resultl;
			}
			
	});
	return result;
}

function runTests() {
	var status = '';
	$('#test_log').empty();
	for (var i = 0; i < arrTests.length; i++) {
		checkArray(JSON.stringify(arrTests[i].data), false, arrTests[i].case, arrTests[i].result);		
	}
}

$(document).ready(function(){
	$('#pivot_array').on("propertychange keyup change paste", function(event){
		var KeyID = event.keyCode;
		if (KeyID >= 48 && KeyID <= 57 && this.value.length > 4) {
			checkArray(this.value);
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