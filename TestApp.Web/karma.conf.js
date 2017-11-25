var WebpackConfig = require('./webpack.config.js');
module.exports = function(config) {
    config.set({
        
        basePath: './wwwroot',
        frameworks: ['jasmine', 'mocha'],
        reporters: ['mocha'],
        browsers: ['Chrome'],
        files: [
            'test/**/*spec.js',
            'test/**/*spec.jsx'
        ],
        preprocessors: {
            // add webpack as preprocessor
            'test/**/*spec.js': ['webpack', 'sourcemap'],
            'test/**/*spec.jsx': ['webpack', 'sourcemap']
        },
        webpack: WebpackConfig,
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        },
        port: 9876,
        colors: true,
        // reporter options 
        mochaReporter: {
            showDiff: true,
            divider: '|',
            output: 'autowatch',
            colors: {
                success: 'green',
                info: 'bgGreen',
                warning: 'cyan',
                error: 'red'
            },
            symbols: {
                success: '+',
                info: '#',
                warning: '!',
                error: 'x'
            }
        },
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity
    });
}