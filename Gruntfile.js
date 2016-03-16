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
					data: ['src/data/index/*.{yml,json}'],
					layout: 'index.hbs'
				},
				src: ['src/templates/site/index.hbs'],
				dest: 'tmp/assemble/'
			},
			wizard: {
				options: {
					data: ['src/data/wizard/*.{yml,json}'],
					layout: 'article.hbs'
				},
				src: ['src/templates/site/wizard.hbs'],
				dest: 'tmp/assemble/'
			}
		},
		connect: {
			server: {
				options: {
					port: 9000,
					base: ['tmp/assemble'],
					open: true,
					livereload: true
				}
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
			options: {
				livereload: true
			},
			data: {
				files: 'src/data/**/*.{yml,json}',
				tasks: ['assemble']
			},
			temp: {
				files: ['tmp/assemble/**/*']
			},
			site: {
				files: 'src/site/**/*',
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
	grunt.registerTask('build', ['clean', 'test', 'assemble']);
	grunt.registerTask('live', ['build', 'connect:server', 'watch']);
};
