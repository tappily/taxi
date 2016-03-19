define(['module', 'can/control'], function($module, $control) {

	var TargetableControl = $control.extend({
		default: {
			target: null
		}
	}, {
		'{target} change': function() {
			console.log(arguments);
		},
		'change': function(el, ev) {
			this.options.target.attr(ev.target.name, ev.target.value);
		}
	});

	return function($target) {
		return new TargetableControl('[action="#wizard"]', {
			target: $target
		});
	}
});
