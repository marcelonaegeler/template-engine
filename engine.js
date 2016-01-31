var templateEngine = function( tmpl, data, returnString ) {

	var tags = /<%(.+?)%>/g
		, statements = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g
		, code = 'with ( obj ) { var r=[];\n'
		, cursor = 0
		, match
		, result;

	var add = function( line, js ) {
		if ( js ) {
			code += ( line.match( statements ) ? line + '\n' : 'r.push(' + line + ');\n' );
		} else {
			/*
			* There's a workaround to make it work (.replace( / {2}/g ))
			* Replaces unused spaces to prevent empty text nodes
			*/
			code += ( line != '' ? ( 'r.push("' + line.replace(/"/g, '\\"').replace( / {2}/g, '' ) + '");\n' ) : '' );
		}
		return add;
	}
	while ( match = tags.exec( tmpl ) ) {
		add( tmpl.slice( cursor, match.index ) )( match[1], true );
		cursor = match.index + match[0].length;
	}
	add( tmpl.substr( cursor, tmpl.length - cursor ) );
	code = ( code + 'return r.join( "" ); }' ).replace( /[\r\t\n]/g, '' );

	try {
		result = new Function( 'obj', code ).apply( data, [ data ] );
	} catch ( err ) {
		console.error( "'" + err.message + "'", " in \n\nCode:\n", code, "\n" );
	}

	if ( !returnString ) {
		var d = document.createElement( 'div' );
		d.innerHTML = result;
		
		result = d.childNodes[ 0 ];
	}

	return result;
	
};
