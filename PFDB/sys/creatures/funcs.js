function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function debugmsg(text, noarray = false) {
	if(typeof text == 'object' && !noarray) {
		$('#debug').append('<p></p>');
		for(var i = 0; i < text.length; i++) {
			$('#debug p:last-child').append(text[i] + '<br />');
		}
	}
	else {
		$('#debug').append('<p>' + text + '</p>');
	}
}