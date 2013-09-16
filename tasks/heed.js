/*
 * grunt-heed
 * https://github.com/paulcurley/grunt-heed
 *
 * Copyright (c) 2013 Paul Curley
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function (grunt) {
    grunt.registerMultiTask('heed', 'Put in the heed', function () {
        this.files.forEach(function (f) {
            var dir = require('path').dirname(f.src) ;    
            var content =  grunt.file.read(f.src);
            var newContent = content;
            var cssTags = newContent.match(/<link[^>]+href=[^>]+(\.css)[^>]+>/gm);
            var jsTags = newContent.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gm);
            var processedInput = [];
            var process = function(arr, regex, type) {
                if (arr) {
                    var processedContent;
                    arr.forEach(function (tag) {
                        var filePath = tag.match(regex);
                        if (filePath) {
                            var file = grunt.file.read(dir + filePath[1]);
                            var tpl = "<" + type + ">" + grunt.util.normalizelf(file) +"</" + type + ">";
                            
                            processedInput.push(tpl);
                            newContent = newContent.replace(tag, '')
                        }
                    });
                }
            }

            
            process(cssTags, new RegExp(/href=[\'"]?([^\'" >]+)/), 'style');
            process(jsTags, new RegExp(/src=[\'"]?([^\'" >]+)/), 'script');
            var pos = newContent.match('</head>');
            newContent = newContent.substr(0, pos.index) + processedInput.join(" ") + newContent.substr(pos.index, newContent.length);
            grunt.file.write(f.dest, newContent);
            grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });
    
    

};
