( function () {
	var template = document.getElementById( 'tpl-demo' ).innerHTML
		, containerCompiled = document.getElementById( 'container-compiled' )
		, containerText = document.getElementById( 'container-text' );

	var data = { url: 'https://github.com/marcelonaegeler/template-engine', name: 'Github' };
	
	containerCompiled.appendChild( templateEngine( template, data ) ); // As HTML Element

	containerText.innerText = templateEngine( template, data, true ); // As text string
	
})();