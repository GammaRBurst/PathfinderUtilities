function parseLink(name, subtypes, variant) {
	if(name.indexOf('[') >= 0) {
		if(name.indexOf('|') >= 0) {
			if(name.indexOf('/') >= 0) {
				var singular = name.split('|')[0] + '/' + name.split('/')[1];
			}
			else if(name.indexOf('~') >= 0) {
				var singular = name.split('|')[0] + '~' + name.split('~')[1];
			}
			else {
				var singular = name.split('|')[0] + ']' + name.split(']')[1];
			}
		}
		else {
			var singular = name;
		}
		if(name.indexOf(']') == name.length - 1) {
			if(name.indexOf('/') >= 0) {
				if(name.indexOf('~') >= 0) {
					var plural = name.split('[')[0] + '[' + genPlural(name.split('[')[1].split('/')[0]) + '/' + name.split('/')[1];
				}
				else {
					var plural = name.split('[')[0] + '[' + genPlural(name.split('[')[1].split('/')[0]) + '/' + name.split('/')[1].split(']')[0] + '~' + name.split('[')[1].split('|')[0].split('/')[0] + ' (' + name.split('/')[1].split(']')[0] + ')' + ']';
				}
			}
			else if(name.indexOf('~') >= 0) {
				var plural = name.split('[')[0] + '[' + genPlural(name.split('[')[1].split('~')[0]) + '~' + name.split('~')[1];
			}
			else {
				var plural = name.split('[')[0] + '[' + genPlural(name.split('[')[1].split(']')[0]) + '~' + name.split('[')[1].split(']')[0].split('|')[0] + ']';
			}
		}
		else { //Plural of the last word, every other information about plural is discarded
			var plural = singular.split(' ');
			plural[plural.length - 1] = genPlural(plural[plural.length - 1]);
			plural = plural.join(' ');
		}
		singular = singular.split('[');
		plural = plural.split('[');
		for(var j = 0; j < singular.length; j++) {
			if(singular[j].indexOf(']') >= 0) {
				singular[j] = genLink(singular[j], subtypes);
			}
			if(plural[j].indexOf(']') >= 0) {
				plural[j] = genLink(plural[j], subtypes);
			}
		}
		singular = singular.join('');
		plural = plural.join('');
	}
	else {
		if(variant != '') { //Variant creatures
			if(name.indexOf('|') >= 0) {
				if(name.split('|')[1].indexOf('/') >= 0) {
					var singular = name.split('|')[0] + ' (' + name.split('/')[1] + ')';
					var plural = genPlural(name.split('/')[0]) + ' (' + name.split('/')[1] + ')';
				}
				else {
					var singular = name.split('|')[0];
					var plural = genPlural(name);
				}
			}
			else if(name.indexOf('/') >= 0) {
				var singular = name.split('/')[0] + ' (' + name.split('/')[1] + ')';
				var plural = genPlural(name.split('/')[0]) + ' (' + name.split('/')[1] + ')';
			}
			else {
				var singular = name;
				var plural = genPlural(name);
			}
		}
		else {
			if(name.indexOf('|') >= 0) {
				if(name.indexOf('/') >= 0) {
					var singular = name.split('|')[0] + '/' + name.split('/')[1];
					if(name.indexOf('~') >= 0) {
						var plural = genPlural(name.split('/')[0]) + '/' + name.split('/')[1];
					}
					else {
						var plural = genPlural(name.split('/')[0]) + '/' + name.split('/')[1] + '~' + name.split('|')[0] + ' (' + name.split('/')[1] + ')';
					}
				}
				else if(name.indexOf('~') >= 0) {
					var singular = name.split('|')[0] + '~' + name.split('~')[1];
					var plural = genPlural(name.split('~')[0]) + '~' + name.split('~')[1];
				}
				else {
					var singular = name.split('|')[0];
					var plural = genPlural(name) + '~' + name.split('|')[0];
				}
			}
			else if(name.indexOf('/') >= 0) {
				var singular = name;
				if(name.indexOf('~') >= 0) {
					var plural = genPlural(name.split('/')[0]) + '/' + name.split('/')[1];
				}
				else {
					var plural = genPlural(name.split('/')[0]) + '/' + name.split('/')[1] + '~' + name.split('/')[0] + ' (' + name.split('/')[1] + ')';
				}
			}
			else if(name.indexOf('~') >= 0) {
				var singular = name;
				var plural = genPlural(name.split('~')[0]) + '~' + name.split('~')[1];
			}
			else {
				var singular = name;
				var plural = genPlural(name) + '~' + name
			}
			singular = genLink(singular, subtypes);
			plural = genLink(plural, subtypes);
		}
	}
	return [singular, plural];
}

