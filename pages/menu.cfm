<div>
	<h3>Pivot Element</h3>
	<form>
		<label for="pivot_array">
			Please type your array here:
			<input type="text" id="pivot_array" name="pivot_array" value="">
		</label>
		<p id="pivot_element"></p>
	</form>
</div>
<div>
	<h3>Address Lookup</h3>
	<form>
		<p>
			<label for="firstname">
				<input type="text" id="firstname" name="firstname" value="" placeholder="Firstname">
			</label>
			<label for="lastname">
				<input type="text" id="lastname" name="lastname" value="" placeholder="Lastname">
			</label>
			<label for="dob">
				<input type="text" id="dob" name="dob" value="" placeholder="Date of Birth">
			</label>
			<label for="house">
				<input type="text" id="house" name="house" value="" placeholder="House Number">
			</label>
			<label for="zip">
				<input type="text" id="zip" name="zip" value="" placeholder="Postal Code">
			</label>
		</p>
		<p id="hidden_fields">
			<label for="city">
				<input type="text" id="city" name="city" value="">
			</label>
		</p>
		<p>
			<input type="button" value="Submit" onclick="checkAddress()">
		</p>
	</form>
</div>