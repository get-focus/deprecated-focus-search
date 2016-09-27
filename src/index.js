import i18next from 'i18next';
import {intializeTranslation} from 'focus-application/translation';
import frFR from './translation/fr-FR';

intializeTranslation(i18next, 'fr-FR', [frFR]);

import 'focus-components/style';
require('./style');
require('./example');
