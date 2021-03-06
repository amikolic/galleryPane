/* jshint node: true */
module.exports = function(grunt) {

    grunt.initConfig({

        npmPackage: grunt.file.readJSON('package.json'),
        bowerPackage: grunt.file.readJSON('bower.json'),

        uglify: {
            min: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'dist',
                    ext: '.min.js'
                }]
            }
        },

        copy: {
            jsFiles: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'dist'
                }]
            }
        },

        jshint: {
            options: {
                'jshintrc': '.jshintrc',
                'reporterOutput': ''
            },
            all: ['src','Gruntfile.js']
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            scripts: {
                files: {
                    src: [
                        'src/**/*.js'
                    ]
                }
            }
        },

        sass: {
            min: {
                files: {
                    'dist/gallery-pane.min.css': 'src/gallery-pane.scss',
                    'demo/resources/css/demo.min.css': 'demo/resources/scss/demo.scss'
                },
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false,
                    precision: 5,
                    includePaths: ['node_modules']
                }
            },
            expanded: {
                files: {
                    'dist/gallery-pane.css': 'src/gallery-pane.scss',
                    'demo/resources/css/demo.css': 'demo/resources/scss/demo.scss'
                },
                options: {
                    outputStyle: 'expanded',
                    sourceMap: false,
                    precision: 5,
                    includePaths: ['node_modules']
                }
            }
        },

        watch: {
            jsFiles: {
                expand: true,
                files: ['src/**/*.js', 'Gruntfile.js'],
                tasks: ['jshint', 'jscs', 'copy','uglify'],
                options: {
                    spawn: false
                }
            },
            cssFiles: {
                expand: true,
                files: ['src/**/*.scss','demo/resources/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['package.json', 'bower.json'],
                tagName: '%VERSION%',
                push: false
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'jscs', 'uglify', 'copy', 'sass']);

};
