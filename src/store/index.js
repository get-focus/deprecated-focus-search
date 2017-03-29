import {get} from 'lodash';
import identity from 'lodash/identity';
import keys from 'lodash/keys';

export const buildFieldForLineSearch = ({searchName, codeId, entityPath, code, arraySearchNames}) => (state = {}, props) => {
    const {definitions, domains, index} = props;
    const entityDefinition = definitions[entityPath];
    let fields = [];
    arraySearchNames.forEach(name => {
        console.log(name);
        const results = state[name].results;
        const findList = results.data ? get(results.data.find(element => element.code === code), 'list', get(results.data[index], 'list')) : null;
        const list = findList ? findList : results.data || [];
        const dataForLine = list.find(element => element[codeId] === props[codeId]);
        const propertyKeys = keys(dataForLine);
        propertyKeys.forEach(element => {
            const propertyDefinition = entityDefinition[element];
            const domain = get(domains, propertyDefinition ? propertyDefinition.domain : '', {});
            const value = list.find(element => element[codeId] ===props[codeId])[element];
            const formator = domain.formator || identity;
            fields.push({
                entityPath: entityPath,
                name: element,
                formattedInputValue: formator(value),
                rawInputValue: value
            });
        });
    });
    return {
        fields
    };
};

// export const buildFieldForLineSearch = ({searchName, codeId, entityPath, code}) => (state = {}, props) => {
//     const {definitions, domains, index} = props;
//     const entityDefinition = definitions[entityPath];
//     const results = state[searchName].results;
//     const findList = results.data ? get(results.data.find(element => element.code === code), 'list', get(results.data[index], 'list')) : null;
//     const list = findList ? findList : results.data || [];
//     const dataForLine = list.find(element => element[codeId] === props[codeId]);
//     const propertyKeys = keys(dataForLine);
//     const fields = propertyKeys.map(element => {
//         const propertyDefinition = entityDefinition[element];
//         const domain = get(domains, propertyDefinition ? propertyDefinition.domain : '', {});
//         const value = list.find(element => element[codeId] ===props[codeId])[element];
//         const formator = domain.formator || identity;
//         return {
//             entityPath: entityPath,
//             name: element,
//             formattedInputValue: formator(value),
//             rawInputValue: value
//         }}
//     );
//     return {
//         fields: fields
//     };
// };


export const parseForVertigo = (searchParam) => {
    const config = {};
    const scope = (searchParam.query && searchParam.query.scope) ? searchParam.query.scope : 'all';
    config.urlData = {
        skip: searchParam.skip,
        sortFieldName: get(searchParam, 'sort.name'), //(searchParam.sort) ? searchParam.sort.name : "",
        sortDesc: (searchParam.sort) ? (searchParam.sort.order === 'asc' ? false : true) : false,
        top: searchParam.top
    }
    config.data = {
        scope: scope,
        facets: get(searchParam, 'selectedFacets', {}) || {}, //searchParam.selectedFacets ? searchParam.selectedFacets : {},
        criteria: get(searchParam, 'query.term', '*') //( searchParam.query && searchParam.query.term) ? searchParam.query.term : '*'
    }
    if(searchParam.group) {
        config.data['group'] = searchParam.group.name
    }
    return config;
}

export const getScope = (config) => {
    //return ( config.query && config.query.scope) ? config.query.scope : 'all';
    return get(config, 'query.scope', 'all');
}
