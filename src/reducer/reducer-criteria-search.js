import {capitalize, toUpper} from 'lodash/string';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';
import difference from 'lodash/difference';
import omit from 'lodash/omit';
import toLower from 'lodash/lowerCase';


export const unitCriteriaSearchReducerBuilder = (name, initCriteriaValues = {top: 20, skip: 0, page: 10}, reduceQuery) => (state = initCriteriaValues, action = {}) => {

    const UPPER_NAME = toUpper(name);
    const INIT_PAGE_SEARCH = `${UPPER_NAME}_INIT_PAGE`;
    const NEXT_PAGE_SEARCH = `${UPPER_NAME}_NEXT_PAGE`;
    const UPDATE_QUERY_SEARCH = `${UPPER_NAME}_UPDATE_QUERY`;
    const UPDATE_SORT_SEARCH = `${UPPER_NAME}_UPDATE_SORT`;
    const UPDATE_GROUP_SEARCH = `${UPPER_NAME}_UPDATE_GROUP`;
    const UPDATE_SELECTED_FACETS_SEARCH =  `${UPPER_NAME}_UPDATE_SELECTED_FACETS`;
    switch(action.type) {
        case NEXT_PAGE_SEARCH:
            return {
                ...state,
                top: action.top,
                skip: action.skip
            };
        case INIT_PAGE_SEARCH:
            return {
              ...state,
              ...initCriteriaValues
            }
        case UPDATE_QUERY_SEARCH:
            if(reduceQuery) {
                return reduceQuery(state, action);
            } else {
                if(action.replace) return {
                    ...state,
                    query: {}
                }
                const {query} = action;
                if(query !== undefined && query.scope !== undefined) {
                    query.scope = query.scope ? toLower(query.scope) : undefined;
                }
                return {
                    ...state,
                    query : {
                        ...state.query,
                        ...query
                    }
                }
            }
        case UPDATE_GROUP_SEARCH:
            return {
                ...state,
                group : action.group
            }
        case UPDATE_SORT_SEARCH :
            return  {
                ...state,
                sort: action.sort
            }
        case UPDATE_SELECTED_FACETS_SEARCH:
            //facetBlockCode + selectedValue => merge into selectedValue
            let newSelectedFacets = {...state.selectedFacets}
            if(!action.selectedFacets && action.replace){
                newSelectedFacets= null;
            }
            else if(action.replace) {
                const dif = difference(state.selectedFacets[action.selectedFacets.code], [action.selectedFacets.values])
                dif.length > 0 ?
                newSelectedFacets[action.selectedFacets.code] = dif :
                newSelectedFacets = omit(newSelectedFacets, [action.selectedFacets.code])
            }else {
                if(state.selectedFacets && state.selectedFacets[action.selectedFacets.code]){
                    newSelectedFacets[action.selectedFacets.code] = [...state.selectedFacets[action.selectedFacets.code], action.selectedFacets.values]
                } else {
                    newSelectedFacets[action.selectedFacets.code] = action.selectedFacets.values
                }
            }
            return {
                ...state,
                ...initCriteriaValues,
                selectedFacets: newSelectedFacets
            }
        default:
        return state;
    }
}


// State selectors

export const selectSearchCriteriaByName = (searchName, name) => (state = {}) => {
    if( !state[searchName] || !state[searchName] .criteria[name] ) throw new Error(`SELECTOR_CRITERIA_SEARCH : there is no ${searchName} or ${name} in the state`);
    return state[searchName].criteria[name]
}

export const selectSearchCriteria = (searchName) => (state = {}) => {
    if( !state[searchName] || !state[searchName].criteria) throw new Error(`SELECTOR_CRITERIA_SEARCH : there is no ${searchName} in the state`);
    return state[searchName].criteria
}
