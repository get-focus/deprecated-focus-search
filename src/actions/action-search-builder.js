import {isArray, isFunction,isString} from 'lodash/lang';
import {capitalize, toUpper} from 'lodash/string';

export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

const STRING_EMPTY = '';
const ACTION_BUILDER = 'ACTION_SEARCH_BUILDER';


const _actionCreatorBuilder = (type, name, _meta) => payload => ({...{type, _name: name, _meta}, ...(payload ? {payload} : {})});

const _asyncSearchActionCreator = ({service, actionCreators}) => (criteria => {
    return async dispatch => {
        try {
            dispatch(actionCreators.request(criteria));
            const value = await service(criteria);
            dispatch(actionCreators.response(value));

        } catch(error) {
            dispatch(actionCreators.error(error));
        }
    }
});

const _validateActionBuilderParams = ({service, name}) => {
    if(!isFunction(service)) {
        throw new Error(`${ACTION_BUILDER}: the service parameter should be a function.`);
    }
    if(!isString(name) || STRING_EMPTY === name) {
        throw new Error(`${ACTION_BUILDER}: the name parameter should be a string`);
    }
}

//Name ? type ?
export const actionSearchBuilder = ({service, name}) => {
    //TODO VALIDATE PARAMS
    _validateActionBuilderParams({service, name});
    const type = 'search';
    const UPPER_TYPE = toUpper(type);

    const searching = 'search';
    const UPPER_NAME = toUpper(name);
    const CAPITALIZE_NAME = capitalize(name);
    const _metas = {
        request: {status: PENDING, searching},
        response: {status: SUCCESS, searching},
        error: {status: ERROR, searching}
    }
    const constants = {
        request: `REQUEST_${UPPER_NAME}`,
        response: `RESPONSE_${UPPER_NAME}`,
        error: `ERROR_${UPPER_NAME}`
    }

    const creators = {
        request: {name: `request${CAPITALIZE_NAME}`, value: _actionCreatorBuilder(constants.request, name, _metas.request)},
        response: {name: `response${CAPITALIZE_NAME}`, value: _actionCreatorBuilder(constants.response, name, _metas.response)},
        error: {name: `error${CAPITALIZE_NAME}`, value: _actionCreatorBuilder(constants.error, name, _metas.error)}
    }
    const types = {
        [constants.request]: constants.request,
        [constants.response]: constants.response,
        [constants.error]: constants.error
    }

    const actionCreators = {
        request: creators.request.value,
        response: creators.response.value,
        error: creators.error.value
    }
    const action = _asyncSearchActionCreator({service, actionCreators});
    return {
        action,
        types: types,
        creators: creators
    };
}
