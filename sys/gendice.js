function genDice(interval, cr, incr) {
	var possibilities = {2: '1d2', 3: '1d3', 4: '1d4', 5: '2d3', 6: '1d6', 7: '2d4', 8: '1d8', 9: '4d3', 10: '1d10', 11: '2d6', 12: '1d12', 13: '4d4', 15: '2d8', 16: '3d6', 19: '2d10', 20: '1d20', 21: '4d6', 22: '3d8', 23: '2d12', 26: '5d6', 28: '3d10', 29: '4d8', 31: '6d6', 34: '3d12', 36: '5d8', 37: '4d10', 39: '2d20', 43: '6d8', 45: '4d12', 46: '5d10', 55: '6d10', 56: '5d12', 58: '3d20', 67: '6d12', 77: '4d20', 96: '5d20', 100: '1d100'}; //spans with associated dice
	result = [[], [], [], [], [], [], [], [], [], [], []];
	if(interval.indexOf('-') >= 0) {
		var minValue = Number(interval.split('-')[0]);
		var maxValue = Number(interval.split('-')[1]);
		var span = maxValue - minValue + 1;
		var possKeys = Object.keys(possibilities);
		for(var i = 0; i < possKeys.length; i++) {
			possKeys[i] = Number(possKeys[i]);
		}
		for(var i = minValue; i <= maxValue; i++) {
			for(var k = incr[0]; k <= incr[1]; k++) {
				if(dice[cr][k].indexOf(String(i)) >= 0) {
					result[k].push(String(i));
					break;
				}
			}
		}
		for(var i = 2; i <= Math.min(span, Math.max(...possKeys)); i++) {
			if(possKeys.indexOf(i) >= 0) {
				var minDice = Number(possibilities[i].split('d')[0]);
				var maxDice = minDice * Number(possibilities[i].split('d')[1]);
				for(var j = minValue - minDice; j <= maxValue - maxDice; j++) {
					if(j < 0) {
						var tempDice = possibilities[i] + String(j);
					}
					else if(j == 0) {
						var tempDice = possibilities[i];
					}
					else {
						var tempDice = possibilities[i] + '+' + String(j);
					}
					for(var k = incr[0]; k <= incr[1]; k++) {
						if(dice[cr][k].indexOf(tempDice) >= 0) {
							result[k].push(tempDice);
							break;
						}
					}
				}
			}
		}
	}
	else {
		for(var k = incr[0]; k <= incr[1]; k++) {
			if(dice[cr][k].indexOf(interval) >= 0) {
				result[k].push(interval);
				break;
			}
		}
	}
	return result;
}

function genGroups(interval, cr, singular, plural, cr_comb) {
	var results = [];
	if(interval.indexOf('|') >= 0) { //Extracting group name
		var description = interval.split('|')[1];
		interval = interval.split('|')[0];
		if(['a', 'e', 'i', 'o'].indexOf(description.slice(0, 1)) >= 0) {
			description = 'an ' + description + ' of ';
		}
		else {
			description = 'a ' + description + ' of ';
		}
	}
	else {
		var description = '';
	}
	if(cr.length == 1) {
		if(cr[0] == -4 || cr[0] == -2 || cr[0] == 0) {
			var index_cr = 0;
		}
		else if(cr[0] == -3) {
			var index_cr = 1;
		}
		else if(cr[0] == -1) {
			var index_cr = 2;
		}
		else if(cr[0] % 2 == 1) {
			var index_cr = 3;
		}
		else {
			var index_cr = 4;
		}
	}
	else {
		if(cr[0] + cr[1] == -4 || cr[0] + cr[1] == -2 || cr[0] + cr[1] == 0) {
			var index_cr = 0;
		}
		else if(cr[0] + cr[1] == -3) {
			var index_cr = 1;
		}
		else if(cr[0] + cr[1] == -1) {
			var index_cr = 2;
		}
		else if((cr[0] + cr[1]) % 2 == 1) {
			var index_cr = 3;
		}
		else {
			var index_cr = 4;
		}
	}
	var dice = genDice(interval, index_cr, cr_comb);
	for(var i = cr_comb[0]; i <= cr_comb[1]; i++) {
		if(dice[i].length > 0) { //Choosing one of the possible dice
			index_dice = randInt(0, dice[i].length - 1);
			if(dice[i][index_dice] == '1') {
				results.push([description + dice[i][index_dice] + ' ' + singular, [cr[0] + i]]);
			}
			else {
				results.push([description + dice[i][index_dice] + ' ' + plural, [cr[0] + i]]);
			}
		}
	}
	return results;
}