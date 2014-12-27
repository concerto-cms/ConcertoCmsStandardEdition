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
            admin:       'src/ConcertoCms/AdminBundle/Resources'
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
                    '<%= folders.components %>/twig.js/twig.js'
                ],
                dest: '<%= folders.target %>/js/base.js',
                nonull: true
            }
        },
        less: {
            app: {
                options: {
                    paths: [
                        '<%= folders.components %>',
                        '<%= bundle.admin %>/less'
                    ]
                },
                files: {
                    '<%= folders.target %>/css/app.css': "<%= bundle.admin %>/less/css-app.less"
                }
            }
        },
        watch: {
            less: {
                files: '<%= bundle.admin %>/less/**/*.less',
                tasks: ['less:app']
            },
            js: {
                files: '<%= bundle.admin %>/js/**/*.js',
                tasks: ['js']
            },
            twig: {
                files: '<%= bundle.admin %>/twigjs/**/*.twig',
                tasks: ['twig:admin']
            }
        },
        twig: {
            options: {
                amd_wrapper: false,
                each_template: '{{ variable }}["{{ filepath }}"] = Twig.twig({ allowInlineIncludes: true, id: "{{ filepath }}", data: {{ compiled }} });',
                template_key: path.basename
            },
            admin: {
                files: {
                    '<%= folders.target%>/js/templates.admin.js' : [
                        '<%= bundle.admin %>/twigjs/*.twig'
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