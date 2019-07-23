$(function() {
	//Initializing variables
	$('#tstamp').val(Date.now());
	var fields_number = 22;

	//Page construction
	readyPage(values, sizes);

	//Table generation
	var url = window.location.href;
	if(url.indexOf('?') >= 0) {
		var params = url.split('?')[1].replace('#', '').split('&');
		var cr = []; cr.length = 2;
		var mr = []; mr.length = 2;
		var alignment = [];
		var nalignment = [];
		var size = []; size.length = 2;
		var type = [];
		var ntype = [];
		var subtype = [];
		var nsubtype = [];
		var group = [];
		var ngroup = [];
		var hd = []; hd.length = 2;
		var speed = [];
		var nspeed = [];
		var abilities = []; abilities.length = 12;
		var environment = [];
		var nenvironment = [];
		var climate = [];
		var nclimate = [];
		var planes = [];
		var nplanes = [];
		var source = [];
		var nsource = [];
		var logic = []; logic.length = 5;
		var simple_list = false;
		var links = false;
		var add_variants = 0;
		var add_mixed = 0;
		var add_unique = 0;
		var maxcreatures = 0;
		var maxdice = 0;
		var amount = []; amount.length = 2;
		var cr_comb = []; cr_comb.length = 2;
		var sort = 0;

		//Reading values
		for(var i = 0; i < params.length; i++) {
			var key = params[i].split('=')[0];
			var val = params[i].split('=')[1];
			//CR
			if(key == 'cr_min') {
				cr[0] = Number(val);
			}
			else if(key == 'cr_max') {
				cr[1] = Number(val);
			}
			//MR
			else if(key == 'mr_min') {
				mr[0] = Number(val);
			}
			else if(key == 'mr_max') {
				mr[1] = Number(val);
			}
			//Alignment
			else if(key == 'al') {
				if(Number(val) < 0) {
					nalignment.push(Number(val) * -1);
				}
				else {
					alignment.push(Number(val));
				}
			}
			//Size
			else if(key == 'size_min') {
				size[0] = Number(val);
			}
			else if(key == 'size_max') {
				size[1] = Number(val);
			}
			//Type
			else if(key == 'type') {
				if(Number(val) < 0) {
					ntype.push(Number(val) * -1);
				}
				else {
					type.push(Number(val));
				}
			}
			//Subtype
			else if(key == 'st') {
				if(Number(val) < 0) {
					nsubtype.push(Number(val) * -1);
				}
				else {
					subtype.push(Number(val));
				}
			}
			//Group
			else if(key == 'gr') {
				if(Number(val) < 0) {
					ngroup.push(Number(val) * -1);
				}
				else {
					group.push(Number(val));
				}
			}
			//HD
			else if(key == 'hd_min') {
				hd[0] = Number(val);
			}
			else if(key == 'hd_max') {
				hd[1] = Number(val);
			}
			//Speed
			else if(key == 'sp') {
				if(Number(val) < 0) {
					nspeed.push(Number(val) * -1);
				}
				else {
					speed.push(Number(val));
				}
			}
			//Ability scores
			else if(key == 'str_min') {
				abilities[0] = Number(val);
			}
			else if(key == 'str_max') {
				abilities[1] = Number(val);
			}
			else if(key == 'dex_min') {
				abilities[2] = Number(val);
			}
			else if(key == 'dex_max') {
				abilities[3] = Number(val);
			}
			else if(key == 'con_min') {
				abilities[4] = Number(val);
			}
			else if(key == 'con_max') {
				abilities[5] = Number(val);
			}
			else if(key == 'int_min') {
				abilities[6] = Number(val);
			}
			else if(key == 'int_max') {
				abilities[7] = Number(val);
			}
			else if(key == 'wis_min') {
				abilities[8] = Number(val);
			}
			else if(key == 'wis_max') {
				abilities[9] = Number(val);
			}
			else if(key == 'cha_min') {
				abilities[10] = Number(val);
			}
			else if(key == 'cha_max') {
				abilities[11] = Number(val);
			}
			//Environment
			else if(key == 'env') {
				if(Number(val) < 0) {
					nenvironment.push(Number(val) * -1);
				}
				else {
					environment.push(Number(val));
				}
			}
			//Climate
			else if(key == 'cl') {
				if(Number(val) < 0) {
					nclimate.push(Number(val) * -1);
				}
				else {
					climate.push(Number(val));
				}
			}
			//Plane
			else if(key == 'pl') {
				if(Number(val) < 0) {
					nplanes.push(Number(val) * -1);
				}
				else {
					planes.push(Number(val));
				}
			}
			//Source
			else if(key == 's') {
				if(Number(val) < 0) {
					nsource.push(Number(val) * -1);
				}
				else {
					source.push(Number(val));
				}
			}
			//Logic
			else if(key == 'st_logic') {
				logic[0] = Number(val);
			}
			else if(key == 'sp_logic') {
				logic[1] = Number(val);
			}
			else if(key == 'env_logic') {
				logic[2] = Number(val);
			}
			else if(key == 'cl_logic') {
				logic[3] = Number(val);
			}
			else if(key == 'pl_logic') {
				logic[4] = Number(val);
			}
			//Simple list
			else if(key == 'slist') {
				simple_list = true;
			}
			//Links
			else if(key == 'links') {
				links = true;
			}
			//Variants
			else if(key == 'variants') {
				add_variants = Number(val);
			}
			//Mixed groups
			else if(key == 'mixed') {
				add_mixed = Number(val);
			}
			//Unique creatures
			else if(key == 'unique') {
				add_unique = Number(val);
			}
			//Maximum number of creatures
			else if(key == 'maxcreatures') {
				maxcreatures = Number(val);
			}
			//Maximum dice value
			else if(key == 'maxdice') {
				maxdice = Number(val);
			}
			//Amounts of creatures
			else if(key == 'amount_min') {
				amount[0] = Number(val);
			}
			else if(key == 'amount_max') {
				amount[1] = Number(val);
			}
			//CR increase
			else if(key == 'cr_comb_min') {
				cr_comb[0] = Number(val);
			}
			else if(key == 'cr_comb_max') {
				cr_comb[1] = Number(val);
			}
			//Sorting
			else if(key == 'sort') {
				sort += Number(val);
			}
		}
		if(maxdice < 0) {
			maxdice = 0;
		}
		if(maxdice != 0 && maxcreatures > maxdice) {
			maxcreatures = maxdice;
		}

		//Setting values in fields
		//CR
		setCR(cr);
		//MR
		setSlider('mr', mr);
		//Alignment
		$('input[name=aluncheck]').click();
		if(alignment.length < $('#alignment').find('input[type="checkbox"]').length) {
			for(var i = 0; i < alignment.length; i++) {
				$('input#al' + alignment[i]).prop('checked', true);
			}
		}
		else {
			alignment = [];
		}
		if(nalignment.length <= $('#alignment').find('input[type="checkbox"]').length) {
			for(var i = 0; i < nalignment.length; i++) {
				$('input#al' + nalignment[i]).prop('checked', true);
				$('input#al' + nalignment[i]).addClass('cbox_no');
				$('input#al' + nalignment[i]).val($('input#al' + nalignment[i]).val() * -1);
			}
		}
		//Size
		setSize(size);
		//Type
		$('input[name=typeuncheck]').click();
		if(type.length < $('#types').find('input[type="checkbox"]').length) {
			for(var i = 0; i < type.length; i++) {
				$('input#type' + type[i]).prop('checked', true);
			}
		}
		else {
			type = [];
		}
		if(ntype.length <= $('#types').find('input[type="checkbox"]').length) {
			for(var i = 0; i < ntype.length; i++) {
				$('input#type' + ntype[i]).prop('checked', true);
				$('input#type' + ntype[i]).addClass('cbox_no');
				$('input#type' + ntype[i]).val($('input#type' + ntype[i]).val() * -1);
			}
		}
		//Subtype
		$('input[name=stuncheck]').click();
		if((logic[0] == 1 && subtype.length < $('#subtypes').find('input[type="checkbox"]').length) || (logic[0] != 1 && subtype.length > 0)) {
			for(var i = 0; i < subtype.length; i++) {
				$('input#st' + subtype[i]).prop('checked', true);
			}
		}
		else {
			subtype = [];
		}
		if(nsubtype.length <= $('#subtypes').find('input[type="checkbox"]').length) {
			for(var i = 0; i < nsubtype.length; i++) {
				$('input#st' + nsubtype[i]).prop('checked', true);
				$('input#st' + nsubtype[i]).addClass('cbox_no');
				$('input#st' + nsubtype[i]).val($('input#st' + nsubtype[i]).val() * -1);
			}
		}
		//Group
		$('input[name=gruncheck]').click();
		if(group.length < $('#groups').find('input[type="checkbox"]').length) {
			for(var i = 0; i < group.length; i++) {
				$('input#gr' + group[i]).prop('checked', true);
			}
		}
		else {
			group = [];
		}
		if(ngroup.length <= $('#groups').find('input[type="checkbox"]').length) {
			for(var i = 0; i < ngroup.length; i++) {
				$('input#gr' + ngroup[i]).prop('checked', true);
				$('input#gr' + ngroup[i]).addClass('cbox_no');
				$('input#gr' + ngroup[i]).val($('input#gr' + ngroup[i]).val() * -1);
			}
		}
		//HD
		setSlider('hd', hd);
		//Speed
		$('input[name=spuncheck]').click();
		if((logic[1] == 1 && speed.length < $('#speeds').find('input[type="checkbox"]').length) || (logic[1] != 1 && speed.length > 0)) {
			for(var i = 0; i < speed.length; i++) {
				$('input#sp' + speed[i]).prop('checked', true);
			}
		}
		else {
			speed = [];
		}
		if(nspeed.length <= $('#speeds').find('input[type="checkbox"]').length) {
			for(var i = 0; i < nspeed.length; i++) {
				$('input#sp' + nspeed[i]).prop('checked', true);
				$('input#sp' + nspeed[i]).addClass('cbox_no');
				$('input#sp' + nspeed[i]).val($('input#sp' + nspeed[i]).val() * -1);
			}
		}
		//Ability scores
		setScore('str', abilities.slice(0, 2));
		setScore('dex', abilities.slice(2, 4));
		setScore('con', abilities.slice(4, 6));
		setScore('int', abilities.slice(6, 8));
		setScore('wis', abilities.slice(8, 10));
		setScore('cha', abilities.slice(10));
		//Environment
		$('input[name=envuncheck]').click();
		if((logic[2] == 1 && environment.length < $('#environment').find('input[type="checkbox"]').length) || (logic[2] != 1 && environment.length > 0)) {
			for(var i = 0; i < environment.length; i++) {
				$('input#env' + environment[i]).prop('checked', true);
			}
		}
		else {
			environment = [];
		}
		if(nenvironment.length <= $('#environment').find('input[type="checkbox"]').length) {
			for(var i = 0; i < nenvironment.length; i++) {
				$('input#env' + nenvironment[i]).prop('checked', true);
				$('input#env' + nenvironment[i]).addClass('cbox_no');
				$('input#env' + nenvironment[i]).val($('input#env' + nenvironment[i]).val() * -1);
			}
		}
		//Climate
		$('input[name=cluncheck]').click();
		if((logic[3] == 0 && climate.length < $('#climate').find('input[type="checkbox"]').length) || (logic[3] != 0 && climate.length > 0)) {
			for(var i = 0; i < climate.length; i++) {
				$('input#cl' + climate[i]).prop('checked', true);
			}
		}
		else {
			climate = [];
		}
		if(nclimate.length <= $('#climate').find('input[type="checkbox"]').length) {
			for(var i = 0; i < nclimate.length; i++) {
				$('input#cl' + nclimate[i]).prop('checked', true);
				$('input#cl' + nclimate[i]).addClass('cbox_no');
				$('input#cl' + nclimate[i]).val($('input#cl' + nclimate[i]).val() * -1);
			}
		}
		//Plane
		$('input[name=pluncheck]').click();
		if((logic[4] == 0 && planes.length < $('#planes').find('input[type="checkbox"]').length) || logic[4] != 0 && planes.length > 0) {
			for(var i = 0; i < planes.length; i++) {
				$('input#pl' + planes[i]).prop('checked', true);
			}
		}
		else {
			planes = [];
		}
		if(nplanes.length <= $('#planes').find('input[type="checkbox"]').length) {
			for(var i = 0; i < nplanes.length; i++) {
				$('input#pl' + nplanes[i]).prop('checked', true);
				$('input#pl' + nplanes[i]).addClass('cbox_no');
				$('input#pl' + nplanes[i]).val($('input#pl' + nplanes[i]).val() * -1);
			}
		}
		//Source
		$('input[name=suncheck]').click();
		if(source.length < $('#sources').find('input[type="checkbox"]').length) {
			for(var i = 0; i < source.length; i++) {
				$('input#s' + source[i]).prop('checked', true);
			}
		}
		else {
			source = [];
		}
		if(nsource.length <= $('#sources').find('input[type="checkbox"]').length) {
			for(var i = 0; i < nsource.length; i++) {
				$('input#s' + nsource[i]).prop('checked', true);
				$('input#s' + nsource[i]).addClass('cbox_no');
				$('input#s' + nsource[i]).val($('input#s' + nsource[i]).val() * -1);
			}
		}
		//Logic
		$('input[name=st_logic][value=' + logic[0] + ']').prop('checked', true);
		$('input[name=sp_logic][value=' + logic[1] + ']').prop('checked', true);
		$('input[name=env_logic][value=' + logic[2] + ']').prop('checked', true);
		$('input[name=cl_logic][value=' + logic[3] + ']').prop('checked', true);
		$('input[name=pl_logic][value=' + logic[4] + ']').prop('checked', true);
		//Simple list
		if(simple_list) {
			$('input#slist').click();
		}
		//Links
		if(!links) {
			$('input#links').click();
		}
		//Variants
		if(add_variants == -1) {
			$('input#variant').prop('checked', true);
			$('input#variant').addClass('cbox_only');
			$('input#variant').val(Math.abs($('input#variant').val()) * -1);
		}
		else if(add_variants == 1) {
			$('input#variant').prop('checked', true);
			$('input#variant').removeClass('cbox_only');
			$('input#variant').val(Math.abs($('input#variant').val()));
		}
		else {
			$('input#variant').prop('checked', false);
			$('input#variant').removeClass('cbox_only');
			$('input#variant').val(Math.abs($('input#variant').val()));
		}
		//Mixed groups
		if(add_mixed == -1) {
			$('input#mixed').prop('checked', true);
			$('input#mixed').addClass('cbox_only');
			$('input#mixed').val(Math.abs($('input#mixed').val()) * -1);
		}
		else if(add_mixed == 1) {
			$('input#mixed').prop('checked', true);
			$('input#mixed').removeClass('cbox_only');
			$('input#mixed').val(Math.abs($('input#mixed').val()));
		}
		else {
			$('input#mixed').prop('checked', false);
			$('input#mixed').removeClass('cbox_only');
			$('input#mixed').val(Math.abs($('input#mixed').val()));
		}
		//Unique creatures
		if(add_unique == -1) {
			$('input#unique').prop('checked', true);
			$('input#unique').addClass('cbox_only');
			$('input#unique').val(Math.abs($('input#unique').val()) * -1);
		}
		else if(add_unique == 1) {
			$('input#unique').prop('checked', true);
			$('input#unique').removeClass('cbox_only');
			$('input#unique').val(Math.abs($('input#unique').val()));
		}
		else {
			$('input#unique').prop('checked', false);
			$('input#unique').removeClass('cbox_only');
			$('input#unique').val(Math.abs($('input#unique').val()));
		}
		//Table size
		$('input#numtable').val(maxcreatures);
		$('input#numcolumn').val(maxdice);
		//Amount of creatures
		setAmount(amount);
		//CR combination
		setSlider('cr_comb', cr_comb);
		//Sorting
		if(sort & 1) {
			$('input#sort1').prop('checked', true);
		}
		if(sort & 2) {
			$('input#sort2').prop('checked', true);
		}

		//Working on monsters file
		monsters = monsters.split('\n');
		for(var i = monsters.length - 1; i >= 0; i--) {
			if(monsters[i].trim() == '' || monsters[i].trim().indexOf('#') == 0) { //Removing comments and empty lines
				monsters.splice(i, 1);
				continue;
			}
			else {
				monsters[i] = monsters[i].split(';');
				if(monsters[i].length != fields_number) {
					if(debug) { //DEBUG: wrong length
						alert('Wrong number of fields (' + monsters[i].length + '): ' + monsters[i]);
					}
					monsters.splice(i, 1);
					continue;
				}
				//Name
				monsters[i][0] = monsters[i][0].trim().replace('&times', '&times;');
				//CR
				monsters[i][1] = monsters[i][1].split(',');
				for(var j = 0; j < monsters[i][1].length; j++) {
					monsters[i][1][j] = Number(monsters[i][1][j].trim());
				}
				//MR
				if(monsters[i][2].trim() == '') {
					monsters[i][2] = 0;
				}
				else {
					monsters[i][2] = Number(monsters[i][2].trim());
				}
				//Alignment
				monsters[i][3] = monsters[i][3].trim().split(',');
				for(var j = 0; j < monsters[i][3].length; j++) {
					monsters[i][3][j] = Number(monsters[i][3][j].trim());
				}
				if(monsters[i][3].indexOf(0) >= 0) {
					monsters[i][3] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				}
				//Size
				monsters[i][4] = monsters[i][4].trim().split(',');
				for(var j = 0; j < monsters[i][4].length; j++) {
					monsters[i][4][j] = Number(monsters[i][4][j].trim());
				}
				//Type
				monsters[i][5] = monsters[i][5].trim().split(',');
				for(var j = 0; j < monsters[i][5].length; j++) {
					monsters[i][5][j] = Number(monsters[i][5][j].trim());
				}
				//Subtype
				if(monsters[i][6].trim() == '') {
					monsters[i][6] = [99];
				}
				else {
					monsters[i][6] = monsters[i][6].trim().split(',');
					for(var j = 0; j < monsters[i][6].length; j++) {
						monsters[i][6][j] = Number(monsters[i][6][j].trim());
					}
				}
				//Group
				if(monsters[i][7].trim() == '') {
					monsters[i][7] = [99];
				}
				else {
					monsters[i][7] = monsters[i][7].trim().split(',');
					for(var j = 0; j < monsters[i][7].length; j++) {
						monsters[i][7][j] = Number(monsters[i][7][j].trim());
					}
				}
				//HD
				monsters[i][8] = monsters[i][8].split(',');
				for(var j = 0; j < monsters[i][8].length; j++) {
					monsters[i][8][j] = Number(monsters[i][8][j].trim());
				}
				//Speed
				monsters[i][9] = monsters[i][9].trim().split(',');
				for(var j = 0; j < monsters[i][9].length; j++) {
					monsters[i][9][j] = Number(monsters[i][9][j].trim());
				}
				//Ability scores
				monsters[i][10] = monsters[i][10].split(',');
				for(var j = 0; j < monsters[i][10].length; j++) {
					if(monsters[i][10][j].trim() == '') {
						monsters[i][10][j] = 0;
					}
					else {
						monsters[i][10][j] = Number(monsters[i][10][j].trim());
					}
				}
				monsters[i][11] = monsters[i][11].split(',');
				for(var j = 0; j < monsters[i][11].length; j++) {
					if(monsters[i][11][j].trim() == '') {
						monsters[i][11][j] = 0;
					}
					else {
						monsters[i][11][j] = Number(monsters[i][11][j].trim());
					}
				}
				monsters[i][12] = monsters[i][12].split(',');
				for(var j = 0; j < monsters[i][12].length; j++) {
					if(monsters[i][12][j].trim() == '') {
						monsters[i][12][j] = 0;
					}
					else {
						monsters[i][12][j] = Number(monsters[i][12][j].trim());
					}
				}
				monsters[i][13] = monsters[i][13].split(',');
				for(var j = 0; j < monsters[i][13].length; j++) {
					if(monsters[i][13][j].trim() == '') {
						monsters[i][13][j] = 0;
					}
					else {
						monsters[i][13][j] = Number(monsters[i][13][j].trim());
					}
				}
				monsters[i][14] = monsters[i][14].split(',');
				for(var j = 0; j < monsters[i][14].length; j++) {
					if(monsters[i][14][j].trim() == '') {
						monsters[i][14][j] = 0;
					}
					else {
						monsters[i][14][j] = Number(monsters[i][14][j].trim());
					}
				}
				monsters[i][15] = monsters[i][15].split(',');
				for(var j = 0; j < monsters[i][15].length; j++) {
					if(monsters[i][15][j].trim() == '') {
						monsters[i][15][j] = 0;
					}
					else {
						monsters[i][15][j] = Number(monsters[i][15][j].trim());
					}
				}
				//Environment
				monsters[i][16] = monsters[i][16].trim().split(',');
				for(var j = 0; j < monsters[i][16].length; j++) {
					monsters[i][16][j] = Number(monsters[i][16][j].trim());
				}
				if(monsters[i][16].indexOf(0) >= 0) {
					monsters[i][16] = monsters[i][16].concat([2, 3, 4, 5, 6, 7, 9, 11, 13, 15, 17]);
					monsters[i][16].splice(monsters[i][16].indexOf(0), 1);
				}
				if(monsters[i][16].indexOf(1) >= 0) {
					monsters[i][16] = monsters[i][16].concat([8, 10]);
					monsters[i][16].splice(monsters[i][16].indexOf(1), 1);
				}
				//Climate
				if(monsters[i][17].trim() == '' || monsters[i][17].trim() == '0') {
					monsters[i][17] = [1, 2, 3];
				}
				else {
					monsters[i][17] = monsters[i][17].trim().split(',');
					for(var j = 0; j < monsters[i][17].length; j++) {
						monsters[i][17][j] = Number(monsters[i][17][j].trim());
					}
				}
				//Planes
				if(monsters[i][18].trim() == '' || monsters[i][18].trim() == '0') {
					monsters[i][18] =[0];
				}
				else {
					monsters[i][18] = monsters[i][18].trim().split(',');
					for(var j = 0; j < monsters[i][18].length; j++) {
						monsters[i][18][j] = Number(monsters[i][18][j].trim());
					}
				}
				//Variant creatures
				monsters[i][19] = monsters[i][19].trim();
				//Number of creatures
				monsters[i][20] = monsters[i][20].trim().split(',');
				//Source
				monsters[i][21] = monsters[i][21].trim().split(',');
				for(var j = 0; j < monsters[i][21].length; j++) {
					monsters[i][21][j] = Number(monsters[i][21][j].trim());
				}
			}
		}
		var monster_count = monsters.length;
		if(debug) { //DEBUG: double monster
			for(var i = 0; i < monsters.length; i++) {
				for(var j = i + 1; j < monsters.length; j++) {
					if(monsters[i][0] == monsters[j][0]) {
						alert('Double monster: ' + monsters[i][0] + ' ' + (i + 2) + ' ' + (j + 2));
					}
				}
			}
		}
		//Filtering 1
		for(var i = monsters.length - 1; i >= 0; i--) {
			//CR
			if(simple_list) {
				if(monsters[i][1].length == 1) { //Removes monsters outside the CR interval
					if(monsters[i][1][0] < cr[0] || monsters[i][1][0] > cr[1]) {
						monsters.splice(i, 1);
						continue;
					}
				}
				else { //Removes mixed groups
					monsters.splice(i, 1);
					continue;
				}
			}
			else {
				if(monsters[i][1].length == 1) { //Removes monsters outside the CR interval; further filtering will happen after groups formation
					if(monsters[i][1][0] + cr_comb[1] < cr[0] || monsters[i][1][0] > cr[1]) {
						monsters.splice(i, 1);
						continue;
					}
					if(cr_comb[0] > 0 && monsters[i][20].split('|')[0].indexOf('u') >= 0) { //Removes unique monsters if minimum CR increment is > 0
						monsters.splice(i, 1);
						continue;
					}
				}
				else {
					if((monsters[i][1][0] + monsters[i][1][1]) < cr[0] || (monsters[i][1][0] + monsters[i][1][1]) > cr[1] || monsters[i][1][1] < cr_comb[0] || monsters[i][1][1] > cr_comb[1]) { //Removes groups outside the CR interval
						monsters.splice(i, 1);
						continue;
					}
				}
			}
			//MR
			if(monsters[i][2] < mr[0] || monsters[i][2] > mr[1]) {
				monsters.splice(i, 1);
				continue;
			}
			//Alignment
			if(monsters[i][1].length == 1 && nalignment.length > 0 && nalignment.length >= monsters[i][3].length) {
				var nalignment_found = true;
				for(var j = 0; j < monsters[i][3].length; j++) {
					if(nalignment.indexOf(monsters[i][3][j]) == -1) {
						nalignment_found = false;
						break;
					}
				}
				if(nalignment_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			else if(monsters[i][1].length == 2 && nalignment.length > 0) {
				var nalignment_found = false;
				for(var j = 0; j < monsters[i][3].length; j++) {
					if(nalignment.indexOf(monsters[i][3][j]) >= 0) {
						nalignment_found = true;
						break;
					}
				}
				if(nalignment_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(alignment.length > 0) {
				var alignment_found = false;
				for(var j = 0; j < alignment.length; j++) {
					if(alignment.indexOf(monsters[i][3][j]) >= 0) {
						alignment_found = true;
						break;
					}
				}
				if(!alignment_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//Size
			if(Math.min(...monsters[i][4]) < size[0] || Math.max(...monsters[i][4]) > size[1]) {
				monsters.splice(i, 1);
				continue;
			}
			//Type
			if(ntype.length > 0) {
				var ntype_found = false;
				for(var j = 0; j < monsters[i][5].length; j++) {
					if(ntype.indexOf(monsters[i][5][j]) >= 0) {
						ntype_found = true;
						break;
					}
				}
				if(ntype_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(type.length > 0) {
				var type_found = false;
				for(var j = 0; j < monsters[i][5].length; j++) {
					if(type.indexOf(monsters[i][5][j]) >= 0) {
						type_found = true;
						break;
					}
				}
				if(!type_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//Subtype
			if(nsubtype.length > 0) {
				var nsubtype_found = false;
				for(var j = 0; j < monsters[i][6].length; j++) {
					if(nsubtype.indexOf(monsters[i][6][j]) >= 0) {
						nsubtype_found = true;
						break;
					}
				}
				if(nsubtype_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(subtype.length > 0) {
				if(logic[0] == 0) { //AND
					if(monsters[i][6].length < subtype.length) {
						var subtype_found = false;
					}
					else {
						var subtype_found = true;
						for(var j = 0; j < subtype.length; j++) {
							if(monsters[i][6].indexOf(subtype[j]) == -1) {
								subtype_found = false;
								break;
							}
						}
					}
				}
				else if(logic[0] == 1) { //OR
					var subtype_found = false;
					for(var j = 0; j < monsters[i][6].length; j++) {
						if(subtype.indexOf(monsters[i][6][j]) >= 0) {
							subtype_found = true;
							break;
						}
					}
				}
				else { //XOR
					var subtype_found = false;
					for(var j = 0; j < monsters[i][6].length; j++) {
						if(subtype.indexOf(monsters[i][6][j]) >= 0) {
							if(!subtype_found) {
								subtype_found = true;
								continue;
							}
							else {
								subtype_found = false;
								break;
							}
						}
					}
				}
				if(!subtype_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//Group
			if(ngroup.length > 0) {
				var ngroup_found = false;
				for(var j = 0; j < monsters[i][7].length; j++) {
					if(ngroup.indexOf(monsters[i][7][j]) >= 0) {
						ngroup_found = true;
						break;
					}
				}
				if(ngroup_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(group.length > 0) {
				var group_found = false;
				for(var j = 0; j < monsters[i][7].length; j++) {
					if(group.indexOf(monsters[i][7][j]) >= 0) {
						group_found = true;
						break;
					}
				}
				if(!group_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//HD
			if(Math.min(...monsters[i][8]) < hd[0] || Math.max(...monsters[i][8]) > hd[1]) {
				monsters.splice(i, 1);
				continue;
			}
			//Speed
			if(nspeed.length > 0) {
				var nspeed_found = false;
				for(var j = 0; j < monsters[i][9].length; j++) {
					if(nspeed.indexOf(monsters[i][9][j]) >= 0) {
						nspeed_found = true;
						break;
					}
				}
				if(nspeed_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(speed.length > 0) {
				if(logic[1] == 0) { //AND
					if(monsters[i][9].length < speed.length) {
						var speed_found = false;
					}
					else {
						var speed_found = true;
						for(var j = 0; j < speed.length; j++) {
							if(monsters[i][9].indexOf(speed[j]) == -1) {
								speed_found = false;
								break;
							}
						}
					}
				}
				else if(logic[1] == 1) { //OR
					var speed_found = false;
					for(var j = 0; j < monsters[i][9].length; j++) {
						if(speed.indexOf(monsters[i][9][j]) >= 0) {
							speed_found = true;
							break;
						}
					}
				}
				else { //XOR
					var speed_found = false;
					for(var j = 0; j < monsters[i][9].length; j++) {
						if(speed.indexOf(monsters[i][9][j]) >= 0) {
							if(!speed_found) {
								speed_found = true;
								continue;
							}
							else {
								speed_found = false;
								break;
							}
						}
					}
				}
				if(!speed_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//Ability scores
			if(Math.min(...monsters[i][10]) < abilities[0] || Math.max(...monsters[i][10]) > abilities[1]) {
				monsters.splice(i, 1);
				continue;
			}
			if(Math.min(...monsters[i][11]) < abilities[2] || Math.max(...monsters[i][11]) > abilities[3]) {
				monsters.splice(i, 1);
				continue;
			}
			if(Math.min(...monsters[i][12]) < abilities[4] || Math.max(...monsters[i][12]) > abilities[5]) {
				monsters.splice(i, 1);
				continue;
			}
			if(Math.min(...monsters[i][13]) < abilities[6] || Math.max(...monsters[i][13]) > abilities[7]) {
				monsters.splice(i, 1);
				continue;
			}
			if(Math.min(...monsters[i][14]) < abilities[8] || Math.max(...monsters[i][14]) > abilities[9]) {
				monsters.splice(i, 1);
				continue;
			}
			if(Math.min(...monsters[i][15]) < abilities[10] || Math.max(...monsters[i][15]) > abilities[11]) {
				monsters.splice(i, 1);
				continue;
			}
			//Environment
			if(nenvironment.length > 0) {
				var nenvironment_found = false;
				for(var j = 0; j < monsters[i][16].length; j++) {
					if(nenvironment.indexOf(monsters[i][16][j]) >= 0) {
						nenvironment_found = true;
						break;
					}
				}
				if(nenvironment_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(environment.length > 0) {
				if(logic[2] == 0) { //AND
					var environment_found = true;
					for(var j = 0; j < environment.length; j++) {
						if(monsters[i][16].indexOf(environment[j]) == -1) {
							environment_found = false;
							break;
						}
					}
				}
				else { //OR
					var environment_found = false;
					for(var j = 0; j < monsters[i][16].length; j++) {
						if(environment.indexOf(monsters[i][16][j]) >= 0) {
							environment_found = true;
							break;
						}
					}
			}
				if(!environment_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//Climate
			if(nclimate.length > 0) {
				var nclimate_found = false;
				for(var j = 0; j < monsters[i][17].length; j++) {
					if(nclimate.indexOf(monsters[i][17][j]) >= 0) {
						nclimate_found = true;
						break;
					}
				}
				if(nclimate_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(climate.length > 0) {
				if(logic[3] == 0) { //OR
					var climate_found = false;
					for(var j = 0; j < monsters[i][17].length; j++) {
						if(climate.indexOf(monsters[i][17][j]) >= 0) {
							climate_found = true;
							break;
						}
					}
				}
				else { //XOR
					var climate_found = false;
					for(var j = 0; j < monsters[i][17].length; j++) {
						if(climate.indexOf(monsters[i][17][j]) >= 0) {
							if(!climate_found) {
								climate_found = true;
								continue;
							}
							else {
								climate_found = false;
								break;
							}
						}
					}
				}
				if(!climate_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//Planes
			if(nplanes.length > 0) {
				if(monsters[i][18].length == 1 && monsters[i][18][0] == 0) {
					var nplanes_found = true;
				}
				else {
					var nplanes_found = false;
					for(var j = 0; j < monsters[i][18].length; j++) {
						if(nplanes.indexOf(monsters[i][18][j]) >= 0) {
							nplanes_found = true;
							break;
						}
					}
				}
				if(nplanes_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(planes.length > 0) {
				if(logic[4] == 0) { //OR
					if(monsters[i][18].length == 1 && monsters[i][18][0] == 0) {
						var planes_found = true;
					}
					else {
						var planes_found = false;
						for(var j = 0; j < monsters[i][18].length; j++) {
							if(planes.indexOf(monsters[i][18][j]) >= 0) {
								planes_found = true;
								break;
							}
						}
					}
				}
				else { //XOR
					if(monsters[i][18].length == 1 && monsters[i][18][0] == 0) {
						if(planes.length == 1) {
							var planes_found = true;
						}
						else {
							var planes_found = false;
						}
					}
					else {
						var planes_found = false;
						for(var j = 0; j < monsters[i][18].length; j++) {
							if(planes.indexOf(monsters[i][18][j]) >= 0) {
								if(!planes_found) {
									planes_found = true;
									continue;
								}
								else {
									planes_found = false;
									break;
								}
							}
						}
					}
				}
				if(!planes_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//Source
			if(nsource.length > 0) {
				var nsource_found = false;
				for(var j = 0; j < monsters[i][21].length; j++) {
					if(nsource.indexOf(monsters[i][21][j]) >= 0) {
						nsource_found = true;
						break;
					}
				}
				if(nsource_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			if(source.length > 0) {
				var source_found = false;
				for(var j = 0; j < monsters[i][21].length; j++) {
					if(source.indexOf(monsters[i][21][j]) >= 0) {
						source_found = true;
						break;
					}
				}
				if(!source_found) {
					monsters.splice(i, 1);
					continue;
				}
			}
			//Variants
			if((add_variants == 0 && monsters[i][19] != '') || (add_variants == -1 && monsters[i][19] == '')) {
				monsters.splice(i, 1);
				continue;
			}
			//Mixed groups
			if(((add_mixed == 0 || simple_list) && monsters[i][1].length != 1) || (add_mixed == -1 && monsters[i][1].length == 1)) {
				monsters.splice(i, 1);
				continue;
			}
			//Unique monsters
			if((add_unique == 0 && monsters[i][20].length == 1 && monsters[i][20][0].split('|')[0].indexOf('u') >= 0) || (add_unique == -1 && (monsters[i][20].length != 1 || monsters[i][20][0].split('|')[0].indexOf('u') == -1))) {
				monsters.splice(i, 1);
				continue;
			}
			//Amount of creatures
			if(amount[0] > 1 || amount[1] < maximum_amount) {
				if(monsters[i][20].length == 1 && monsters[i][20][0].split('|')[0].indexOf('u') >= 0 && monsters[i][20][0].indexOf('*') != 0) {
					var single_number = Number(monsters[i][20][0].split('u')[0]);
					if(single_number < amount[0] || single_number > amount[1]) {
						monsters.splice(i, 1);
						continue;
					}
				}
				else if(monsters[i][20].length == 1 & monsters[i][20][0].indexOf('*') == 0) {
					if(monsters[i][20][0].indexOf('-') >= 0) {
						var min_number = Number(monsters[i][20][0].split('*', 2)[1].split('-', 2)[0]);
						var max_number = Number(monsters[i][20][0].split('-', 2)[1].replace('u', ''));
						if(min_number < amount[0] || (max_number > amount[1] && amount[1] < maximum_amount)) {
							monsters.splice(i, 1);
							continue;
						}
					}
					else {
						var single_number = Number(monsters[i][20][0].split('*', 2)[1].replace('u', ''));
						if(single_number < amount[0] || single_number > amount[1]) {
							monsters.splice(i, 1);
							continue;
						}
					}
				}
				else {
					for(var j = monsters[i][20].length - 1; j >= 0; j--) {
						if(monsters[i][20][j].indexOf('-') >= 0) {
							var min_number = Number(monsters[i][20][j].split('-', 2)[0]);
							var max_number = Number(monsters[i][20][j].split('|')[0].split('-', 2)[1]);
							if(amount[1] < min_number || (amount[0] > max_number && amount[1] < maximum_amount)) {
								monsters[i][20].splice(j, 1);
							}
							else if(min_number < amount[0] && (max_number <= amount[1] || amount[1] == maximum_amount)) {
								monsters[i][20][j] = amount[0] + '-' + monsters[i][20][j].split('-', 2)[1];
							}
							else if(min_number >= amount[0] && max_number > amount[1] && amount[1] < maximum_amount) {
								if(monsters[i][20][j].indexOf('|') >= 0) {
									monsters[i][20][j] = monsters[i][20][j].split('-', 2)[0] + '-' + amount[1] + '|' + monsters[i][20][j].split('|')[1];
								}
								else {
									monsters[i][20][j] = monsters[i][20][j].split('-', 2)[0] + '-' + amount[1];
								}
							}
							else if(min_number < amount[0] && max_number > amount[1] && amount[1] < maximum_amount) {
								if(monsters[i][20][j].indexOf('|') >= 0) {
									monsters[i][20][j] = amount[0] + '-' + amount[1] + '|' + monsters[i][20][j].split('|')[1];
								}
								else {
									monsters[i][20][j] = amount[0] + '-' + amount[1];
								}
							}
						}
						else {
							var single_number = Number(monsters[i][20][j].split('|')[0]);
							if(single_number < amount[0] || single_number > amount[1]) {
								monsters[i][20].splice(j, 1);
							}
						}
					}
					if(monsters[i][20].length == 0) {
						monsters.splice(i, 1);
						continue;
					}
				}
			}
			//Intervals
			if(!simple_list && monsters[i][20].length == 1 && monsters[i][20][0] == '0') {
				monsters.splice(i, 1);
				continue;
			}
		}
		//Creating groups and links
		monsters2 = [];
		for(var i = 0; i < monsters.length; i++) {
			monsters[i].push(cleanLink(monsters[i][0]).toLowerCase());
			if(links) { //Link generation
				if(monsters[i][0].indexOf('[') >= 0) { //Groups
					var temp_name = monsters[i][0].split('[');
					for(var j = 0; j < temp_name.length; j++) {
						if(temp_name[j].indexOf(']') >= 0) {
							temp_name[j] = genLink(temp_name[j], monsters[i][6]);
						}
					}
					monsters[i][0] = temp_name.join('');
					var linked = true;
				}
				else {
					var linked = false;
				}
				if(monsters[i][19] != '') { //Variant creatures
					if(monsters[i][19].indexOf('[') >= 0) {
						var temp_name = monsters[i][19].split('[');
						for(var j = 0; j < temp_name.length; j++) {
							if(temp_name[j].indexOf(']') >= 0) {
								temp_name[j] = genLink(temp_name[j], monsters[i][6]);
							}
						}
						monsters[i][19] = temp_name.join('');
					}
					else {
						monsters[i][19] = genLink(monsters[i][19], monsters[i][6]);
					}
					linked = true;
				}
			}
			else { //Cleaning link syntax
				if(monsters[i][0].indexOf('[') >= 0) {
					monsters[i][0] = cleanLink(monsters[i][0]);
				}
				else if(monsters[i][19] == '' && monsters[i][0].indexOf('~') >= 0) {
					monsters[i][0] = monsters[i][0].split('~')[0];
				}
				if(monsters[i][19] != '') {
					if(monsters[i][19].indexOf('[') >= 0) {
						monsters[i][19] = cleanLink(monsters[i][19]);
					}
					else if(monsters[i][19].indexOf('~') >= 0) {
						monsters[i][19] = monsters[i][19].split('~')[0];
					}
				}
				linked = true;
			}
			if(simple_list) {
				if(!linked) {
					if(monsters[i][0].indexOf('|') >= 0) {
						if(monsters[i][0].indexOf('/') >= 0) {
							monsters[i][0] = monsters[i][0].split('|')[0] + '/' + monsters[i][0].split('/')[1];
						}
						else if(monsters[i][0].indexOf('~') >= 0) {
							monsters[i][0] = monsters[i][0].split('|')[0] + '~' + monsters[i][0].split('~')[1];
						}
						else {
							monsters[i][0] = monsters[i][0].split('|')[0];
						}
					}
					monsters[i][0] = genLink(monsters[i][0], monsters[i][6]);
					linked = true;
				}
				monsters2.push([monsters[i][0], monsters[i][1][0], monsters[i][2], monsters[i][19], monsters[i][21], monsters[i][22]]);
			}
			else {
				for(var j = 0; j < monsters[i][20].length; j++) {
					if(monsters[i][20][j].indexOf('*') == 0 || monsters[i][20][j].split('|')[0].indexOf('u') >= 0) { //Combinations and unique monsters
						if(!linked) {
							monsters[i][0] = genLink(monsters[i][0], monsters[i][6]);
							linked = true;
						}
						monsters2.push([monsters[i][0], monsters[i][1], monsters[i][2], monsters[i][19], monsters[i][21]]);
					}
					else {
						if(monsters[i][20][j].indexOf('|') >= 0) { //Extracting group name
							var interval = monsters[i][20][j].split('|')[0];
							var description = monsters[i][20][j].split('|')[1];
							if(['a', 'e', 'i', 'o'].indexOf(description.slice(0, 1)) >= 0) {
								description = 'an ' + description + ' of ';
							}
							else {
								description = 'a ' + description + ' of ';
							}
						}
						else {
							var interval = monsters[i][20][j];
							var description = '';
						}
						if(monsters[i][1].length == 1) {
							if(monsters[i][1][0] == -4 || monsters[i][1][0] == -2 || monsters[i][1][0] == 0) {
								var index_cr = 0;
							}
							else if(monsters[i][1][0] == -3) {
								var index_cr = 1;
							}
							else if(monsters[i][1][0] == -1) {
								var index_cr = 2;
							}
							else if(monsters[i][1][0] % 2 == 1) {
								var index_cr = 3;
							}
							else {
								var index_cr = 4;
							}
						}
						else {
							if(monsters[i][1][0] + monsters[i][1][1] == -4 || monsters[i][1][0] + monsters[i][1][1] == -2 || monsters[i][1][0] + monsters[i][1][1] == 0) {
								var index_cr = 0;
							}
							else if(monsters[i][1][0] + monsters[i][1][1] == -3) {
								var index_cr = 1;
							}
							else if(monsters[i][1][0] + monsters[i][1][1] == -1) {
								var index_cr = 2;
							}
							else if((monsters[i][1][0] + monsters[i][1][1]) % 2 == 1) {
								var index_cr = 3;
							}
							else {
								var index_cr = 4;
							}
						}
						var dice2 = genDice(interval, index_cr, cr_comb);
						for(var k = cr_comb[0]; k <= cr_comb[1]; k++) {
							if(dice2[k].length > 0) { //Choosing one of the possible dice
								index_dice = Math.floor(Math.random() * dice2[k].length);
								if(dice2[k][index_dice] == '1') {
									if(monsters[i][0].indexOf('|') >= 0) {
										if(monsters[i][0].indexOf('/') >= 0) {
											var monster_name = monsters[i][0].split('|')[0] + '/' + monsters[i][0].split('/');
										}
										else if(monsters[i][0].indexOf('~') >= 0) {
											var monster_name = monsters[i][0].split('|')[0] + '~' + monsters[i][0].split('~');
										}
										else {
											var monster_name = monsters[i][0].split('|')[0];
										}
									}
									else {
										var monster_name = monsters[i][0];
									}
								}
								else { //Constructing plural
									if(monsters[i][0].indexOf('/') >= 0) {
										var monster_name = plural(monsters[i][0].split('/')[0]) + '/' + monsters[i][0].split('/')[1];
										if(monsters[i][19] == '' && monster_name.indexOf('~') == -1) {
											monster_name += '~' + monsters[i][0];
										}
									}
									else if(monsters[i][0].indexOf('~') >= 0) {
										var monster_name = plural(monsters[i][0].split('~')[0]) + '~' + monsters[i][0].split('~')[1];
									}
									else {
										var monster_name = plural(monsters[i][0]);
										if(monsters[i][19] == '') {
											monster_name += '~' + monsters[i][0];
										}
									}
								}
								if(!linked && monsters[i][19] == '') {
									monster_name = genLink(monster_name, monsters[i][6]);
								}
								monsters2.push([description + dice2[k][index_dice] + ' ' + monster_name, [monsters[i][1][0] + k], monsters[i][2], monsters[i][19], monsters[i][21], monsters[i][22]]);
							}
						}
					}
				}
			}
		}
		monsters = monsters2;
		//Filtering 2
		if(!simple_list) {
			for(var i = monsters.length - 1; i >= 0; i--) {
				//CR
				if(monsters[i][1].length == 1) {
					if(monsters[i][1][0] < cr[0] || monsters[i][1][0] > cr[1]) {
						monsters.splice(i, 1);
						continue;
					}
					else {
						monsters[i][1] = monsters[i][1][0];
					}
				}
				else {
					monsters[i][1] = monsters[i][1][0] + monsters[i][1][1];
				}
			}
		}
		//Creating table
		var foot_msg = '...out of ' + monster_count + ' different creatures and mixed groups.<br />';
		if(monsters.length == 1) {
			foot_msg +=  monsters.length + ' entry matched your criteria.'
		}
		else {
			foot_msg +=  monsters.length + ' entries matched your criteria.'
		}
		if(simple_list) {
			$('#table').append('<table id="random_table"><thead><tr><th id="tenc">Creatures</th><th id="tcr">CR</th><th id="tnote">Variation of</th><th id="tsource">Source</th></tr></thead><tfoot><tr><td colspan="4">' + foot_msg + '</td></tr></tfoot><tbody></tbody></table>');
		}
		else if(maxdice == 0) {
			$('#table').append('<table id="random_table"><thead><tr><th id="tenc">Encounter</th><th id="tcr">Avg. CR</th><th id="tnote">Variation of</th><th id="tsource">Source</th></tr></thead><tfoot><tr><td colspan="4">' + foot_msg + '</td></tr></tfoot><tbody></tbody></table>');
		}
		else {
			$('#table').append('<table id="random_table"><thead><tr><th id="tdice">dice</th><th id="tenc">Encounter</th><th id="tcr">Avg. CR</th><th id="tnote">Variation of</th><th id="tsource">Source</th></tr></thead><tfoot><tr><td colspan="5">' + foot_msg + '</td></tr></tfoot><tbody></tbody></table>');
		}
		if(maxcreatures == 0 || simple_list) {
			maxcreatures = monsters.length;
			if(maxcreatures > maxdice && maxdice != 0) {
				maxdice = maxcreatures;
			}
		}
		if(!simple_list) {
			var monsters2 = [];
			for(var i = 0; i < maxcreatures && monsters.length > 0; i++) { //Random selection
				var random_index = Math.floor(Math.random() * monsters.length);
				monsters2.push(monsters[random_index]);
				monsters.splice(random_index, 1);
			}
			monsters = monsters2;
		}
		//Sorting
		if(sort & 2) {
			for(var i = 0; i < monsters.length; i++) {
				for(var j = 0; j < monsters.length - 1; j++) {
					if(monsters[j][5] > monsters[j + 1][5]) {
						var tmp = monsters[j];
						monsters[j] = monsters[j + 1];
						monsters[j + 1] = tmp;
					}
				}
			}
		}
		if(sort & 1) {
			for(var i = 0; i < monsters.length; i++) {
				for(var j = 0; j < monsters.length - 1; j++) {
					if(monsters[j][1] > monsters[j + 1][1] || (monsters[j][1] == monsters[j + 1][1] && monsters[j][2] > monsters[j + 1][2])) {
						var tmp = monsters[j];
						monsters[j] = monsters[j + 1];
						monsters[j + 1] = tmp;
					}
				}
			}
		}
		if((sort & 1) + (sort & 2) == 0 && simple_list) {
			var monsters2 = [];
			while(monsters.length > 0) {
				var random_index = Math.floor(Math.random() * monsters.length);
				monsters2.push(monsters[random_index]);
				monsters.splice(random_index, 1);
			}
			monsters = monsters2;
		}
		//Filling table
		for(var i = 0; i < monsters.length; i++) {
			var interval_min = Math.floor(maxdice * i / monsters.length) + 1;
			var interval_max = Math.floor(maxdice * (i + 1) / monsters.length);
			if(interval_min == interval_max) {
				var interval = interval_min;
			}
			else {
				var interval = interval_min + '-' + interval_max;
			}
			if(monsters[i][1] == 0) {
				var temp_cr = '1/2';
			}
			else if(monsters[i][1] == -1) {
				var temp_cr = '1/3';
			}
			else if(monsters[i][1] == -2) {
				var temp_cr = '1/4';
			}
			else if(monsters[i][1] == -3) {
				var temp_cr = '1/6';
			}
			else if(monsters[i][1] == -4) {
				var temp_cr = '1/8';
			}
			else {
				var temp_cr = monsters[i][1];
			}
			if(monsters[i][2] > 0) {
				temp_cr += ' / MR ' + monsters[i][2];
			}
			var temp_source = '';
			for(var j = 0; j < monsters[i][4].length; j++) {
				if(temp_source == '') {
					temp_source = sources[monsters[i][4][j] - 1];
				}
				else {
					temp_source += ', ' + sources[monsters[i][4][j] - 1];
				}
			}
			if(maxdice == 0 || simple_list) {
				$('#random_table tbody').append('<tr><td>' + monsters[i][0] + '</td><td>' + temp_cr + '</td><td>' + monsters[i][3] + '</td><td>' + temp_source + '</td></tr>');
			}
			else {
				$('#random_table tbody').append('<tr><td>' + interval + '</td><td>' + monsters[i][0] + '</td><td>' + temp_cr + '</td><td>' + monsters[i][3] + '</td><td>' + temp_source + '</td></tr>');
			}
		}
	}
});
