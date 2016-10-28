import get from 'lodash/get';
import identity from 'lodash/identity'

export const buildFieldForLineSearch = ({searchName, codeId, entityPath, code} ) => (state ={}, props) => {
  const {definitions, domains, index} = props;
  const entityDefintion = definitions[entityPath];
  const results = state[searchName].results;
  const findlist = get(results.data.find(element => element.code === code), 'list', get(results.data[index], 'list'));
  const list = findlist ? findlist  : results.data || []
  return {fields: Object.keys(list.find(element => element[codeId] ===props[codeId])).map(element => {
    const propertyDefinition = entityDefintion[element]
    const domain = get(domains, propertyDefinition ? propertyDefinition.domain : "", {})
    const value = list.find(element => element[codeId] ===props[codeId])[element]
    const formator = domain.formator || identity
    return {entityPath: entityPath,  name: element,  formattedInputValue: formator(value), rawInputValue: formator(value)}}  )}
}


export const parseForVertigo = (searchParam) => {
  const config = {};
  const scope =( searchParam.query && searchParam.query.scope) ? searchParam.query.scope : 'all';
  config.urlData = {
    skip: 0,
    sortFieldName: get(searchParam, 'sort.name'),//(searchParam.sort) ? searchParam.sort.name : "",
    sortDesc: (searchParam.sort) ? (searchParam.sort.order === 'asc' ? false : true) : false,
    top: 50
  }
  config.data = {
    scope: scope,
    facets: get(searchParam, 'selectedFacets', {}) || {},//searchParam.selectedFacets ? searchParam.selectedFacets : {},
    criteria: get(searchParam, 'query.term', "*")//( searchParam.query && searchParam.query.term) ? searchParam.query.term : '*'
  }
  if(searchParam.group) {
    config.data['group'] = searchParam.group.name

  }
  config.skip = 0;
  config.top = 0;
  return config;
}

export const getScope = (config) => {
   //return ( config.query && config.query.scope) ? config.query.scope : 'all';
   return get(config, 'query.scope', 'all');
}
