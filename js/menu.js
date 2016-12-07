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
				}
			],
	adrTests = [
	            {
	            	'case': 'Empty',
	            	'data': {},
	            	'result': -1,
	            },
	            {
	            	'case': 'Missing data',
	            	'data': {
	            		'firstname': '',
	            		'lastname': '',
	            		'dob': '',
	            		'house': '',
	            		'zip': ''
	            	},
	            	'result': -1,
	            },
	            {
	            	'case': 'Normal found',
	            	'data': {
	            		'firstname': 'John',
	            		'lastname': 'Doe',
	            		'dob': '10/10/1976',
	            		'house': '23',
	            		'zip': '12345'
	            	},
	            	'result': 0,
	            },
	            {
	            	'case': 'Normal not found',
	            	'data': {
	            		'firstname': 'Jane',
	            		'lastname': 'Doe',
	            		'dob': '10/10/1976',
	            		'house': '23',
	            		'zip': '12345'
	            	},
	            	'result': -1,
	            }
	        ];
	
function formatZipcode(zipcode) {
	if (zipcode) {
		zipcode = zipcode.replace(/[^0-9]/g, '').substring(0, 9);
		if (zipcode.length > 5) {
			return zipcode.replace(/(\d{5})(\d{4})/, "$1-$2");
		}
		return zipcode;
	} else {
		return '';
	}
}

function checkAddress(address, runAsync, testCase, expected){
	if ((typeof runAsync === "undefined") || (runAsync === null)) runAsync = true;
	if ((typeof testCase === "undefined") || (testCase === null)) testCase = 'Unknown';
	if ((typeof expected === "undefined") || (expected === null)) expected = '';
	
	var payload = {};
	payload['firstname'] = address.firstname;
	payload['lastname'] = address.lastname;
	payload['dob'] = address.dob;
	payload['house'] = address.house;
	payload['zip'] = address.zip;
	$.ajax({
		url: 'api/processAddress.cfm',
		type: 'post',
		data: payload,
		async: runAsync,
		dataType: 'json'
	}).done(function(response){
		if (runAsync) {
			var statusText = '',
				className = 'success';
			if ('result' in response && response.result >= 0) {
				statusText = 'Address found';
				$('#city').val(response.city);
				$('#hidden_fields').slideDown();
			} else {
				statusText = 'Address not found';
				$('#city').val('');
				$('#hidden_fields').slideUp();
				className = 'fail';
			}
			$('#status').removeClass().addClass(className).text(statusText);
		} else {
			var status = '';
			if (response.result == expected) {
				status = '<span class="success">passed</span>';
			} else {
				status = '<span class="fail">failed</span>';
			}
			$('#test_log').append('<p>[Address] ' + testCase + ': ' + status + '</p>');
		}
	});
}

function checkArray(arrData, runAsync, testCase, expected) {
	if ((typeof arrData === "undefined") || (arrData === null)) arrData = $('#pivot_array').val();
	if ((typeof runAsync === "undefined") || (runAsync === null)) runAsync = true;
	if ((typeof testCase === "undefined") || (testCase === null)) testCase = 'Unknown';
	if ((typeof expected === "undefined") || (expected === null)) expected = '';
	
	var payload = {};
	payload['arrToTest'] = JSON.stringify(arrData);
	$.ajax({
		url: 'api/processPivot.cfm',
		type: 'post',
		data: payload,
		async: runAsync,
		dataType: 'json'			
	}).done(function(response){
		if (runAsync) {
			var statusText = '',
				className = 'success';
			if ('result' in response && response.result >= 0) {
				statusText = 'Pivot element: ' + response.element + '(#' + response.result + ')';
			} else {
				statusText = 'Pivot element not found';
				className = 'fail';
			}
			$('#pivot_element').removeClass().addClass(className).text(statusText);
		} else {
			var status = '';
			if (response.result == expected) {
				status = '<span class="success">passed</span>';
			} else {
				status = '<span class="fail">failed</span>';
			}
			$('#test_log').append('<p>[Array] ' + testCase + ': ' + status + '</p>');
		}
	});
}

function runTests() {
	var status = '';
	$('#test_log').empty();
	for (var i = 0; i < arrTests.length; i++) {
		checkArray(arrTests[i].data, false, arrTests[i].case, arrTests[i].result);		
	}
	for (var i = 0; i < adrTests.length; i++) {
		checkAddress(adrTests[i].data, false, adrTests[i].case, adrTests[i].result);		
	}
}

function sendAddress() {
	checkAddress({
		'firstname': $('#firstname').val(),
		'lastname': $('#lastname').val(),
		'dob': $('#dob').val(),
		'house': $('#house').val(),
		'zip': $('#zip').val()
	});
}

$(document).ready(function(){
	$('#pivot_array').on("propertychange keyup change paste", function(event){
		var KeyID = event.keyCode;
		if (KeyID >= 48 && KeyID <= 57 && this.value.length > 4) {
			checkArray();
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