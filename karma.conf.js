//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './src/',

    files: [
       'assets/libs/jquery/dist/jquery.js',
       'assets/libs/angular/angular.js',
       'assets/libs/angular-route/angular-route.js',
       'assets/libs/angular-mocks/angular-mocks.js',
       'assets/js/*.js',
       'app/components/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
