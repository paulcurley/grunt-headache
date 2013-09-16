/*
 * grunt-heed
 * https://github.com/paulcurley/grunt-heed
 *
 * Copyright (c) 2013 Paul Curley
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
      heed: {
        dist: {
            options: {                
            },
            files : {'tmp/build2.html' : 'tmp/demo.html'},
        }
    },
  });


  grunt.loadTasks('tasks');

};
