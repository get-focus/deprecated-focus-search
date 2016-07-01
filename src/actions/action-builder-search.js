import {isArray, isFunction,isString} from 'lodash/lang';
import {capitalize, toUpper} from 'lodash/string';

export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';



const _actionCreatorBuilder = (type, name, _meta) => payload => ({...{type, entityPage: name, syncSearch: true, _meta}, ...(payload ? {payload} : {})});

export const _asyncSearchActionCreator = ({service, actionCreators}) => (criteria => {
  return async dispatch => {
    try {
        dispatch(actionCreators.request(criteria))
        const value = await service(criteria);
        dispatch(actionCreators.response(value));

    }catch(error) {
      dispatch(actionCreators.error(error))
    }

  }
});

//Name ? type ?
export const actionSearchBuilder = ({type, service, name}) => {
   type = 'search';
   const UPPER_TYPE = toUpper(type);
   const CAPITALIZE_TYPE = capitalize(type);

   const searching = 'search';
   name = 'advanced_search';
   const UPPER_NAME = toUpper(name);
   const CAPITALIZE_NAME = capitalize(name);
   const _metas = {
    request: {status: PENDING, searching},
    response: {status: SUCCESS, searching},
    error: {status: ERROR, searching}
  }
  const constants = {
    request: `REQUEST_${UPPER_TYPE}_${UPPER_NAME}`,
    response: `RESPONSE_${UPPER_TYPE}_${UPPER_NAME}`,
    error: `ERROR_${UPPER_TYPE}_${UPPER_NAME}`
  }

  const creators = {
    request: {name: `request${CAPITALIZE_TYPE}${CAPITALIZE_NAME}`, value: _actionCreatorBuilder(constants.request, name, _metas.request)},
    response: {name: `response${CAPITALIZE_TYPE}${CAPITALIZE_NAME}`, value: _actionCreatorBuilder(constants.response, name, _metas.response)},
    error: {name: `error${CAPITALIZE_TYPE}${CAPITALIZE_NAME}`, value: _actionCreatorBuilder(constants.error, name, _metas.error)}
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
