module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		conf: grunt.file.readYAML('conf.yml'),
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			all: ['dist', 'tmp']
		},
		assemble: {
			options: {
				helpers: 'src/templates/helpers/helper-*.js',
				layoutdir: 'src/templates/layouts',
				partials: [
					'src/templates/layouts/*.hbs',
					'src/templates/partials/*.hbs'],
				flatten: true
			},
			index: {
				options: {
					data: ['src/data/*.{yml,json}'],
					layout: 'index.hbs'
				},
				src: ['src/templates/site/index.hbs'],
				dest: 'tmp/assemble/'
			}
		},
		jshint: {
			options: grunt.file.readYAML('jshint.yml'),
			gruntfile: ['Gruntfile.js']
		},
		release: {
			options: {}
		},
		watch: {
			data: {
				files: 'src/data/*.{yml,json}',
				tasks: ['assemble']
			},
			template: {
				files: 'src/templates/**/*.{js,hbs}',
				tasks: ['assemble']
			}
		}
	});

	grunt.registerTask('default', []);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('build', ['clean', 'test']);
};
