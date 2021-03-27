function debugmsg(text) {
	if(typeof text == 'object') {
		$('#debug').append('<p>' + JSON.stringify(text) + '</p>');
	}
	else {
		$('#debug').append('<p>' + text + '</p>');
	}
}

function parseText(text, acr = true) {
	while(text.indexOf('´´´') >= 0) {
		text = text.slice(0, text.indexOf('´´´')) + '<span class="italic">' + text.slice(text.indexOf('´´´') + 3);
		text = text.slice(0, text.indexOf('´´´')) + '</span>' + text.slice(text.indexOf('´´´') + 3);
	}
	while(text.indexOf("'''") >= 0) {
		text = text.slice(0, text.indexOf("'''")) + '</p><p><span class="bold">' + text.slice(text.indexOf("'''") + 3);
		text = text.slice(0, text.indexOf("'''")) + '</span>' + text.slice(text.indexOf("'''") + 3);
	}
	while(text.indexOf('___') >= 0) {
		text = text.slice(0, text.indexOf('___')) + '<span class="under">' + text.slice(text.indexOf('___') + 3);
		text = text.slice(0, text.indexOf('___')) + '</span>' + text.slice(text.indexOf('___') + 3);
	}
	while(text.indexOf('[[[') >= 0) {
		var tab_num = Number(text.split('[[[', 2)[1].split(']]]', 2)[0]);
		text = text.slice(0, text.indexOf('[[[')) + '</p>' + tables[tab_num] + '<p>' + text.slice(text.indexOf(']]]') + 3);
	}
	if(acr) {
		while(text.indexOf('{{{') >= 0) {
			var acr_num = Number(text.split('{{{', 2)[1].split('}}}', 2)[0]);
			text = text.slice(0, text.indexOf('{{{')) + '(' + acronyms[acr_num] + ')' + text.slice(text.indexOf('}}}') + 3);
		}
	}
	return text;
}

function adaptName(name) {
	name = name.split(' ');
	for(var i = 0; i < name.length; i++) {
		name[i] = name[i].split('-');
		for(var j = 0; j < name[i].length; j++) {
			name[i][j] = name[i][j].split('>');
			for(var k = 0; k < name[i][j].length; k++) {
				name[i][j][k] = name[i][j][k].split('(');
				for(var l = 0; l < name[i][j][k].length; l++) {
					name[i][j][k][l] = name[i][j][k][l].slice(0, 1).toUpperCase() + name[i][j][k][l].slice(1).toLowerCase();
				}
				name[i][j][k] = name[i][j][k].join('(');
			}
			name[i][j] = name[i][j].join('>');
		}
		name[i] = name[i].join('-');
	}
	name = name.join(' ');
	while(name.indexOf('{{{') >= 0) {
		var acr_num = Number(name.split('{{{', 2)[1].split('}}}', 2)[0]);
		name = name.slice(0, name.indexOf('{{{')) + '(' + acronyms[acr_num] + ')' + name.slice(name.indexOf('}}}') + 3);
	}
	return name;
}

function genTypes(tlist) {
	var text = '';
	for(var i = 0; i < tlist.length - 1; i++) {
		text += types[tlist[i]] + ', ';
	}
	text += types[tlist[tlist.length - 1]];
	return text;
}

function genSources(feat) {
	var text = '';
	for(var i = 0; i < feat[5].length; i++) {
		text += sources[feat[5][i][13]] + ', ';
	}
	return text.slice(0, text.length - 2);
}

function prepareFeat(feat) {
	var text = '<div class="close" id="close-feat-' + feat[0] + '">&times;</div>';
	if(feat[6]) {
		text += '<h2><span class="greyed">' + feat[1][0] + '</span> [' + genTypes(feat[2]) + ']</h2>';
	}
	else {
		text += '<h2>' + feat[1][0] + ' [' + genTypes(feat[2]) + ']</h2>';
	}
	for(var i = 0; i < feat[5].length; i++) {
		text += '<p class="source"><span class="bold">Source</span>: <span class="under">' + manuals[feat[5][i][14]].split(' (')[0] + '</span> (' + manuals[feat[5][i][14]].split(' (')[1] + ', page ' + feat[5][i][15] + '</p>';
		if(feat[5][i][0] != '') {
			text += '<p>' + feat[5][i][0] + '</p>';
		}
		if(feat[5][i][1] != '') {
			text += '<p><span class="bold">Prerequisites</span>: ' + feat[5][i][1] + '</p>';
		}
		if(feat[5][i][2] != '') {
			text += '<p><span class="bold">Benefit</span>: ' + feat[5][i][2] + '</p>';
		}
		if(feat[5][i][3] != '') {
			text += '<p><span class="bold">Normal</span>: ' + feat[5][i][3] + '</p>';
		}
		if(feat[5][i][4] != '') {
			text += '<p><span class="bold">Note</span>: ' + feat[5][i][4] + '</p>';
		}
		if(feat[5][i][5] != '') {
			text += '<p><span class="bold">Goal</span>: ' + feat[5][i][5] + '</p>';
		}
		if(feat[5][i][6] != '') {
			text += '<p><span class="bold">Completion Benefit</span>: ' + feat[5][i][6] + '</p>';
		}
		if(feat[5][i][7] != '') {
			text += '<p><span class="bold">Residual</span>: ' + feat[5][i][7] + '</p>';
		}
		if(feat[5][i][8] != '') {
			text += '<p><span class="bold">Special</span>: ' + feat[5][i][8] + '</p>';
		}
		if(feat[5][i][9] != '') {
			text += '<p><span class="bold">Suggested Traits</span>: ' + feat[5][i][9] + '</p>';
		}
		if(feat[5][i][10] != '') {
			text += '<h3>Combat Trick</h3><p class="source"><span class="bold">Source</span>: <span class="under">' + manuals[feat[5][i][11]].split(' (')[0] + '</span> (' + manuals[feat[5][i][11]].split(' (')[1] + ', page ' + feat[5][i][12] + '</p><p>' + feat[5][i][10] + '</p>';
		}
		text += '<hr />';
	}
	return text.slice(0, text.length - 6);
}

