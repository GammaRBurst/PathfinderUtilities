function setCR(cr) {
	$('#cr_slide').slider({'values': cr});
	$('#cr_min').val(cr[0]);
	if(cr[0] <= 0) {
		$('#cr_min2').html(values[-cr[0]]);
	}
	else {
		$('#cr_min2').html(cr[0]);
	}
	$('#cr_max').val(cr[1]);
	if(cr[1] <= 0) {
		$('#cr_max2').html(values[-cr[1]]);
	}
	else {
		$('#cr_max2').html(cr[1]);
	}
}

function setSize(size) {
	$('#size_slide').slider({'values': size});
	$('#size_min').val(size[0]);
	$('#size_min2').html(sizes[size[0]]);
	$('#size_max').val(size[1]);
	$('#size_max2').html(sizes[size[1]]);
}

function setSlider(name, values) {
	$('#' + name + '_slide').slider({'values': values});
	$('#' + name + '_min').val(values[0]);
	$('#' + name + '_min2').html(values[0]);
	$('#' + name + '_max').val(values[1]);
	$('#' + name + '_max2').html(values[1]);
}

function setScore(score, values) {
	$('#' + score + '_slide').slider({'values': values});
	$('#' + score + '_min').val(values[0]);
	if(values[0] == 0) {
		$('#' + score + '_min2').html('-');
	}
	else {
		$('#' + score + '_min2').html(values[0]);
	}
	$('#' + score + '_max').val(values[1]);
	if(values[1] == 0) {
		$('#' + score + '_max2').html('-');
	}
	else {
		$('#' + score + '_max2').html(values[1]);
	}
}

