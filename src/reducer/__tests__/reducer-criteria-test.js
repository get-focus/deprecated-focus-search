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
    const actionsUnit = singleActionCreatorBuilder('search');
    const {updateSelectedFacets, updateQuery, updateSort, updateGroup} = actionsUnit.creators;
    describe('with a no existing function', () => {
      const reducerCriteria = unitCriteriaSearchReducerBuilder('search')
      it('should not change the state', () => {
        const state = {};
        const actionCreate = {type: 'inconnuAuBataillon'}
        const newState = reducerCriteria(state, actionCreate)
        expect(newState).to.deep.equal({})
      })
    })
    describe('with the selectedFacets action should create the selectedFacets object', () => {
      const reducerCriteria = unitCriteriaSearchReducerBuilder('search')
      it("when it's to create", ()=> {
        const actionCreate = updateSelectedFacets({code: "R1", values: "lala"}, false)
        const state = {};
        const newState = reducerCriteria(state, actionCreate)
        expect(newState).to.be.an.object;
        expect(newState.selectedFacets).to.deep.equal(
          {"R1": ["lala"]}
        )
      })
      it("when it's to delete", () => {
        const actionDelete = updateSelectedFacets({code: "R1", values: "lala"}, true)
        const state = {selectedFacets: [{code: "R1", values: ["lala"]}]};
        const newState = reducerCriteria(state, actionDelete)
        expect(newState).to.be.an.object;
        expect(newState.selectedFacets['R1']).to.be.undefined
      })

    })

    describe('with the updateQuery action should create the query object', () => {
      const reducerCriteria = unitCriteriaSearchReducerBuilder('search')
      it("when it's to create", ()=> {
        const state = {};
        const actionCreate = updateQuery({term: "lala"}, false)
        const newState = reducerCriteria(state, actionCreate)
        expect(newState).to.be.an.object;
        expect(newState.query).to.deep.equal(
          {term: "lala"}
        )
      })
      it("when it's to delete", () => {
        const state = {query: {term: "lala"}};
        const actionDelete = updateQuery({term: "lala"}, true)
        const newState = reducerCriteria(state, actionDelete)
        expect(newState).to.be.an.object;
        expect(newState.query).to.deep.equal({})
      })
    })

    describe('with the updateSort action should create the sort object', () => {
      const reducerCriteria = unitCriteriaSearchReducerBuilder('search')
      it("when it's to create", ()=> {
        const actionCreate = updateSort({name: 'colum', order: 'desc'}, false)
        const state = {};
        const newState = reducerCriteria(state, actionCreate)
        expect(newState).to.be.an.object;
        expect(newState.sort).to.deep.equal([
          {name: 'colum', order: 'desc'}
        ])
      })
      it("when it's to delete", () => {
        const actionDelete = updateSort({name: 'colum', order: 'desc'}, true)
        const state = {sort: [{name: 'colum', order: 'desc'}]};
        const newState = reducerCriteria(state, actionDelete)
        expect(newState).to.be.an.object;
        expect(newState.sort).to.deep.equal([])
      })

    })

    describe('with the updateGroup action should create the group object', () => {
      const reducerCriteria = unitCriteriaSearchReducerBuilder('search')
      it("when it's to create", ()=> {
        const actionCreate = updateGroup({name: 'grougroup'}, false)
        const state = {};
        const newState = reducerCriteria(state, actionCreate)
        expect(newState).to.be.an.object;
        expect(newState.group).to.deep.equal([
          {name: 'grougroup'}
        ])
      })
      it("when it's to delete", () => {
        const actionDelete = updateGroup({name: 'grougroup'}, true)
        const state = {group : [{name: 'grougroup'}]};
        const newState = reducerCriteria(state, actionDelete)
        expect(newState).to.be.an.object;
        expect(newState.group).to.deep.equal([])
      })


    })
});
