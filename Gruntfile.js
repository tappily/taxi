module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		conf: grunt.file.readYAML('conf.yml'),
		pkg: grunt.file.readJSON('package.json'),
		banner:  '/*!\n<%=pkg.name%> - v<%= pkg.version %> - <%= grunt.template.today("mm-dd-yyyy, h:MM:ss TT") %>\n'.concat(grunt.file.read('LICENSE'), '*/\n\n'),
		clean: {
			all: ['dist', 'tmp'],
			public: ['<%=conf.public%>'],
			'public-scripts': ['<%=conf.public%>/js']
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
				dest: '<%=conf.public%>/',
				src: ['src/templates/site/index.hbs']
			},
			wizard: {
				options: {
					data: ['src/data/wizard/*.{yml,json}'],
					layout: 'article.hbs'
				},
				dest: '<%=conf.public%>/',
				src: ['src/templates/site/wizard.hbs']
			}
		},
		concurrent: {
			public: ['requirejs:site', 'assemble'],
			'public-scripts': ['clean:public-scripts', ['test', 'requirejs:site']]
		},
		connect: {
			server: {
				options: {
					port: 9000,
					base: ['<%=conf.public%>'],
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
		requirejs: {
			options: {
				baseUrl: 'src/js',
				mainConfigFile: 'src/js/config.js',
				name: 'almond'
			},
			site: {
				options: {
					mainConfigFile: 'src/js/config.js',
					include: ['site'],
					out: '<%=conf.public%>/js/site.js',
					insertRequire: ['site']
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			data: {
				files: 'src/data/**/*.{yml,json}',
				tasks: ['assemble']
			},
			public: {
				files: ['<%=conf.public%>/**/*']
			},
			scripts: {
				files: 'src/js/**/*.js',
				tasks: ['concurrent:public-scripts']
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
	grunt.registerTask('live', ['clean', 'test', 'concurrent:public', 'connect:server', 'watch']);
};
