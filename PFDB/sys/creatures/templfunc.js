var fNumber = [2];
var fString = [0, 19];
var fArrayNumberList = [3, 5, 6, 7, 9, 16, 17, 18, 21];
var fArrayNumberSum = [4, 8, 10, 11, 12, 13, 14, 15];
var fArrayNumberCR = [1];
var fArrayString = [20];

function parseConditions(conditions, monster) {
	for(var i = 0; i < conditions.length; i++) {
		if(!parseCondition(conditions[i], monster)) {
			return false;
		}
	}
	return true;
}

function parseCondition(condition, monster) {
	if(condition.indexOf('?') >= 0 && condition.indexOf(':') >= 0) { //Conditional notation
		condIf = condition.split('?')[0];
		condThen = condition.split('?')[1].split(':')[0];
		condElse = condition.slice(condition.indexOf(':') + 1);
		if(checkCondition(condIf, monster)) {
			return checkCondition(condThen, monster);
		}
		else if(checkCondition(condIf, monster) == undefined) {
			return undefined;
		}
		else {
			parseCondition(condElse, monster);
		}
	}
	else {
		return checkCondition(condition, monster);
	}
}

function checkCondition(condition, monster) {
	if(condition.indexOf('=') >= 0) {
		var field = monster[Number(condition.split('=')[0].replace('$', '').trim()) - 1];
		var condList = condition.split('=')[1].split(',');
		var matches = 0;
		if(fNumber.indexOf(field)) {
			for(var i = 0; i < condList.length; i++) { //Check all values of a condition
				if(condList[i].indexOf('-') >= 0) {
					if(field >= Number(condList[i].split('-')[0]) && field <= Number(condList[i].split('-')[1])) {
						matches += 1;
						break;
					}
				}
				else {
					if(field == Number(condList[i])) {
						matches += 1;
						break;
					}
				}
			}
		}
		else if(fString.indexOf(field)) {
			for(var i = 0; i < condList.length; i++) { //Check all values of a condition
				if(field == condList[i].trim()) {
					matches += 1;
					break;
				}
			}
		}
		else if(typeof field == 'object') {
			for(var i = 0; i < condList.length; i++) { //Check all values of a condition
				var found = false;
				if(typeof field[i] == 'number') {
					if(condList[i].indexOf('-') >= 0) {
						for(var j = 0; j < field.length; j++) {
							if(field[j] >= Number(condList[i].split('-')[0]) && field[j] <= Number(condList[i].split('-')[1])) {
								found = true;
								break;
							}
						}
						if(found) {
							matches += 1;
							break;
						}
					}
					else {
						for(var j = 0; j < field.length; j++) {
							if(field[j] == Number(condList[i])) {
								found = true;
								break;
							}
						}
						if(found) {
							matches += 1;
							break;
						}
					}
				}
				else if(typeof field[i] == 'string') {
					for(var j = 0; j < field.length; j++) {
						if(field[j] == condList[i].trim()) {
							found = true;
							break;
						}
					}
					if(found) {
						matches += 1;
						break;
					}
				}
				else {
					return undefined;
				}
			}
		}
		else {
			return undefined;
		}
		return (matches > 0);
	}
	else if(condition.indexOf('!') >= 0) {
		var field = monster[Number(condition.split('!')[0].replace('$', '').trim()) - 1];
		var condList = condition.split('!')[1].split(',');
		var matches = 0;
		if(typeof field == 'number') {
			for(var i = 0; i < condList.length; i++) { //Check all values of a condition
				if(condList[i].indexOf('-') >= 0) {
					if(field < Number(condList[i].split('-')[0]) || field > Number(condList[i].split('-')[1])) {
						matches += 1;
						break;
					}
				}
				else {
					if(field != Number(condList[i])) {
						matches += 1;
						break;
					}
				}
			}
		}
		else if(typeof field == 'string') {
			for(var i = 0; i < condList.length; i++) { //Check all values of a condition
				if(field != condList[i].trim()) {
					matches += 1;
					break;
				}
			}
		}
		else if(typeof field == 'object') {
			for(var i = 0; i < field.length; i++) { //Check all values of a condition
				if(typeof field[i] == 'number') {
					for(var j = 0; j < condList.length; j++) {
						if(condList[j].indexOf('-') >= 0) {
							if(field[i] >= Number(condList[j].split('-')[0]) && field[i] <= Number(condList[j].split('-')[1])) {
								return false;
							}
						}
						else {
							if(field[i] == Number(condList[j])) {
								return false
							}
						}
					}
				}
				else if(typeof field[i] == 'string') {
					for(var j = 0; j < condList.length; j++) {
						if(field[i] == condList[j].trim()) {
							return false
						}
					}
				}
				else {
					return undefined;
				}
			}
			return true;
		}
		else {
			return undefined;
		}
		return (matches == condList.length);
	}
	else if(condition.indexOf('>') >= 0) {
		var field = monster[Number(condition.split('>')[0].replace('$', '').trim()) - 1];
		var cond = Number(condition.split('>')[1]);
		if(typeof field == 'number') {
			return field > cond;
		}
		else if(typeof field == 'object') {
			for(var i = 0; i < field.length; i++) {
				if(typeof field[i] == 'number') {
					if(field[i] <= cond) {
						return false;
					}
				}
				else {
					return undefined;
				}
			}
			return true;
		}
	}
	else if(condition.indexOf('<') >= 0) {
		var field = monster[Number(condition.split('<')[0].replace('$', '').trim()) - 1];
		var cond = Number(condition.split('<')[1]);
		if(typeof field == 'number') {
			return field < cond;
		}
		else if(typeof field == 'string') {
			cond = cond.split(',');
			for(var i = 0; i < cond.length; i++) {
				if(field.indexOf(cond[i]) >= 0) {
					return true;
				}
			}
			return false;
		}
		else if(typeof field == 'object') {
			for(var i = 0; i < field.length; i++) {
				if(typeof field[i] == 'number') {
					if(field[i] >= cond) {
						return false;
					}
				}
				else {
					return undefined;
				}
			}
			return true;
		}
	}
	else {
		return undefined;
	}
}

