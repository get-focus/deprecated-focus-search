'use strict';

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _frFR = require('./i18n/fr-FR');

var _frFR2 = _interopRequireDefault(_frFR);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_i18next2.default.init({
    lng: 'fr',
    resources: {
        fr: _frFR2.default
    }
}, function (err, t) {
    return console.info('Traduction Initialized !');
});

//---------------- TEMP UNTIL REMOVE FOCUS-CORE

// Initialize translations configuration.
var i18nConfig = {
    resStore: {},
    lng: 'fr-FR' ///langOpts.i18nCulture
};

// Plugin initialization.
(0, _translation.init)(i18nConfig, function () {
    return console.info('Traduction  pour focus-core Initialized aussi !');
});

require('./style');
require('./example');
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(i18nConfig, 'i18nConfig', './src/style/index.js');
}();

;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImluaXQiLCJsbmciLCJyZXNvdXJjZXMiLCJmciIsImVyciIsInQiLCJjb25zb2xlIiwiaW5mbyIsImkxOG5Db25maWciLCJyZXNTdG9yZSIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQWNBOzs7O0FBWkEsa0JBQVFBLElBQVIsQ0FBYTtBQUNUQyxTQUFLLElBREk7QUFFVEMsZUFBVztBQUNQQztBQURPO0FBRkYsQ0FBYixFQUtHLFVBQUNDLEdBQUQsRUFBTUMsQ0FBTixFQUFZO0FBQ1gsV0FBT0MsUUFBUUMsSUFBUixDQUFhLDBCQUFiLENBQVA7QUFDSCxDQVBEOztBQVdBOztBQUVBO0FBQ0EsSUFBTUMsYUFBYTtBQUNmQyxjQUFVLEVBREs7QUFFZlIsU0FBSyxPQUZVLENBRUg7QUFGRyxDQUFuQjs7QUFLQTtBQUNBLHVCQUFLTyxVQUFMLEVBQWlCLFlBQU07QUFDbkIsV0FBT0YsUUFBUUMsSUFBUixDQUFhLGlEQUFiLENBQVA7QUFDSCxDQUZEOztBQUtBRyxRQUFRLFNBQVI7QUFDQUEsUUFBUSxXQUFSOzs7Ozs7OztrQ0FaTUYsVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5pbXBvcnQgZnJSZXNvdXJjZXMgZnJvbSAnLi9pMThuL2ZyLUZSJztcclxuXHJcbmkxOG5leHQuaW5pdCh7XHJcbiAgICBsbmc6ICdmcicsXHJcbiAgICByZXNvdXJjZXM6IHtcclxuICAgICAgICBmcjogZnJSZXNvdXJjZXNcclxuICAgIH1cclxufSwgKGVyciwgdCkgPT4ge1xyXG4gICAgcmV0dXJuIGNvbnNvbGUuaW5mbygnVHJhZHVjdGlvbiBJbml0aWFsaXplZCAhJyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0gVEVNUCBVTlRJTCBSRU1PVkUgRk9DVVMtQ09SRVxyXG5pbXBvcnQge3RyYW5zbGF0ZSwgaW5pdH0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcbi8vIEluaXRpYWxpemUgdHJhbnNsYXRpb25zIGNvbmZpZ3VyYXRpb24uXHJcbmNvbnN0IGkxOG5Db25maWcgPSB7XHJcbiAgICByZXNTdG9yZToge30sXHJcbiAgICBsbmc6ICdmci1GUicvLy9sYW5nT3B0cy5pMThuQ3VsdHVyZVxyXG59O1xyXG5cclxuLy8gUGx1Z2luIGluaXRpYWxpemF0aW9uLlxyXG5pbml0KGkxOG5Db25maWcsICgpID0+IHtcclxuICAgIHJldHVybiBjb25zb2xlLmluZm8oJ1RyYWR1Y3Rpb24gIHBvdXIgZm9jdXMtY29yZSBJbml0aWFsaXplZCBhdXNzaSAhJyk7XHJcbn0pO1xyXG5cclxuXHJcbnJlcXVpcmUoJy4vc3R5bGUnKTtcclxucmVxdWlyZSgnLi9leGFtcGxlJyk7XHJcbiJdfQ==