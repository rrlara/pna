exports.config = {


    //the selenium web server
    seleniumAddress:'http://127.0.0.1:4444/wd/hub',


    //location of all integration test files
    specs:[
        './e2e/**/*.js'
    ],


    //web app url - DEVELOPMENT
    baseUrl:'http://localhost:63342/template-angular-material/app/index.html', //<---CHANGE ME HERE
    //web app url - TEST
    //baseUrl:'',
    //web app url - PRODUCTION
    //baseUrl:'',


    //target browsers to open and test on
    multiCapabilities: [{
        browserName: 'chrome'
    }],


    //options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true // Use colors in the command line report.
    }
};
