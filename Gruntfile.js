/*jslint node: true */
"use strict";


module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: 'src/assets/libs',
                    cleanTargetDir: true
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/app.js': [ 'dist/app.js' ]
                },
                options: {
                    mangle: false
                }
            }
        },

        html2js: {
            dist: {
                src: [ 'src/app/**/*.tpl.html' ],
                dest: 'tmp/templates.js'
            }
        },

        clean: {
            temp: {
                src: [ 'tmp' ]
            },
            dist: {
                src: [ 'dist' ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ 'src/assets/js/*.js', 'src/app/**/*.js', 'tmp/*.js' ],
                dest: 'dist/app.js'
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'src/app/**/*.js', 'src/assets/js/*.js'],
            options: {
                "strict": "global",
                "node": true,
                "globals": {

                    // Angular
                    "angular": false,

                    // Angular mocks
                    "module": false,
                    "inject": false,

                    // Jasmine
                    "jasmine": false,
                    "describe": false,
                    "beforeEach": false,
                    "afterEach": false,
                    "it": false,
                    "expect": false,

                    // Protractor
                    "browser": false,
                    "element": false,
                    "by": false,

                    // Plupload
                    "plupload": false
                }
            }
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8090,
                    base: 'src'
                }
            },
            test: {
                options: {
                    hostname: 'localhost',
                    port: 8092,
                    base: 'src'
                }
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'src/app/**/*.js', 'src/app/**/*.tpl.html', 'src/assets/js/*.js', 'karma.conf.js' ],
                tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp' ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'src/app/**/*.js', 'src/app/**/*.tpl.html' ],
                tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
                options: {
                    atBegin: true
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: [ 'src/index.html' ],
                    dest: '/'
                }, {
                    src: [ 'dist/**' ],
                    dest: 'dist/'
                }, {
                    src: [ 'src/assets/**' ],
                    dest: 'dist/assets/'
                }]
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },

        protractor: {
            options: {
                configFile: 'e2e-tests/protractor.conf.js',
                noColor: false,
                args: {}
            },
            e2e: {
                options: {
                    keepAlive: false
                }
            },
            continuous: {
                options: {
                    keepAlive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');

    grunt.registerTask('dev', [ 'bower', 'connect:server', 'watch:dev' ]);
    grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
    grunt.registerTask('unit', ['jshint', 'karma:unit']);
    grunt.registerTask('e2e', ['jshint', 'connect:test', 'protractor:e2e']);
    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
    grunt.registerTask('package', [ 'bower', 'clean:dist', 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
        'clean:temp', 'compress:dist' ]);
};