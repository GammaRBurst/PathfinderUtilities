$(function() {
	//Initializing variables
	$('#tstamp').val(Date.now());
	var fields_number = 29;
	
	//Page construction
	readyPage();
	
	//List generation
	var url = window.location.href;
	if(url.indexOf('?') >= 0) {
		//Definition of the variables
		var params = url.split('?')[1].replace('#', '').split('&');
		var tl = 0;
		var filters = [false, false, false, false];
		var grey = false;
		var abilities = []; abilities.length = 6;
		var race = 0;
		var cl = []; cl.length = 40;
		var cas = []; cas.length = 3;
		var level = 0;
		var mtier = 0;
		var bab = 0;
		var sk = []; sk.length = 35;
		var type = [];
		var ntype = [];
		var source = [];
		var nsource = [];
		
		//Reading values
		for(var i = 0; i < params.length; i++) {
			var key = params[i].split('=')[0];
			var val = params[i].split('=')[1];
			//Tree or list
			if(key == 'tl') {
				tl = Number(val); //0 tree, 1 list
			}
			//Filters
			else if(key == 'f_as') {
				filters[0] = true;
			}
			else if(key == 'f_race') {
				filters[1] = true;
			}
			else if(key == 'f_cl') {
				filters[2] = true;
			}
			else if(key == 'f_sk') {
				filters[3] = true;
			}
			//Grey feats
			else if(key == 'grey') {
				grey = true;
			}
			//Ability scores
			else if(key == 'str') {
				abilities[0] = Number(val);
			}
			else if(key == 'dex') {
				abilities[1] = Number(val);
			}
			else if(key == 'con') {
				abilities[2] = Number(val);
			}
			else if(key == 'int') {
				abilities[3] = Number(val);
			}
			else if(key == 'wis') {
				abilities[4] = Number(val);
			}
			else if(key == 'cha') {
				abilities[5] = Number(val);
			}
			//Race
			else if(key == 'race') {
				race = Number(val);
			}
			//Class
			else if(key.slice(0, 3) == 'cl_') {
				cl[Number(key.slice(3)) - 1] = Number(val);
			}
			//Caster level
			else if(key.slice(0, 4) == 'cas_') {
				cas[Number(key.slice(4)) - 1] = Number(val);
			}
			//Level
			else if(key == 'level') {
				level = Number(val);
			}
			//Mythic rank
			else if(key == 'mtier') {
				mtier = Number(val);
			}
			//BAB
			else if(key == 'bab') {
				bab = Number(val);
			}
			//Skill
			else if(key.slice(0, 3) == 'sk_') {
				sk[Number(key.slice(3)) - 1] = Number(val);
			}
			//Type
			else if(key == 'type') {
				if(Number(val) < 0) {
					ntype.push(Number(val) * -1 - 1);
				}
				else {
					type.push(Number(val) - 1);
				}
			}
			//Source
			else if(key == 's') {
				if(Number(val) < 0) {
					nsource.push(Number(val) * -1 - 1);
				}
				else {
					source.push(Number(val) - 1);
				}
			}
		}
		
		//Setting values in fields
		//Tree or list
		$('input[name=tl][value=' + tl + ']').prop('checked', true);
		//Filters
		if(filters[0]) {
			$('input#f_as').prop('checked', true);
		}
		else {
			$('input#f_as').prop('checked', false);
		}
		if(filters[1]) {
			$('input#f_race').prop('checked', true);
		}
		else {
			$('input#f_race').prop('checked', false);
		}
		if(filters[2]) {
			$('input#f_cl').prop('checked', true);
		}
		else {
			$('input#f_cl').prop('checked', false);
		}
		if(filters[3]) {
			$('input#f_sk').prop('checked', true);
		}
		else {
			$('input#f_sk').prop('checked', false);
		}
		//Grey feats
		if(grey) {
			$('input#grey').prop('checked', true);
		}
		else {
			$('input#grey').prop('checked', false);
		}
		//Ability scores
		$('input#str').val(abilities[0]);
		$('input#dex').val(abilities[1]);
		$('input#con').val(abilities[2]);
		$('input#int').val(abilities[3]);
		$('input#wis').val(abilities[4]);
		$('input#cha').val(abilities[5]);
		//Race
		$('select#race').val(race);
		//Class
		for(var i = 0; i < cl.length; i++) {
			if(i < 9) {
				$('input#cl_0' + (i + 1)).val(cl[i]);
			}
			else {
				$('input#cl_' + (i + 1)).val(cl[i]);
			}
		}
		//Caster level
		for(var i = 0; i < cas.length; i++) {
			$('input#cas_' + (i + 1)).val(cas[i]);
		}
		//Level
		$('input#level').val(level);
		//Mythic rank
		$('mtier#level').val(mtier);
		//BAB
		$('input#bab').val(bab);
		//Skill
		for(var i = 0; i < sk.length; i++) {
			if(i < 9) {
				$('input#sk_0' + (i + 1)).val(sk[i]);
			}
			else {
				$('input#sk_' + (i + 1)).val(sk[i]);
			}
		}
		//Type
		$('input[name="type_uncheck"]').click();
		if(type.length < $('input[type="checkbox"][name="type"]').length) {
			for(var i = 0; i < type.length; i++) {
				if(type[i] < 9) {
					$('input#type_0' + (type[i] + 1)).prop('checked', true);
				}
				else {
					$('input#type_' + (type[i] + 1)).prop('checked', true);
				}
			}
		}
		else {
			type = [];
		}
		if(ntype.length < $('input[type="checkbox"][name="type"]').length) {
			for(var i = 0; i < ntype.length; i++) {
				if(ntype[i] < 9) {
					$('input#type_0' + (ntype[i] + 1)).prop('checked', true);
					$('input#type_0' + (ntype[i] + 1)).addClass('cbox_no');
					$('input#type_0' + (ntype[i] + 1)).val($('input#type_0' + (ntype[i] + 1)).val() * -1);
				}
				else {
					$('input#type_' + (ntype[i] + 1)).prop('checked', true);
					$('input#type_' + (ntype[i] + 1)).addClass('cbox_no');
					$('input#type_' + (ntype[i] + 1)).val($('input#type_' + (ntype[i] + 1)).val() * -1);
				}
			}
		}
		else {
			ntype = [];
		}
		//Source
		$('input[name="s_uncheck"]').click();
		if(source.length < $('input[type="checkbox"][name="s"]').length) {
			for(var i = 0; i < source.length; i++) {
				if(source[i] < 9) {
					$('input#s_0' + (source[i] + 1)).prop('checked', true);
				}
				else {
					$('input#s_' + (source[i] + 1)).prop('checked', true);
				}
			}
		}
		else {
			source = [];
		}
		if(nsource.length < $('input[type="checkbox"][name="s"]').length) {
			for(var i = 0; i < nsource.length; i++) {
				if(nsource[i] < 9) {
					$('input#s_0' + (nsource[i] + 1)).prop('checked', true);
					$('input#s_0' + (nsource[i] + 1)).addClass('cbox_no');
					$('input#s_0' + (nsource[i] + 1)).val($('input#s_0' + (nsource[i] + 1)).val() * -1);
				}
				else {
					$('input#s_' + (nsource[i] + 1)).prop('checked', true);
					$('input#s_' + (nsource[i] + 1)).addClass('cbox_no');
					$('input#s_' + (nsource[i] + 1)).val($('input#s_' + (nsource[i] + 1)).val() * -1);
				}
			}
		}
		else {
			nsource = [];
		}
		
		//Working on feats file
		var feats2 = [];
		while(feats1.length > 0) {
			i = feats1.length - 1;
			if(feats1[i].trim() == '' || feats1[i].trim().indexOf('#') == 0) { //Removing comments and empty lines
				feats1.splice(i, 1);
				continue;
			}
			else {
				feats1[i] = feats1[i].split('|');
				if(feats1[i].length != fields_number) {
					if(debug) { //DEBUG: wrong length
						debugmsg('Wrong number of fields (' + feats1[i].length + '): ' + feats1[i]);
					}
					feats1.splice(i, 1);
					continue;
				}
				feats2.unshift([]); //Adds new element at the beginning of the array, to preserve the same order as feats1
				//ID
				feats2[0].push(Number(feats1[i][0].trim()));
				//Name
				feats2[0].push([adaptName(parseText(feats1[i][1].trim(), false)), feats1[i][1].trim().replace('´´´', '')]);
				//Type
				feats2[0].push(feats1[i][2].trim().split(';'));
				for(var j = 0; j < feats2[0][2].length; j++) {
					feats2[0][2][j] = Number(feats2[0][2][j].trim());
				}
				//Prerequisites
				feats2[0].push([]);
				feats2[0][3].push(storePrereq(feats1[i]));
				//Introductory text
				feats2[0].push(parseText(feats1[i][12].trim()));
				//Feat text
				feats2[0].push([]);
				feats2[0][5].push(storeText(feats1[i]));
				//Grey feat
				feats2[0].push(false);
				feats1.splice(i, 1);
				i -= 1;
				while(Number(feats1[i].split('|')[0].trim()) == feats2[0][0]) { //Checking for alternative prerequisites and feat texts
					feats1[i] = feats1[i].split('|');
					if(checkPrereq(feats1[i])) {
						feats2[0][3].push(storePrereq(feats1[i]));
					}
					if(checkText(feats1[i])) {
						feats2[0][5].push(storeText(feats1[i]));
					}
					feats1.splice(i, 1);
					i -= 1;
				}
			}
		}
		feat_count = feats2.length;
		if(debug) { //DEBUG: double feat
			for(var i = 0; i < feats2.length; i++) {
				for(var j = i + 1; j < feats2.length; j++) {
					if(feats2[i][1][1] == feats2[j][1][1] && feats2[i][2].indexOf(24) == -1 && feats2[j][2].indexOf(24) == -1) { //Mythic feats can have the same name
						debugmsg('Double feat: ' + feats2[i][1][0] + ', IDs: ' + feats2[i][0] + ', ' + feats2[j][0]);
						debugmsg(feats2[i]);
						debugmsg(feats2[j]);
					}
				}
			}
		}
		//Filtering
		if(filters[0] || filters[1] || filters[2] || filters[3] || nsource.length > 0 || source.length > 0 || ntype.length > 0 || type.length > 0) {
			for(var i = feats2.length - 1; i >= 0; i--) {
				//First filter set: all filters that remove invalid feats
				//Sources
				if(nsource.length > 0) {
					var nsource_found = true;
					for(var j = 0; j < feats2[i][5].length; j++) {
						if(nsource.indexOf(feats2[i][5][j][13]) == -1) { //If at least one source is not excluded, the feat is permitted
							nsource_found = false;
							break;
						}
					}
					if(nsource_found) {
						feats2.splice(i, 1);
						continue;
					}
				}
				if(source.length > 0) {
					var source_found = false;
					for(var j = 0; j < feats2[i][5].length; j++) {
						if(source.indexOf(feats2[i][5][j][13]) >= 0) { //If at least one source is permitted, the feat is permitted
							source_found = true;
							break;
						}
					}
					if(!source_found) {
						feats2.splice(i, 1);
						continue;
					}
				}
				//Types
				if(ntype.length > 0) {
					var ntype_found = false;
					for(var j = 0; j < feats2[i][2].length; j++) {
						if(ntype.indexOf(feats2[i][2][j]) >= 0) {
							ntype_found = true;
							break;
						}
					}
					if(ntype_found) {
						feats2.splice(i, 1);
						continue;
					}
				}
				if(type.length > 0) {
					var type_found = false;
					for(var j = 0; j < feats2[i][2].length; j++) {
						if(type.indexOf(feats2[i][2][j]) >= 0) {
							type_found = true;
							break;
						}
					}
					if(!type_found) {
						feats2.splice(i, 1);
						continue;
					}
				}
				//Races
				if(filters[1]) {
					var race_test1 = false;
					for(var j = 0; j < feats2[i][3].length; j++) { //One of these condition blocks must be true
						var race_test2 = false;
						for(var k = 0; k < feats2[i][3][j][2].length; k++) { //One of these conditions must be true
							if(feats2[i][3][j][2][k] == race || feats2[i][3][j][2][k] == 0) {
								race_test2 = true;
								break;
							}
						}
						if(race_test2) {
							race_test1 = true;
							break;
						}
					}
					if(!race_test1) {
						feats2.splice(i, 1);
						continue;
					}
				}
				//Second filter set: all filters that grey out invalid feats
				var block_test = false;
				for(var j = 0; j < feats2[i][3].length; j++) { //One of these condition blocks must be true
					var ab_test1 = true;
					//Ability scores
					if(filters[0] && feats2[i][3][j][0].length > 0) {
						ab_test1 = false;
						for(var k = 0; k < feats2[i][3][j][0].length; k++) { //One of these condition blocks must be true
							var ab_test2 = true;
							for(var l = 0; l < feats2[i][3][j][0][k].length; l++) { //All of these conditions must be true
								var score = Number(feats2[i][3][j][0][k][l].split(':')[0]) - 1;
								var min_val = Number(feats2[i][3][j][0][k][l].split(':')[1]);
								if(abilities[score] < min_val) {
									ab_test2 = false;
									break;
								}
							}
							if(ab_test2) {
								ab_test1 = true;
								break;
							}
						}
					}
					if(!ab_test1) {
						continue;
					}
					var level_test = true;
					var mythic_test = true;
					var cl_test1 = true;
					var bab_test = true;
					var cas_test1 = true;
					if(filters[2]) {
						//Levels
						level_test = false;
						if((level == 0) || (feats2[i][3][j][3] > 0 && feats2[i][3][j][3] > level) || (feats2[i][3][j][3] < 0 && -feats2[i][3][j][3] < level)) { //Any level, minimum level, maximum level
							level_test = true;
						}
						if(!level_test) {
							continue;
						}
						//Mythic tier
						mythic_test = false;
						if((mtier == 0) || (feats2[i][3][j][4] > 0 && feats2[i][3][j][4] > mtier) || (feats2[i][3][j][4] < 0 && -feats2[i][3][j][4] < mtier)) { //Any tier, minimum tier, maximum tier
							mythic_test = true;
						}
						if(!mythic_test) {
							continue;
						}
						//Classes
						if(feats2[i][3][j][5].length > 0) {
							cl_test1 = false;
							for(var k = 0; k < feats2[i][3][j][5].length; k++) { //One of these condition blocks must be true
								var cl_test2 = true;
								for(var l = 0; l < feats2[i][3][j][5][k].length; l++) { //All of these conditions must be true
									var cl_id = Number(feats2[i][3][j][5][k][l].split(':')[0]) - 1;
									var min_val = Number(feats2[i][3][j][5][k][l].split(':')[1]);
									if(cl[cl_id] < min_val) {
										cl_test2 = false;
										break;
									}
								}
								if(cl_test2) {
									cl_test1 = true;
									break;
								}
							}
						}
						if(!cl_test1) {
							continue;
						}
						//BAB
						bab_test = false;
						if(feats2[i][3][j][6] <= bab) {
							bab_test = true;
						}
						if(!bab_test) {
							continue;
						}
						//Caster levels
						if(feats2[i][3][j][7].length > 0) {
							cas_test1 = false;
							for(var k = 0; k < feats2[i][3][j][7].length; k++) { //One of these condition blocks must be true
								var cas_test2 = true;
								for(var l = 0; l < feats2[i][3][j][7][k].length; l++) { //All of these conditions must be true
									var cas_id = Number(feats2[i][3][j][7][k][l].split(':')[0]) - 1;
									var min_val = Number(feats2[i][3][j][7][k][l].split(':')[1]);
									if(cas_id == -1) { 
										if(Math.max(...cas) < min_val) {
											cas_test2 = false;
											break;
										}
									}
									else {
										if(cas[cas_id] < min_val) {
											cas_test2 = false;
											break;
										}
									}
								}
								if(cas_test2) {
									cas_test1 = true;
									break;
								}
							}
						}
						if(!cas_test1) {
							continue;
						}
					}
					//Skills
					var sk_test1 = true;
					if(filters[3] && feats2[i][3][j][8].length > 0) {
						sk_test1 = false;
						for(var k = 0; k < feats2[i][3][j][8].length; k++) { //One of these condition blocks must be true
							var sk_test2 = true;
							for(var l = 0; l < feats2[i][3][j][8][k].length; l++) { //All of these conditions must be true
								var sk_id = Number(feats2[i][3][j][8][k][l].split(':')[0]) - 1;
								var min_val = Number(feats2[i][3][j][8][k][l].split(':')[1]);
								if(sk[sk_id] < min_val) {
									sk_test2 = false;
									break;
								}
							}
							if(sk_test2) {
								sk_test1 = true;
								break;
							}
						}
					}
					if(!sk_test1) {
						continue;
					}
					if(ab_test1 && level_test && mythic_test && cl_test1 && bab_test && cas_test1 && sk_test1) {
						block_test = true;
						break;
					}
				}
				if(!block_test) {
					if(grey) {
						feats2[i][6] = true;
					}
					else {
						feats2.splice(i, 1);
					}
					continue;
				}
			}
		}
		//Greying feats down the tree branches
		if(grey) {
			var ids = [];
			for(var i = 0; i < feats2.length; i++) {
				ids.push(feats2[i][0]);
			}
			var changes = true;
			while(changes) {
				changes = false;
				for(var i = 0; i < feats2.length; i++) {
					for(var j = 0; j < feats2[i][3].length; j++) {
						if(feats2[i][3][j][1].length > 0 && !feats2[i][6]) {
							for(var k = 0; k < feats2[i][3][j][1].length; k++) {
								if(ids.indexOf(feats2[i][3][j][1][k]) == -1 || feats2[ids.indexOf(feats2[i][3][j][1][k])][6]) {
									feats2[i][6] = true;
									changes = true;
									break;
								}
							}
						}
					}
				}
			}
		}
		//Creating list
		$('#feats_list').append('<div class="tbody"><div class="trow ttop"><div class="tfeat bold center">Feat</div><div class="ttype bold center">Type</div><div class="tpre bold center">Prerequisites</div><div class="tdesc bold center">Description</div><div class="tsource bold center">Source</div></div></div>');
		//Sorting
		for(var i = 0; i < feats2.length; i++) {
			for(var j = 0; j < feats2.length - 1; j++) {
				if(feats2[j][1][1] > feats2[j + 1][1][1]) {
					var tmp = feats2[j];
					feats2[j] = feats2[j + 1];
					feats2[j + 1] = tmp;
				}
			}
		}
		//Filling table
		if(tl == 0) { //Tree
			function findDepFeats(id) {
				var result = [];
				for(var i = 0; i < feats2.length; i++) {
					for(var j = 0; j < feats2[i][3].length; j++) {
						if(feats2[i][3][j][1].indexOf(id) >= 0) {
							result.push(i);
							break;
						}
					}
				}
				if(result.length == 0) {
					return false;
				}
				return result;
			}
			function writeDepFeats(id, comp_id, indent, dep_ids, target, arrows = '') { //Recursive function to create the correct indentation
				if(dep_ids) {
					for(var i = 0; i < dep_ids.length; i++) {
						var arrows_temp = arrows + (i == dep_ids.length - 1 ? '1' : '0');
						$('#' + target).append('<div class="tbody" id="row-feat-' + comp_id + '-' + feats2[dep_ids[i]][0] + '"><div class="trow"><div class="tdel" id="del-feat-' + comp_id + '-' + feats2[dep_ids[i]][0] + '">&times;</div><div class="tfeat' + (feats2[dep_ids[i]][6] ? ' greyed' : '') + '" style="padding-left: ' + indent + 'em" arrows="' + arrows_temp + '">' + feats2[dep_ids[i]][1][0] + '</div><div class="ttype">' + genTypes(feats2[dep_ids[i]][2]) + '</div><div class="tpre">' + (feats2[dep_ids[i]][5][0][1] == '' ? '-' : feats2[dep_ids[i]][5][0][1]) + '</div><div class="tdesc">' + feats2[dep_ids[i]][4] + '</div><div class="tsource">' + genSources(feats2[dep_ids[i]]) + '</div></div></div>');
						if(feats2[dep_ids[i]][2].indexOf(24) >= 0) {
							$('#row-feat-' + comp_id + '-' + feats2[dep_ids[i]][0] + ' .tdel').addClass('mythic');
							$('#row-feat-' + comp_id + '-' + feats2[dep_ids[i]][0] + ' .tfeat').addClass('mythic');
						}
						$('#' + target).append('<div class="tbody tcont thidden" id="content-feat-' + comp_id + '-' + feats2[dep_ids[i]][0] + '"><div class="trow"><div class="tcompl">' + prepareFeat([comp_id + '-' + feats2[dep_ids[i]][0]].concat(feats2[dep_ids[i]].slice(1))) + '</div></div></div>');
						writeDepFeats(feats2[dep_ids[i]][0], comp_id + '-' + feats2[dep_ids[i]][0], indent + 1, findDepFeats(feats2[dep_ids[i]][0]), target, arrows_temp);
					}
				}
			}
			var dependents = false;
			for(var i = 0; i < feats2.length; i++) { //Base indentation, feats with no feat dependency
				var feat_test = false;
				for(var j = 0; j < feats2[i][3].length; j++) {
					if(feats2[i][3][j][1].length > 0) {
						if(nsource.length > 0 || source.length > 0 || ntype.length > 0 || type.length > 0) {
							for(var k = 0; k < feats2.length; k++) {
								for(var l = 0; l < feats2[i][3][j][1].length; l++) {
									if(feats2[k][0] == feats2[i][3][j][1][l]) {
										feat_test = true;
										break;
									}
								}
								if(feat_test) {
									break;
								}
							}
							if(feat_test) {
								break;
							}
						}
						else {
							feat_test = true;
							break;
						}
					}
				}
				if(!feat_test) { //No dependency on other feats
					var depFeats = findDepFeats(feats2[i][0]);
					var target = 'feats_list';
					if(depFeats && $('.tbody').length > 2) { //Header + first row
						dependents = true;
						target = 'branch-feat-' + feats2[i][0];
						$('#feats_list').append('<div class="tbranch" id="' + target + '"></div>');
						$('#' + target).append('<div class="tbody bigborder"></div>');
					}
					$('#' + target).append('<div class="tbody" id="row-feat-' + feats2[i][0] + '"><div class="trow"><div class="tdel' + (depFeats ? ' basebranch' : '') + '" id="del-feat-' + feats2[i][0] + '">&times;</div><div class="tfeat' + (feats2[i][6] ? ' greyed">' : '">') + feats2[i][1][0] + '</div><div class="ttype">' + genTypes(feats2[i][2]) + '</div><div class="tpre">' + (feats2[i][5][0][1] == '' ? '-' : feats2[i][5][0][1]) + '</div><div class="tdesc">' + feats2[i][4] + '</div><div class="tsource">' + genSources(feats2[i]) + '</div></div></div>');
					$('#' + target).append('<div class="tbody tcont thidden" id="content-feat-' + feats2[i][0] + '"><div class="trow"><div class="tcompl">' + prepareFeat(feats2[i]) + '</div></div></div>');
					if(feats2[i][2].indexOf(24) >= 0) {
						$('#row-feat-' + feats2[i][0] + ' .tdel').addClass('mythic');
						$('#row-feat-' + feats2[i][0] + ' .tfeat').addClass('mythic');
					}
					writeDepFeats(feats2[i][0], feats2[i][0], 1, depFeats, target);
					if(dependents) {
						dependents = false;
						$('#' + target).append('<div class="tbody bigborder"></div>');
					}
				}
			}
		}
		else { //List
			for(var i = 0; i < feats2.length; i++) {
				$('#feats_list').append('<div class="tbody" id="row-feat-' + feats2[i][0] + '"><div class="trow"><div class="tdel' + (depFeats ? ' basebranch' : '') + '" id="del-feat-' + feats2[i][0] + '">&times;</div><div class="tfeat' + (feats2[i][6] ? ' greyed">' : '">') + feats2[i][1][0] + '</div><div class="ttype">' + genTypes(feats2[i][2]) + '</div><div class="tpre">' + (feats2[i][5][0][1] == '' ? '-' : feats2[i][5][0][1]) + '</div><div class="tdesc">' + feats2[i][4] + '</div><div class="tsource">' + genSources(feats2[i]) + '</div></div></div>');
				if(feats2[i][2].indexOf(24) >= 0) {
					$('#row-feat-' + feats2[i][0] + ' .tdel').addClass('mythic');
					$('#row-feat-' + feats2[i][0] + ' .tfeat').addClass('mythic');
				}
				$('#feats_list').append('<div class="tbody thidden" id="content-feat-' + feats2[i][0] + '"><div class="trow"><div class="tcompl">' + prepareFeat(feats2[i]) + '</div></div></div>');
			}
		}
		$('.tfeat:not(.bold)').click(function() { //Open feat page
			var id = $(this).parent().parent().prop('id').slice(4);
			$('#content-' + id).removeClass('thidden');
			$('#row-' + id).addClass('thidden');
		});
		$('.close').click(function() { //Close feat page
			var id = $(this).prop('id').slice(6);
			$('#content-' + id).addClass('thidden');
			$('#row-' + id).removeClass('thidden');
		});
		$('p:empty').remove(); //Cleaning empty p tags created when inserting tables
		$('.tfeat[arrows]').each(function() { //Adding dotted lines to better show dependencies
			var arrows = $(this).attr('arrows').trim();
			for(var i = 0; i < arrows.length; i++) {
				if(arrows[i] == '0') {
					if(i == arrows.length - 1) {
						$(this).prepend('<div class="dotvline" style="left: ' + i + 'em"></div>');
						$(this).prepend('<div class="dothline" style="left: ' + i + 'em"></div>');
					}
					else {
						$(this).prepend('<div class="dotvline" style="left: ' + i + 'em"></div>');
					}
				}
				else {
					if(i == arrows.length - 1) {
						$(this).prepend('<div class="dotangle" style="left: ' + i + 'em"></div>');
					}
				}
			}
		});
		$('.tdel').click(function() {
			var base_id = $(this).attr('id').replace('del-', '');
			if($('.restore').length == 0) {
				$('#show_removed').show();
			}
			if($(this).hasClass('basebranch')) {
				$('#content-' + base_id).addClass('thidden');
				$('[id^=row-' + base_id + '-]').removeClass('thidden');
				$('[id^=content-' + base_id + '-]').addClass('thidden');
				$('#branch-' + base_id).addClass('thidden');
			}
			else {
				$('#row-' + base_id).addClass('thidden');
				$('#content-' + base_id).addClass('thidden');
				$('[id^=row-' + base_id + '-]').addClass('thidden');
				$('[id^=content-' + base_id + '-]').addClass('thidden');
			}
			$('#removed').append('<div class="restore" target="' + base_id + '">' + $(this).next().text() + ($('[id^=row-' + base_id + '-]').length > 0 ? ' (+' + $('[id^=row-' + base_id + '-]').length + ')' : '') + '</div>');
			$('.restore[target^=' + base_id + '-]').remove(); //Deleting dependencies
			$('.restore[target=' + base_id + ']').click(function() {
				var base_id = $(this).attr('target');
				if($('#branch-' + base_id).length > 0) {
					$('#branch-' + base_id).removeClass('thidden');
				}
				else {
					$('#row-' + base_id).removeClass('thidden');
					$('[id^=row-' + base_id + '-]').removeClass('thidden');
				}
				$(this).remove();
				if($('.restore').length == 0) {
					$('#hide_removed').click();
					$('#show_removed').hide();
				}
			});
		});
	}
});