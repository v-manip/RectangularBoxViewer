module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
		// Installation directory based on the V-MANIP organization repository:
		installdir: '../WebClient-Framework/app/scripts/vendor/rectangularboxviewer',
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.debug.js': ['src/viewer.js', 'src/**/*.js'],
					'dist/<%= pkg.name %>-deps.debug.js': ['deps/*.js']
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						flatten: true,
						expand: true,
						src: ['dist/*.js'],
						dest: '<%= installdir %>'
					}
				]
			},
		},

		watch: {
            scripts: {
                files: ['src/**/*.js', 'deps/*.js'],
                tasks: ['default']
            }
        }
	});

    grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'copy']);
};
