<cfscript>
	arrToTest = ListToArray(form.arrToTest);
	/*
	arrToTest = [5];
	arrToTest = [5,6];
	arrToTest = [5,6,5];
	arrToTest = [5,6,2,3];
	arrToTest = [5,9,7,17,6,5,4,6];
	* */
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