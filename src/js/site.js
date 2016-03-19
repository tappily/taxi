define(['module', 'main', 'target'], function($module, $app, $target) {
	return $target.done(function($target) {
		$app($target);
	});
});