function genLink(name, subtypes) {
	var base_link_normal = 'https://www.aonprd.com/MonsterDisplay.aspx?ItemName=';
	var base_link_mythic = 'https://www.aonprd.com/MythicMonsterDisplay.aspx?ItemName=';
	var base_link_template = 'https://www.aonprd.com/MonsterTemplates.aspx?ItemName=';
	
	if(name.indexOf('~http://') >= 0 || name.indexOf('~https://') >= 0) { //Custom link
		if(subtypes.indexOf(-1) >= 0) {
			return '[' + name + ']';
		}
		if(name.indexOf(']') >= 0) {
			var aftername = name.split(']')[1];
			name = name.split(']')[0];
		}
		else {
			var aftername = '';
		}
		var link = name.split('~')[1];
		name = name.split('~')[0];
		if(name.indexOf('/') >= 0) {
			aftername = ' (' + name.split('/')[1] + ')' + aftername;
			name = name.split('/')[0];
		}
		return '<a target="_blank" href="' + link + '">' + name + '</a>' + aftername;
	}
	else if(subtypes.indexOf(-1) >= 0) { //Templates
		if(name.indexOf('~') >= 0) {
			var link = name.split('~')[1].trim();
			if(link == '') {
				return '[' + name + ']';
			}
			else {
				return '[' + name.split('~')[0] + '~' + base_link_template + adaptName(link) + ']';
			}
		}
		else {
			return '[' + name + '~' + base_link_template + adaptName(name) + ']';
		}
	}
	else { //Regular link to AoN
		if(name.indexOf(']') >= 0) { //Link + other text
			var aftername = name.split(']')[1];
			name = name.split(']')[0];
		}
		else {
			var aftername = '';
		}
		if(name.indexOf('/') >= 0) {
			if(name.indexOf('~') >= 0) {
				aftername = ' (' + name.split('~')[0].split('/')[1] + ')' + aftername;
				var link = name.split('~')[1].trim();
				name = name.split('/')[0];
			}
			else {
				aftername = ' (' + name.split('/')[1] + ')' + aftername;
				var link = name.split('/')[0] + ' (' + name.split('/')[1] + ')';
				name = name.split('/')[0];
			}
		}
		else if(name.indexOf('~') >= 0) {
			var link = name.split('~')[1];
			name = name.split('~')[0];
		}
		else {
			var link = name;
		}
		if(name.slice(0, 1) == '+') {
			name = name.slice(1);
		}
		if(link == '') { //Forced no link
			return name + aftername;
		}
		if((subtypes.indexOf(sub_mythic) >= 0 && link.indexOf('+') != 0 && link.indexOf('*+') != 0) || (subtypes.indexOf(sub_mythic) == -1 && (link.indexOf('+') == 0 || link.indexOf('*+') == 0))) {
			return '<a target="_blank" href="' + base_link_mythic + adaptName(link) + '">' + name + '</a>' + aftername;
		}
		else {
			return '<a target="_blank" href="' + base_link_normal + adaptName(link) + '">' + name + '</a>' + aftername;
		}
	}
}

function cleanLink(name) {
	var temp_name = name.split('[');
	for(var j = 0; j < temp_name.length; j++) {
		if(temp_name[j].indexOf(']') >= 0) {
			if(temp_name[j].split(']')[0].indexOf('~') >= 0) {
				temp_name[j] = temp_name[j].split('~')[0] + temp_name[j].split(']')[1];
			}
			else {
				temp_name[j] = temp_name[j].replace(']', '');
			}
		}
		if(temp_name[j].indexOf('~') >= 0) {
			temp_name[j] = temp_name[j].split('~')[0];
		}
	}
	return temp_name.join('');
}

function adaptName(name, aftername = '') {
	if(name.slice(0, 1) == '*') {
		if(name.slice(1, 2) == '+') {
			name = name.slice(2);
		}
		else {
			name = name.slice(1);
		}
	}
	else {
		if(name.slice(0, 1) == '+') {
			name = name.slice(1);
		}
		name = name.split(' ');
		for(var i = 0; i < name.length; i++) {
			name[i] = name[i].split('-');
			for(var j = 0; j < name[i].length; j++) {
				if(name[i][j].slice(0, 1) == '(') {
					name[i][j] = name[i][j].slice(0, 1) + name[i][j].slice(1, 2).toUpperCase() + name[i][j].slice(2).toLowerCase();
				}
				else {
					name[i][j] = name[i][j].slice(0, 1).toUpperCase() + name[i][j].slice(1).toLowerCase();
				}
			}
			name[i] = name[i].join('-');
		}
		name = name.join(' ');
	}
	if(aftername != '') {
		name += ' (' + aftername.slice(2, 3).toUpperCase() + aftername.slice(3).toLowerCase();
	}
	return name;
}

function genPlural(name) {
	if(name.indexOf('|') >= 0) {
		if(name.split('|')[1].length > 0 && name.split('|')[1].slice(0, 1) == '-') {
			return name.split('|')[0] + name.split('|')[1].slice(1);
		}
		else {
			return name.split('|')[1];
		}
	}
	else {
		if(name.slice(-1) == 's' || name.slice(-1) == 'x' || name.slice(-2) == 'ch') {
			return name + 'es';
		}
		else if(name.slice(-1) == 'y') {
			return name.slice(0, -1) + 'ies';
		}
		else if(name.slice(-3) == 'man' && !(name.slice(-5) == 'human')) {
			return name.slice(0, -3) + 'men';
		}
		else {
			return name + 's';
		}
	}
}