<html>
	<head>
		<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
		<cfoutput>
			<link rel="stylesheet" href="css/#page#.css">
			<script src="js/#page#.js"></script>
		</cfoutput>
	</head>
	<body>
		<div class="body-top">
			<h2>Greetings!</h2>
			<p>Welcome to this mini site. Please check the sections below.</p>
		</div>
		<div class="content">
<cfinclude template="../pages/#page#.cfm" runonce="true">
		</div>
	</body>
</html>