function storePrereq(feat) {
	result = [];
	//Prerequisite: ability scores
	if(feat[3].trim() == '') {
		result.push([]);
	}
	else {
		result.push(feat[3].trim().split('/')); //Split at OR conditions
		for(var j = 0; j < result[0].length; j++) {
			result[0][j] = result[0][j].trim().split(';'); //Split at AND conditions
			for(var k = 0; k < result[0][j].length; k++) {
				result[0][j][k] = result[0][j][k].trim(); //Splitting at : and transforming into numbers will happen at filtering phase
			}
		}
	}
	//Prerequisite: feats
	if(feat[4].trim() == '') {
		result.push([]);
	}
	else {
		result.push(feat[4].trim().split(';'));
		for(var j = 0; j < result[1].length; j++) {
			result[1][j] = Number(result[1][j].trim());
		}
	}
	//Prerequisite: race
	if(feat[5].trim() == '') {
		result.push([0]);
	}
	else {
		result.push(feat[5].trim().split(';'));
		for(var j = 0; j < result[2].length; j++) {
			result[2][j] = Number(result[2][j].trim());
		}
	}
	//Prerequisite: level
	if(feat[6].trim() == '') {
		result.push(0);
	}
	else {
		result.push(Number(feat[6].trim()));
	}
	//Prerequisite: mythic tier/rank
	if(feat[7].trim() == '') {
		result.push(0);
	}
	else {
		result.push(Number(feat[7].trim()));
	}
	//Prerequisite: class
	if(feat[8].trim() == '') {
		result.push([]);
	}
	else {
		result.push(feat[8].trim().split('/')); //Split at OR conditions
		for(var j = 0; j < result[5].length; j++) {
			result[5][j] = result[5][j].trim().split(';'); //Split at AND conditions
			for(var k = 0; k < result[5][j].length; k++) {
				result[5][j][k] = result[5][j][k].trim(); //Splitting at : and transforming into numbers will happen at filtering phase
			}
		}
	}
	//Prerequisite: BAB
	if(feat[9].trim() == '') {
		result.push(0);
	}
	else {
		result.push(Number(feat[9].trim()));
	}
	//Prerequisite: caster level
	if(feat[10].trim() == '') {
		result.push([]);
	}
	else {
		result.push(feat[10].trim().split('/')); //Split at OR conditions
		for(var j = 0; j < result[7].length; j++) {
			result[7][j] = result[7][j].trim().split(';'); //Split at AND conditions
			for(var k = 0; k < result[7][j].length; k++) {
				result[7][j][k] = result[7][j][k].trim(); //Splitting at : and transforming into numbers will happen at filtering phase
			}
		}
	}
	//Prerequisite: skill
	if(feat[11].trim() == '') {
		result.push([]);
	}
	else {
		result.push(feat[11].trim().split('/')); //Split at OR conditions
		for(var j = 0; j < result[8].length; j++) {
			result[8][j] = result[8][j].trim().split(';'); //Split at AND conditions
			for(var k = 0; k < result[8][j].length; k++) {
				result[8][j][k] = result[8][j][k].trim(); //Splitting at : and transforming into numbers will happen at filtering phase
			}
		}
	}
	return result;
}

function storeText(feat) {
	result = [];
	//Feat text: description
	result.push(parseText(feat[13].trim()));
	//Feat text: prerequisites
	result.push(parseText(feat[14].trim()));
	//Feat text: benefit
	result.push(parseText(feat[15].trim()));
	//Feat text: normal
	result.push(parseText(feat[16].trim()));
	//Feat text: note
	result.push(parseText(feat[17].trim()));
	//Feat text: goal
	result.push(parseText(feat[18].trim()));
	//Feat text: completion benefit
	result.push(parseText(feat[19].trim()));
	//Feat text: residual
	result.push(parseText(feat[20].trim()));
	//Feat text: special
	result.push(parseText(feat[21].trim()));
	//Feat text: suggested traits
	result.push(parseText(feat[22].trim()));
	//Feat text: combat trick
	result.push(parseText(feat[23].trim()));
	//Feat text: combat trick source
	result.push(Number(feat[24].trim()));
	//Feat text: combat trick page
	result.push(Number(feat[25].trim()));
	//Feat text: source
	result.push(Number(feat[26].trim()) - 1);
	//Feat text: detailed source
	result.push(Number(feat[27].trim()));
	//Feat text: source page
	result.push(Number(feat[28].trim()));
	return result;
}

function checkPrereq(feat) {
	if(feat[3].trim() != '' || feat[4].trim() != '' || feat[5].trim() != '' || feat[6].trim() != '' || feat[7].trim() != '' || feat[8].trim() != '' || feat[9].trim() != '' || feat[10].trim() != '' || feat[11].trim() != '') {
		return true;
	}
	else if(feat[26].trim() == '' && feat[27].trim() == '' && feat[28].trim() == '') {
		return true;
	}
	return false;
}

function checkText(feat) {
	if(feat[26].trim() != '' && feat[27].trim() != '' && feat[28].trim() != '') {
		return true;
	}
	return false;
}