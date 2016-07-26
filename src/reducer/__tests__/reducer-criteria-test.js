//import {} from '../../actions/form';
/*
  => UPDATE_QUERY => replace(true, false) + spread new query
  => UPDATE_SLECTED_FACETS => replace(true, false) + erase or push a new selected facet
  => UPDATE_SORT => replace(true, false) + erase + push
  => UPDATE_GROUP => replace(true, false) + erase + push
*/
import {singleActionCreatorBuilder} from '../../actions/single-action-creator';
import {unitCriteriaSearchReducerBuilder} from '../reducer-criteria-search'
import searchCriteriaReducer from '../reducer-criteria-search';



import isArray from 'lodash/isArray';

describe('The search criteria reducer', () => {
    console.log(singleActionCreatorBuilder)
    const actionsUnit = singleActionCreatorBuilder('search');
    console.log(actionsUnit)
    const {updateSelectedFacets} = actionsUnit.creators;
    console.log(updateSelectedFacets);
    const action = updateSelectedFacets({code: "R1", label: "Yo", values: [{code: "lala", count : 2, label: "test"}]})
    const state = [];
    const reducerCriteria = unitCriteriaSearchReducerBuilder('search')
    const newState =reducerCriteria(state, action)
    it('should return an array', ()=> {
       expect(newState).to.be.an.array;
    })

});
