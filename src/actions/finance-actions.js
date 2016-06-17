import {actionBuilder} from 'focus-redux/actions/entity-actions-builder';
import {loadFinance, saveFinance} from '../services/finance-service';

// Création de l'action de Load via un tableau de node pour le store redux, un type d'action et un service associé
const _loadFinanceAction = actionBuilder({names: ['finance' ], type: 'load', service: loadFinance});
//En retour on a l'action à appelé dans la vue, et les types des actions redux crées à donner au reduce redux
export const loadFinanceTypes = _loadFinanceAction.types;
export const loadFinanceAction = _loadFinanceAction.action;


// Création de l'action de Load via un tableau de node pour le store redux, un type d'action et un service associé
const _saveFinanceAction = actionBuilder({names: ['finance'], type: 'save', service: saveFinance});
//En retour on a l'action à appelé dans la vue, et les types des actions redux crées à donner au reduce redux
export const saveFinanceTypes = _saveFinanceAction.types;
export const saveFinanceAction = _saveFinanceAction.action;
