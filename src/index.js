import i18next from 'i18next';
import frResources from './i18n/fr-FR';

i18next.init({
    lng: 'fr',
    resources: {
        fr: frResources
    }
}, (err, t) => {
    return console.info('Traduction Initialized !');
});



//---------------- TEMP UNTIL REMOVE FOCUS-CORE
import {translate, init} from 'focus-core/translation';
// Initialize translations configuration.
const i18nConfig = {
    resStore: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};

// Plugin initialization.
init(i18nConfig, () => {
    return console.info('Traduction  pour focus-core Initialized aussi !');
});


require('./style');
require('./example');