function readyPage(values, sizes) {
	//Add arrows
	$('.show').prepend('<span class="ui-icon ui-icon-triangle-1-e"></span> ');
	$('.hide').prepend('<span class="ui-icon ui-icon-triangle-1-s"></span> ');
	
	//Show/Hide advanced parameters
	$('.show').click(function() {
		var name = $(this).attr('id').replace('show_', '');
		$('#show_' + name).hide();
		$('#' + name).show();
	});
	$('.hide').click(function() {
		var name = $(this).attr('id').replace('hide_', '');
		$('#show_' + name).show();
		$('#' + name).hide();
	});
	
	//Checkbox behaviour
	$('input.cbox_trad + label, input.cbox_yesno + label, input.cbox_yesonly + label').contextmenu(function() { //Disables right click context menu on labels
		return false;
	});
	$('input.cbox_trad + label').mousedown(function(event) { //Standard checkbox
		if(event.which == 3) {
			var id = $(this).prop('for');
			$('input#' + id).click();
		}
	});
	$('input.cbox_yesno + label').mousedown(function(event) { //Three-values checkbox, NOT variant
		var id = $(this).prop('for');
		if(event.which == 1) {
			if($('input#' + id).prop('checked')) {
				if($('input#' + id).hasClass('cbox_no')) {
					$('input#' + id).removeClass('cbox_no');
					$('input#' + id).val($('input#' + id).val() * -1)
				}
				else {
					$('input#' + id).addClass('cbox_no');
					$('input#' + id).prop('checked', false);
					$('input#' + id).val($('input#' + id).val() * -1)
				}
			}
		}
		else if(event.which == 3) {
			if($('input#' + id).prop('checked')) {
				if($('input#' + id).hasClass('cbox_no')) {
					$('input#' + id).removeClass('cbox_no');
					$('input#' + id).val($('input#' + id).val() * -1)
				}
				else {
					$('input#' + id).prop('checked', false);
				}
			}
			else {
				$('input#' + id).addClass('cbox_no');
				$('input#' + id).prop('checked', true);
				$('input#' + id).val($('input#' + id).val() * -1)
			}
		}
	});
	$('input.cbox_yesonly + label').mousedown(function(event) { //Three-values checkbox, ONLY variant
		var id = $(this).prop('for');
		if(event.which == 1) {
			if($('input#' + id).prop('checked')) {
				if($('input#' + id).hasClass('cbox_only')) {
					$('input#' + id).removeClass('cbox_only');
					$('input#' + id).val($('input#' + id).val() * -1)
				}
				else {
					$('input#' + id).addClass('cbox_only');
					$('input#' + id).prop('checked', false);
					$('input#' + id).val($('input#' + id).val() * -1)
				}
			}
		}
		else if(event.which == 3) {
			if($('input#' + id).prop('checked')) {
				if($('input#' + id).hasClass('cbox_only')) {
					$('input#' + id).removeClass('cbox_only');
					$('input#' + id).val($('input#' + id).val() * -1)
				}
				else {
					$('input#' + id).prop('checked', false);
				}
			}
			else {
				$('input#' + id).addClass('cbox_only');
				$('input#' + id).prop('checked', true);
				$('input#' + id).val($('input#' + id).val() * -1)
			}
		}
	});
	
	//Check/Notcheck/Uncheck all
	$('input.check').click(function() {
		var type = $(this).attr('name').replace('check', '');
		$('input[name=' + type + ']').each(function() {
			$(this).prop('checked', true);
			$(this).removeClass('cbox_no');
			$(this).val(Math.abs($(this).val()));
		});
	});
	$('input.notcheck').click(function() {
		var type = $(this).attr('name').replace('notcheck', '');
		$('input[name=' + type + ']').each(function() {
			$(this).prop('checked', true);
			$(this).addClass('cbox_no');
			$(this).val(Math.abs($(this).val()) * -1);
		});
	});
	$('input.uncheck').click(function() {
		var type = $(this).attr('name').replace('uncheck', '');
		$('input[name=' + type + ']').each(function() {
			$(this).prop('checked', false);
			$(this).removeClass('cbox_no');
			$(this).val(Math.abs($(this).val()));
		});
	});
	
	//Challenge Rating slider
	$('#cr_slide').slider({
		range: true,
		min: -4,
		max: 30,
		values: [-4, 30],
		slide: function(event, ui) {
			setCR(ui.values);
		}
	});
	setCR($('#cr_slide').slider('values'));
	
	//Mythic Rank slider
	$('#mr_slide').slider({
		range: true,
		min: 0,
		max: 10,
		values: [0, 10],
		slide: function(event, ui) {
			setSlider('mr', ui.values);
		}
	});
	setSlider('mr', $('#mr_slide').slider('values'));
	
	//Size slider
	$('#size_slide').slider({
		range: true,
		min: 0,
		max: 8,
		values: [0, 8],
		slide: function(event, ui) {
			setSize(ui.values);
		}
	});
	setSize($('#size_slide').slider('values'));
	
	//HD slider
	$('#hd_slide').slider({
		range: true,
		min: 1,
		max: 40,
		values: [1, 40],
		slide: function(event, ui) {
			setSlider('hd', ui.values);
		}
	});
	setSlider('hd', $('#hd_slide').slider('values'));
	
	//Ability scores sliders
	$('#str_slide').slider({
		range: true,
		min: 0,
		max: 60,
		values: [0, 60],
		slide: function(event, ui) {
			setScore('str', ui.values);
		}
	});
	setScore('str', $('#str_slide').slider('values'));
	
	$('#dex_slide').slider({
		range: true,
		min: 0,
		max: 60,
		values: [0, 60],
		slide: function(event, ui) {
			setScore('dex', ui.values);
		}
	});
	setScore('dex', $('#dex_slide').slider('values'));
	
	$('#con_slide').slider({
		range: true,
		min: 0,
		max: 60,
		values: [0, 60],
		slide: function(event, ui) {
			setScore('con', ui.values);
		}
	});
	setScore('con', $('#con_slide').slider('values'));
	
	$('#int_slide').slider({
		range: true,
		min: 0,
		max: 60,
		values: [0, 60],
		slide: function(event, ui) {
			setScore('int', ui.values);
		}
	});
	setScore('int', $('#int_slide').slider('values'));
	
	$('#wis_slide').slider({
		range: true,
		min: 0,
		max: 60,
		values: [0, 60],
		slide: function(event, ui) {
			setScore('wis', ui.values);
		}
	});
	setScore('wis', $('#wis_slide').slider('values'));
	
	$('#cha_slide').slider({
		range: true,
		min: 0,
		max: 60,
		values: [0, 60],
		slide: function(event, ui) {
			setScore('cha', ui.values);
		}
	});
	setScore('cha', $('#cha_slide').slider('values'));
	
	//Simple list
	$('#slist').click(function() {
		if($(this).prop('checked')) {
			$('.not_slist').prop('disabled', true);
			$('#cr_comb_slide').slider('disable');
		}
		else {
			$('.not_slist').prop('disabled', false);
			$('#cr_comb_slide').slider('enable');
		}
	});
	
	//CR combination slider
	$('#cr_comb_slide').slider({
		range: true,
		min: 0,
		max: 10,
		values: [0, 4],
		slide: function(event, ui) {
			setSlider('cr_comb', ui.values);
		}
	});
	setSlider('cr_comb', $('#cr_comb_slide').slider('values'));
}