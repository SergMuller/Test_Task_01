<cfscript>
	layout = 'main';
	page = 'menu';
	if (IsDefined('url.p')) {
		page = url.p;
	}



</cfscript>
<cfinclude template="layout/#layout#.cfm" runonce="true">