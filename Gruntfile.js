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
            core:       'vendor/concerto-cms/core-bundle/ConcertoCms/CoreBundle/Resources',
            news:       'vendor/concerto-cms/news-bundle/ConcertoCms/NewsBundle/Resources',
            security:   'vendor/concerto-cms/security-bundle/ConcertoCms/SecurityBundle/Resources'
        },
        // Task configuration.
        concat: {
            base: {
                src: [
                    '<%= folders.components %>/jquery/dist/jquery.js',
                    '<%= folders.components %>/underscore/underscore.js',
                    '<%= folders.components %>/backbone/backbone.js',
                    '<%= folders.components %>/backbone.stickit/backbone.stickit.js',
                    '<%= folders.components %>/bootstrap/js/alert.js',
                    '<%= folders.components %>/bootstrap/js/collapse.js',
                    '<%= folders.components %>/bootstrap/js/dropdown.js',
                    '<%= folders.components %>/bootstrap/js/modal.js',
                    '<%= folders.components %>/bootstrap-growl-forked/bootstrap-growl.js',
                    '<%= folders.components %>/moment/moment.js',
                    '<%= folders.components %>/twig.js/twig.js',
                    '<%= folders.components %>/bootstrap-datepicker/js/bootstrap-datepicker.js',
                    '<%= bundle.core %>/js/fineuploader-4.4.0.js'
                ],
                dest: '<%= folders.target %>/js/base.js',
                nonull: true
            },
            app: {
                src: [
                    '<%= bundle.core %>/js/globals.js',
                    '<%= bundle.core %>/js/Model/*.js',
                    '<%= bundle.core %>/js/Collection/*.js',
                    '<%= bundle.core %>/js/View/*.js',
                    '<%= bundle.core %>/js/Controller/*.js',
                    '<%= bundle.news %>/js/Model/*.js',
                    '<%= bundle.news %>/js/Collection/*.js',
                    '<%= bundle.news %>/js/View/*.js',
                    '<%= bundle.news %>/js/Controller/*.js',
                ],
                dest: '<%= folders.target %>/js/app.js',
                nonull: true
            }
        },
        less: {
            app: {
                options: {
                    paths: [
                        '<%= folders.components %>',
                        '<%= bundle.core %>/less'
                    ]
                },
                files: {
                    '<%= folders.target %>/css/app.css': "<%= bundle.core %>/less/css-app.less"
                }
            },
            login: {
                options: {
                    paths: [
                        '<%= folders.components %>',
                        '<%= bundle.security %>/less'
                    ]
                },
                files: {
                    '<%= folders.target %>/css/login.css': "<%= bundle.security %>/less/css-login.less"
                }
            }

        },
        watch: {
            less: {
                files: '<%= bundle.core %>/less/**/*.less',
                tasks: ['less:app']
            },
            less2: {
                files: '<%= bundle.security %>/less/**/*.less',
                tasks: ['less:login']
            },
            js: {
                files: '<%= bundle.core %>/js/**/*.js',
                tasks: ['js']
            },
            js2: {
                files: '<%= bundle.news %>/js/**/*.js',
                tasks: ['js']
            },
            twig: {
                files: '<%= bundle.core %>/twigjs/**/*.twig',
                tasks: ['twig:core']
            },
            twignews: {
                files: '<%= bundle.news %>/twigjs/**/*.twig',
                tasks: ['twig:news']
            }

        },
        twig: {
            options: {
                amd_wrapper: false,
                each_template: '{{ variable }}["{{ filepath }}"] = Twig.twig({ allowInlineIncludes: true, id: "{{ filepath }}", data: {{ compiled }} });',
                template_key: path.basename
            },
            core: {
                files: {
                    '<%= folders.target%>/js/templates.core.js' : [
                        '<%= bundle.core %>/twigjs/*.twig'
                    ]
                }
            },
            news: {
                files: {
                    '<%= folders.target%>/js/templates.news.js' : [
                        '<%= bundle.news %>/twigjs/*.twig'
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