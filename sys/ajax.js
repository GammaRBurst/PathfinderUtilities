function ajaxCreatures() {
	return $.ajax({mimeType: 'text/plain; charset=UTF-8', url: 'creatures.txt', dataType: 'text'});
}