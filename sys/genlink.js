function genLink(name, subtypes) {
	var base_link_normal = 'https://www.aonprd.com/MonsterDisplay.aspx?ItemName=';
	var base_link_mythic = 'https://www.aonprd.com/MythicMonsterDisplay.aspx?ItemName=';
	var mythic_subtype = 48;
	
	if(name.indexOf(']') >= 0) { //Link + other text
		var aftername = name.split(']')[1];
		name = name.split(']')[0];
	}
	else if(name.indexOf('/') >= 0 && name.indexOf('https://') == -1) {
		if(name.indexOf('\\') >= 0) {
			var aftername = ' (' + name.split('\\')[0].split('/')[1] + ')';
			name = name.split('/')[0] + '\\' + name.split('\\')[1];
		}
		else {
			var aftername = ' (' + name.split('/')[1] + ')';
			name = name.split('/')[0];
		}
	}
	else {
		var aftername = '';
	}
	if(name.indexOf('\\') >= 0) {
		if((subtypes.indexOf(mythic_subtype) >= 0 && name.split('\\')[1].slice(0, 1) != '+') || (subtypes.indexOf(mythic_subtype) == -1 && name.split('\\')[1].slice(0, 1) == '+')) {
			return '<a target="_blank" href="' + base_link_mythic + adaptName(name.split('\\')[1]) + '">' + name.split('\\')[0] + '</a>' + aftername;
		}
		else {
			return '<a target="_blank" href="' + base_link_normal + adaptName(name.split('\\')[1]) + '">' + name.split('\\')[0] + '</a>' + aftername;
		}
	}
	else {
		if((subtypes.indexOf(mythic_subtype) >= 0 && name.slice(0, 1) != '+') || (subtypes.indexOf(mythic_subtype) == -1 && name.slice(0, 1) == '+')) {
			if(name.slice(0, 1) == '+') {
				name = name.slice(1);
			}
			return '<a target="_blank" href="' + base_link_mythic + adaptName(name) + '">' + name + '</a>' + aftername;
		}
		else {
			if(name.slice(0, 1) == '+') {
				name = name.slice(1);
			}
			return '<a target="_blank" href="' + base_link_normal + adaptName(name) + '">' + name + '</a>' + aftername;
		}
	}
}

function cleanLink(name) {
	var temp_name = name.split('[');
	for(var j = 0; j < temp_name.length; j++) {
		if(temp_name[j].indexOf(']') >= 0) {
			if(temp_name[j].split(']')[0].indexOf('\\') >= 0) {
				temp_name[j] = temp_name[j].split('\\')[0] + temp_name[j].split(']')[1];
			}
			else {
				temp_name[j] = temp_name[j].replace(']', '');
			}
		}
		if(temp_name[j].slice(0, 1) == '+') {
			temp_name[j] = temp_name[j].slice(1);
		}
	}
	return temp_name.join('');
}

function adaptName(name) {
	if(name.slice(0, 1) == '*') {
		if(name.slice(1, 2) == '+') {
			return name.slice(2);
		}
		else {
			return name.slice(1);
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
		return name.join(' ');
	}
}

function plural(name) {
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