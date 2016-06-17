import {actionBuilder} from 'focus-redux/actions/entity-actions-builder';
import {loadUserFinance, saveUserFinance} from '../services/user-finance-service';

// Création de l'action de Load via un tableau de node pour le store redux, un type d'action et un service associé
const _loadUserFinanceAction = actionBuilder({names: ['user', 'finance' ], type: 'load', service: loadUserFinance});

export const loadUserFinanceAction = _loadUserFinanceAction.action;



// Création de l'action de Load via un tableau de node pour le store redux, un type d'action et un service associé
const _saveUserFinanceAction = actionBuilder({names: ['user','finance'], type: 'save', service: saveUserFinance});

export const saveUserFinanceAction = _saveUserFinanceAction.action;
