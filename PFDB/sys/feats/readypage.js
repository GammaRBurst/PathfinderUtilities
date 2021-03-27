function readyPage() {
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
	$('input.cbox_trad + label, input.cbox_yesno + label').contextmenu(function() { //Disables right click context menu on labels
		return false;
	});
	$('input.cbox_trad + label').mousedown(function(event) { //Standard checkbox
		if(event.which == 3) {
			var id = $(this).prop('for');
			$('input#' + id).click();
		}
	});
	$('input.cbox_yesno + label').mousedown(function(event) { //Three-values checkbox
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
	
	//Check/Notcheck/Uncheck all
	$('input.check').click(function() {
		var type = $(this).attr('name').replace('_check', '');
		$('input[name=' + type + ']').each(function() {
			$(this).prop('checked', true);
			$(this).removeClass('cbox_no');
			$(this).val(Math.abs($(this).val()));
		});
	});
	$('input.notcheck').click(function() {
		var type = $(this).attr('name').replace('_notcheck', '');
		$('input[name=' + type + ']').each(function() {
			$(this).prop('checked', true);
			$(this).addClass('cbox_no');
			$(this).val(Math.abs($(this).val()) * -1);
		});
	});
	$('input.uncheck').click(function() {
		var type = $(this).attr('name').replace('_uncheck', '');
		$('input[name=' + type + ']').each(function() {
			$(this).prop('checked', false);
			$(this).removeClass('cbox_no');
			$(this).val(Math.abs($(this).val()));
		});
	});
}