function shuffle(list) {
	for(var i = list.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = list[i];
		list[i] = list[j];
		list[j] = temp;
	}
	return list;
}

function applyTemplate(name, instructions, monster, variant = true) {
	for(var i = 0; i < instructions.length; i++) {
		var field = instructions[i].split('~')[0];
		var instr = instructions[i].split('~')[1];
		if(instr.indexOf('?') >= 0 && instr.indexOf(':') >= 0) {
			var instrIf = instr.split('?')[0];
			var instrThen = instr.split('?')[1].split(':')[0];
			var instrElse = instr.slice(instr.indexOf(':') + 1);
			if(checkCondition(instrIf, monster.slice(0))) {
				monster = applyInstruction(field, instrThen, monster.slice(0));
			}
			else if(checkCondition(instrIf, monster) == undefined) {
				return monster;
			}
			else {
				monster = applyTemplate(name, [field + '~' + instrElse], monster.slice(0), false);
			}
		}
		else {
			monster = applyInstruction(field, instructions[i].split('~')[1], monster.slice(0));
		}
	}
	if(variant) {
		if(monster[19] == '') {
			monster[19] = genLink(name, [-1]);
		}
		else {
			monster[19] += ', ' + genLink(name, [-1]);
		}
	}
	return monster;
}

function applyInstruction(field, instruction, monster) {
	field = Number(field.replace('$', '')) - 1;
	if(instruction.indexOf('+') >= 0) {
		if(instruction.split('+')[0].indexOf('$') >= 0) {
			var oldField = Number(instruction.split('+')[0].replace('$', '')) - 1;
			var added = instruction.split('+')[1];
		}
		else {
			var oldField = Number(instruction.split('+')[1].replace('$', '')) - 1;
			var added = instruction.split('+')[0];
		}
		if(!((fNumber.indexOf(field) >= 0 && fNumber.indexOf(oldField) >= 0) || (fString.indexOf(field) >= 0 && fString.indexOf(oldField) >= 0) || (fArrayNumberList.indexOf(field) >= 0 && fArrayNumberList.indexOf(oldField) >= 0) || (fArrayNumberSum.indexOf(field) >= 0 && fArrayNumberSum.indexOf(oldField) >= 0) || (fArrayNumberCR.indexOf(field) >= 0 && fArrayNumberCR.indexOf(oldField) >= 0) || (fArrayString.indexOf(field) >= 0 && fArrayString.indexOf(oldField) >= 0))) {
			return undefined;
		}
		if(fNumber.indexOf(field) >= 0) { //Sum of two numbers
			monster[field] = monster[oldField] + Number(added);
		}
		else if(fArrayNumberList.indexOf(field) >= 0) { //Add to array of numbers
			added = added.split(',');
			for(var i = 0; i < added.length; i++) {
				added[i] = Number(added[i]);
			}
			monster[field] = [...new Set(monster[oldField].concat(added))]; //also removes duplicates
			monster[field].sort();
		}
		else if(fArrayNumberSum.indexOf(field) >= 0) { //Add to array of summable numbers
			added = Number(added);
			var temp = monster[oldField].slice(0);
			for(var i = 0; i < temp.length; i++) {
				temp[i] += added;
			}
			monster[field] = temp;
		}
		else if(fArrayNumberCR.indexOf(field) >= 0) { //Add to array of CR
			added = Number(added);
			var temp = monster[oldField].slice(0);
			temp[0] += added;
			monster[field] = temp;
		}
		else if(fArrayString.indexOf(field) >= 0) { //Add to array of strings
			added = added.split(',');
			monster[field] = monster[oldField].concat(added);
		}
		else {
			return undefined;
		}
	}
	else if(instruction.indexOf('-') >= 0 && fString.indexOf(field) == -1 && fArrayString.indexOf(field) == -1) {
		if(instruction.split('-')[0].indexOf('$') >= 0) {
			var oldField = Number(instruction.split('-')[0].replace('$', '')) - 1;
			var subtracted = instruction.split('-')[1];
			var sign = 1;
		}
		else {
			var oldField = Number(instruction.split('-')[1].replace('$', '')) - 1;
			var subtracted = instruction.split('-')[0];
			var sign = -1;
		}
		if(!((fNumber.indexOf(field) >= 0 && fNumber.indexOf(oldField) >= 0) || (fString.indexOf(field) >= 0 && fString.indexOf(oldField) >= 0) || (fArrayNumberList.indexOf(field) >= 0 && fArrayNumberList.indexOf(oldField) >= 0) || (fArrayNumberSum.indexOf(field) >= 0 && fArrayNumberSum.indexOf(oldField) >= 0) || (fArrayNumberCR.indexOf(field) >= 0 && fArrayNumberCR.indexOf(oldField) >= 0) || (fArrayString.indexOf(field) >= 0 && fArrayString.indexOf(oldField) >= 0))) {
			return undefined;
		}
		if(fNumber.indexOf(field) >= 0) { //Subtraction of two numbers
			monster[field] = sign * (monster[oldField] + Number(subtracted));
		}
		else if(fArrayNumberList.indexOf(field) >= 0) { //Remove from array of numbers
			subtracted = subtracted.split(',');
			var temp_array = monster[oldField];
			for(var i = 0; i < subtracted.length; i++) {
				subtracted[i] = Number(subtracted[i]);
				if(temp_array.indexOf(subtracted[i]) >= 0) {
					temp_array = temp_array.slice(temp_array.indexOf(subtracted[i]), 1);
				}
			}
			monster[field] = temp_array;
		}
		else if(fArrayNumberSum.indexOf(field) >= 0) { //Subtract from array of summable numbers
			subtracted = Number(subtracted);
			var temp = monster[oldField].slice(0);
			for(var i = 0; i < temp.length; i++) {
				temp[i] -= subtracted;
			}
			monster[field] = temp;
		}
		else if(fArrayNumberCR.indexOf(field) >= 0) { //Subtract from array of CR
			subtracted = Number(subtracted);
			var temp = monster[oldField].slice(0);
			temp[0] -= subtracted;
			monster[field] = temp;
		}
		else if(fArrayString.indexOf(field) >= 0) { //Remove from array of strings
			subtracted = subtracted.split(',');
			var temp_array = monster[oldField];
			for(var i = 0; i < subtracted.length; i++) {
				if(temp_array.indexOf(substracted[i].trim()) >= 0) {
					temp_array = temp_array.slice(temp_array.indexOf(substracted[i].trim()), 1);
				}
			}
			monster[field] = temp_array;
		}
		else {
			return undefined;
		}
	}
	else {
		if(fNumber.indexOf(field) >= 0) {
			if(instruction.indexOf('$') >= 0) {
				var oldField = Number(instruction.replace('$', '')) - 1;
				if(!((fNumber.indexOf(field) >= 0 && fNumber.indexOf(oldField) >= 0) || (fString.indexOf(field) >= 0 && fString.indexOf(oldField) >= 0) || (fArrayNumberList.indexOf(field) >= 0 && fArrayNumberList.indexOf(oldField) >= 0) || (fArrayNumberSum.indexOf(field) >= 0 && fArrayNumberSum.indexOf(oldField) >= 0) || (fArrayNumberCR.indexOf(field) >= 0 && fArrayNumberCR.indexOf(oldField) >= 0) || (fArrayString.indexOf(field) >= 0 && fArrayString.indexOf(oldField) >= 0))) {
					return undefined;
				}
				monster[field] = monster[oldField];
			}
			else {
				monster[field] = Number(instruction);
			}
		}
		else if(fString.indexOf(field) >= 0) {
			if(instruction.indexOf('$') >= 0) {
				var oldField = instruction.split('$')[1];
				if(oldField.length > 1 && '0123456789'.indexOf(oldField.substr(1, 1)) >= 0) {
					oldField = Number(oldField.substr(0, 2)) - 1;
				}
				else {
					oldField = Number(oldField.substr(0, 1)) - 1;
				}
				if(!((fNumber.indexOf(field) >= 0 && fNumber.indexOf(oldField) >= 0) || (fString.indexOf(field) >= 0 && fString.indexOf(oldField) >= 0) || (fArrayNumberList.indexOf(field) >= 0 && fArrayNumberList.indexOf(oldField) >= 0) || (fArrayNumberSum.indexOf(field) >= 0 && fArrayNumberSum.indexOf(oldField) >= 0) || (fArrayNumberCR.indexOf(field) >= 0 && fArrayNumberCR.indexOf(oldField) >= 0) || (fArrayString.indexOf(field) >= 0 && fArrayString.indexOf(oldField) >= 0))) {
					return undefined;
				}
				if(field == 0 && monster[19] == '' && monster[oldField].indexOf('[') == -1) {
					monster[field] = instruction.replace('$' + String(oldField + 1), '[' + monster[oldField] + ']');
				}
				else {
					monster[field] = instruction.replace('$' + String(oldField + 1), monster[oldField]);
				}
			}
			else {
				monster[field] = instruction.trim();
			}
		}
		else if(fArrayNumberList.indexOf(field) >= 0 || fArrayNumberSum.indexOf(field) >= 0) {
			if(instruction.indexOf('$') >= 0) {
				var oldField = Number(instruction.replace('$', '')) - 1;
				if(!((fNumber.indexOf(field) >= 0 && fNumber.indexOf(oldField) >= 0) || (fString.indexOf(field) >= 0 && fString.indexOf(oldField) >= 0) || (fArrayNumberList.indexOf(field) >= 0 && fArrayNumberList.indexOf(oldField) >= 0) || (fArrayNumberSum.indexOf(field) >= 0 && fArrayNumberSum.indexOf(oldField) >= 0) || (fArrayNumberCR.indexOf(field) >= 0 && fArrayNumberCR.indexOf(oldField) >= 0) || (fArrayString.indexOf(field) >= 0 && fArrayString.indexOf(oldField) >= 0))) {
					return undefined;
				}
				monster[field] = monster[oldField];
			}
			else {
				instruction = instruction.split(',');
				for(var i = 0; i < instruction.length; i++) {
					instruction[i] = Number(instruction[i]);
				}
				monster[field] = instruction;
			}
		}
		else if(fArrayNumberCR.indexOf(field) >= 0) {
			if(instruction.indexOf('$') >= 0) {
				var oldField = Number(instruction.replace('$', '')) - 1;
				if(!((fNumber.indexOf(field) >= 0 && fNumber.indexOf(oldField) >= 0) || (fString.indexOf(field) >= 0 && fString.indexOf(oldField) >= 0) || (fArrayNumberList.indexOf(field) >= 0 && fArrayNumberList.indexOf(oldField) >= 0) || (fArrayNumberSum.indexOf(field) >= 0 && fArrayNumberSum.indexOf(oldField) >= 0) || (fArrayNumberCR.indexOf(field) >= 0 && fArrayNumberCR.indexOf(oldField) >= 0) || (fArrayString.indexOf(field) >= 0 && fArrayString.indexOf(oldField) >= 0))) {
					return undefined;
				}
				monster[field] = monster[oldField];
			}
			else {
				instruction = Number(instruction);
				monster[field] = [instruction];
			}
		}
		else if(fArrayString.indexOf(field) >= 0) {
			if(instruction.indexOf('$') >= 0) {
				var oldField = Number(instruction.replace('$', '')) - 1;
				if(!((fNumber.indexOf(field) >= 0 && fNumber.indexOf(oldField) >= 0) || (fString.indexOf(field) >= 0 && fString.indexOf(oldField) >= 0) || (fArrayNumber.indexOf(field) >= 0 && fArrayNumber.indexOf(oldField) >= 0) || (fArrayString.indexOf(field) >= 0 && fArrayString.indexOf(oldField) >= 0))) {
					return undefined;
				}
				monster[field] = monster[oldField];
			}
			else {
				instruction = instruction.split(',');
				monster[field] = instruction;
			}
		}
		else {
			return undefined;
		}
	}
	return monster;
}