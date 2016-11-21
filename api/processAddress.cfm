<cfscript>
	address = {
		'firstname': '',
		'lastname': '',
		'dob': '',
		'house': '',
		'zip': ''
	};
	arrAddresses = [
		{
			'firstname': 'John',
			'lastname': 'Doe',
			'dob': '10/10/1976',
			'house': '23',
			'zip': '12345',
			'city': 'Redmond'
		},
		{
			'firstname': 'Jane',
			'lastname': 'Doe',
			'dob': '10/11/1978',
			'house': '34',
			'zip': '54321',
			'city': 'Coopertino'
		},
		{
			'firstname': 'Anne-Marie',
			'lastname': 'Lavoisier',
			'dob': '11/22/1900',
			'house': '45',
			'zip': '99999-1111',
			'city': 'New Orleans'
		}
	];


	if (IsDefined("form.firstname")) address.firstname = form.firstname;
	if (IsDefined("form.lastname")) address.lastname = form.lastname;
	if (IsDefined("form.dob")) address.dob = form.dob;
	if (IsDefined("form.house")) address.house = form.house;
	if (IsDefined("form.zip")) address.zip = form.zip;

	response = {'message': 'Not found', 'result': -1, 'city': ''};

	for(i = 1; i lte ArrayLen(arrAddresses); i++) {
		if (lcase(address.firstname) eq lcase(arrAddresses[i].firstname)
		and lcase(address.lastname) eq lcase(arrAddresses[i].lastname)
		and lcase(address.dob) eq lcase(arrAddresses[i].dob)
		and lcase(address.house) eq lcase(arrAddresses[i].house)
		and lcase(address.zip) eq lcase(arrAddresses[i].zip)) {
			response = {'message': 'Address found', 'result': Int(i - 1), 'city': arrAddresses[i].city};
			break;
		}
	}
	WriteOutput(SerializeJSON(response));
</cfscript>