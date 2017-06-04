/* jshint node: true */

module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		eslint: {
			options: {
				config: '.eslintrc',
				reset: true
			},
			src: ['src/js/**/*.js']
		},
		babel: {
			dev: {
				options: {
					sourceMap: false
				},
				files: [
					{
						expand: true,
						cwd: 'src/js/',
						src: ['*.js', '**/*.js'],
						dest: 'build/'
					}
				]
			}
		},
		csslint: {
			src: [
				'src/css/beyond.css'
			],
			options: {
				'box-model': false,     // true: Using width with padding can sometimes make elements larger than you expect.
				gradients: false,     // true: Missing vendor-prefixed CSS gradients for Old Webkit (Safari 4+, Chrome).
				ids: false,     // true: Don't use IDs in selectors. Selectors should not contain IDs.
				important: false      // true: Use of !important. Be careful when using !important declaration.
			}
		},
		lintspaces: {
			src: [
				'Gruntfile.js',
				'.travis.yml',
				'package.json',
				'src/css/beyond.css'
			],
			options: {
				editorconfig: '.editorconfig',
				ignores: ['js-comments']
			}
		},
		clean: {
			styles: ['dist/css/*'],
			images: ['dist/images/*'],
			scripts: [
				'dist/js/*',
				'dist/js/**/*',
				'build/**/*'],
		},
		concat: {
			metauser: {
				src: [
					'build/meta.js'
				],
				dest: 'dist/ob.meta.js'
			},
			userscript: {
				src: [
					'build/user.js',
					'build/meta.js',
					'build/util.js',
					'build/modules/brc.js',
					'build/main.js'
				],
				dest: 'dist/ob.user.js'
			}
		},
		copy: {
			styles: {
				expand: true,
				cwd: 'src/css',
				src: ['**/*.css'],
				dest: 'dist/css'
			}
		},

		imagemin: {
			dist: {
				options: {
					optimizationLevel: 5,
				},
				files: [{
					expand: true,
					cwd: 'src/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/images'
				}]
			}
		},

		watch: {
			options: {
				interrupt: true,
				interval: 1000
			},
			styles: {
				files: ['src/css/*.css'],
				tasks: ['styles']
			},
			scripts: {
				files: ['src/js/**/*.js'],
				tasks: ['scripts']
			},
			images: {
				files: ['src/images/**/*'],
				tasks: ['images']
			}
		}
	});

	// Load any grunt plugins found in package.json.
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
	require('time-grunt')(grunt);

	grunt.registerTask('styles', [
		'csslint',
		'clean:styles',
		'copy:styles'
	]);

	grunt.registerTask('scripts', [
		'eslint',
		'clean:scripts',
		'babel',
		'concat',
	]);

	grunt.registerTask('images', [
		'clean:images',
		'imagemin'
	]);

	grunt.registerTask('default', [
		'scripts',
		'styles',
		'images'
	]);

	grunt.loadNpmTasks('grunt-contrib-watch');
};
