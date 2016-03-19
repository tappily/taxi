define(['can/map', 'jquery', 'can/map/define'], function($map, $jQuery) {

	var Type = $map.extend({
		define: {
			target: {
				type: 'string'
			},
			id: {
				get: function() {
					return this.attr('target').substr(1);
				},
				set: function(id) {
					return this.attr('target', '#'.concat(id));
				},
				type: 'string'
			},
			params: {
				Value: $map
			}
		}
	});

	var out = $jQuery.Deferred();

	$jQuery(function() {
		var map = new Type();
		var search_string = window.location.search;
		if(search_string) {
			var search = search_string.substr(1).split("&");

			for(var i = 0; i < search.length; i++) {
				var param = search[i].split('=');
				map.params.attr(param[0], param[1]);
			}

		}
		map.attr('target', window.location.hash);
		out.resolve(map);
	});

	return out;

});
