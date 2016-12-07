<ul class="nav">
	<li><a href="#sect_01">Task #1: Pivot Array</a></li>
	<li><a href="#sect_02">Task #2: Address Lookup</a></li>
	<li><a href="#sect_03">Quick Tests</a></li>
</ul>

<div class="section" id="sect_01">
	<h3>Pivot Element</h3>
	<p>Type in or paste your array, comma-separated, in the box below</p>
	<form>
		<p><input type="text" id="pivot_array" name="pivot_array" value=""></p>
		<p id="pivot_element"></p>
		<p>
			<input type="button" value="Submit" onclick="checkArray()">
		</p>
	</form>
</div>
<div class="section" id="sect_02">
	<h3>Address Lookup</h3>
	<p>Fill all or some of the data fields to check against server data</p>
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
				City: <input type="text" id="city" name="city" value="">
			</label>
		</p>
		<p>
			<input type="button" value="Submit" onclick="sendAddress()">
		</p>
		<p id="status"></p>
	</form>
</div>
<div class="section" id="sect_03">
	<h3>Test Section</h3>
	<form>
		<p><input type="button" value="Run Tests" onclick="runTests()"></p>
	</form>
	<div id="test_log">
	</div>
</div>