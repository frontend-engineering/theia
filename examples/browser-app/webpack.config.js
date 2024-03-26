/**
 * This file can be edited to customize webpack configuration.
 * To reset delete this file and rerun theia build again.
 */
// @ts-check
const configs = require('./gen-webpack.config.js');
const nodeConfig = require('./gen-webpack.node.config.js');
const path = require('path')

/**
 * Expose bundled modules on window.theia.moduleName namespace, e.g.
 * window['theia']['@theia/core/lib/common/uri'].
 * Such syntax can be used by external code, for instance, for testing.
 */
configs[0].module.rules.push({
    test: /\.js$/,
    loader: require.resolve('@theia/application-manager/lib/expose-loader')
});

if (process.env.npm_lifecycle_script.indexOf('production') > -1) {
    console.log('production, replace environment -> environment.prod')
    if (!configs[0].resolve.alias) {
        configs[0].resolve.alias = {}
    }
    // configs[0].resolve.alias[path.resolve(__dirname, '../hello-world/lib/browser/environments/environment.js')]
    //     = path.resolve(__dirname, '../hello-world/lib/browser/environments/environment.prod.js')
    // console.log(configs[0].resolve.alias)
    configs[0].resolve.alias['@elastic/eui$'] = '@elastic/eui/optimize/es/index.js'
}

module.exports = [
    ...configs,
    nodeConfig.config
];
