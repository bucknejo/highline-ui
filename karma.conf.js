//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './src/',

    files: [
        'assets/libs/angular/angular.js',
        'assets/libs/angular-mocks/angular-mocks.js',
        'assets/libs/angular-ui-router/release/angular-ui-router.js',
        'assets/libs/angular-bootstrap/ui-bootstrap-tpls.js',
        'assets/libs/angular-animate/angular-animate.js',
        'assets/libs/angular-cookies/angular-cookies.js',
        'assets/libs/angular-resource/angular-resource.js',
        'assets/libs/angular-sanitize/angular-sanitize.js',
        'assets/libs/angular-touch/angular-touch.js',
        'assets/libs/angular-messages/angular-messages.js',
        'assets/libs/jquery/dist/jquery.js',
        'assets/libs/bootstrap/dist/js/bootstrap.js',
        'assets/js/*.js',
        'test/**/*.js',
        'test/*.js'
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
