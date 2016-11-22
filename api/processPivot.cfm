<cfscript>
	arrToTest = ListToArray(replace(form.arrToTest, '"', '', 'all'));

	for(i = 1; i lte ArrayLen(arrToTest); i++) {
		if (not IsNumeric(arrToTest[i])) arrToTest[i] = 0;
	}

	response = {'message': 'Not found', 'result': -1, 'element': ''};

	if (ArrayLen(arrToTest) < 3) response = {'message': 'Array too short', 'result': -1, 'element': ''};

	for(i = 2; i lt ArrayLen(arrToTest); i++) {
		arrLeft = ArraySlice(arrToTest, 1, i - 1);
		arrRight = ArraySlice(arrToTest, i + 1);

		if (ArraySum(arrLeft) eq ArraySum(arrRight)) {
			response = {'message': 'Pivot element found', 'result': Int(i), 'element': arrToTest[i]};
			break;
		}
	}
	WriteOutput(SerializeJSON(response));
</cfscript>