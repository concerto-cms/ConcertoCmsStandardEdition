/*global module:false*/
var path = require('path');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        folders: {
            components: 'bower_components',
            target: 'web'
        },
		bundle: {
            core: 'vendor/concerto-cms/core-bundle/ConcertoCms/CoreBundle/Resources'
		},
        // Task configuration.
        concat: {
            /* Main.js - Essential JS that is used in (practically) every page */
            base: {
                src: [
                    '<%= folders.components %>/jquery/jquery.js',
                    '<%= folders.components %>/underscore/underscore.js',
                    '<%= folders.components %>/backbone/backbone.js',
                    '<%= folders.components %>/loglevel/dist/loglevel.js',
                    '<%= folders.components %>/bootstrap/js/collapse.js',
                    '<%= folders.components %>/bootstrap/js/dropdown.js',
                    '<%= folders.components %>/twig.js/twig.js',
                    '<%= bundle.core %>/js/Model/*.js',
                    '<%= bundle.core %>/js/Collection/*.js',
                    '<%= bundle.core %>/js/View/*.js'
                ],
                dest: '<%= folders.target %>/js/base.js',
                nonull: true
            }
        },
        less: {
            base: {
                options: {
                    paths: [
                        '<%= folders.components %>',
                        '<%= bundle.core %>/less'
                    ]
                },
                files: {
                    '<%= folders.target %>/css/screen.css': "<%= bundle.core %>/less/base.less"
                }
            }
        },
        watch: {
            less: {
                files: '<%= bundle.core %>/less/**/*.less',
                tasks: ['less']
            },
            js: {
                files: '<%= bundle.core %>/js/**/*.js',
                tasks: ['js']
            },
            twig: {
                files: '<%= bundle.core %>/twigjs/**/*.twig',
                tasks: ['twig']
            }

        },
        twig: {
            options: {
                amd_wrapper: false,
                template_key: path.basename
            },
            core: {
                files: {
                    '<%= folders.target%>/js/templates.core.js' : [
                        '<%= bundle.core %>/twigjs/*.twig'
                    ]
                }
            }
        },
        copy:
        {
            glyphicons: {
                files: [
                    {
                        src: '*',
                        dest: '<%=folders.target%>/fonts/',
                        expand: true,
                        cwd: '<%=folders.components%>/bootstrap/dist/fonts/'
                    }
                ]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-twig');

    // Task aliases
    grunt.registerTask('js', ['concat']);
    grunt.registerTask('css', ['less']);

    // Build & Deploy
    grunt.registerTask('default', ['copy', 'twig', 'js', 'css']);
    grunt.registerTask('deploy', ['default', 'uglify']);
};