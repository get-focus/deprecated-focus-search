import {singleActionCreatorBuilder as singleActionCreator} from '../single-action-creator';

export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
import {capitalize, toUpper} from 'lodash/string';


describe('The singleActionCreatorBuilder', ()=> {
  describe('when called with wrong paramaters', () => {
      const SERVICE_MESSAGE = 'UNIT_ACTION_SEARCH_BUILDER: the name parameter should be a string';
      it('should throw an error when called with wrong paramater', () => {
          expect(() => { singleActionCreator( undefined)}).to.throw(SERVICE_MESSAGE);
          expect(() => { singleActionCreator(1)}).to.throw(SERVICE_MESSAGE);
          expect(() => { singleActionCreator({})}).to.throw(SERVICE_MESSAGE);
          expect(() => { singleActionCreator(null)}).to.throw(SERVICE_MESSAGE);
          expect(() => { singleActionCreator("")}).to.throw(SERVICE_MESSAGE);
          expect(()=> { singleActionCreator()}).to.throw(SERVICE_MESSAGE);
          expect(() => { singleActionCreator('test')}).to.not.throw(SERVICE_MESSAGE);

      });
  })
  describe('when called with right parameters', () => {
    const UPDATE_QUERY_SEARCH =  `${toUpper('test')}_UPDATE_QUERY`;
    const UPDATE_SORT_SEARCH =  `${toUpper('test')}_UPDATE_SORT`;
    const UPDATE_GROUP_SEARCH =  `${toUpper('test')}_UPDATE_GROUP`;
    const UPDATE_SELECTED_FACETS_SEARCH =  `${toUpper('test')}_UPDATE_SELECTED_FACETS`;
    it('should return an object', ()=> {
      const result = singleActionCreator('test');
      expect(result).to.be.an('object');
    })
    describe('the actions creators ', () => {
      const result = singleActionCreator('test');
      const {updateQuery, updateGroup, updateSort, updateSelectedFacets} = result.creators;
      it('should return a function', () => {
          expect(result.creators).to.include.keys('updateQuery', 'updateSort', 'updateGroup', 'updateSelectedFacets');
          expect(updateQuery).to.be.a.function;
          expect(updateSort).to.be.a.function;
          expect(updateGroup).to.be.a.function;
          expect(updateSelectedFacets).to.be.a.function;
      })

      it('and updateQuery function should call with the right parameters', () => {
          const UPDATEQUERYCall = updateQuery('rodrigo', false)
          expect(UPDATEQUERYCall).to.be.an.object;
          expect(UPDATEQUERYCall).to.be.deep.equal({type: UPDATE_QUERY_SEARCH, query: 'rodrigo', replace: false, isSearchAction: true})
      })

      it('and updateSort function should call with the right parameters', () => {
          const UPDATESORTCALL = updateSort('rodrigo', false)
          expect(UPDATESORTCALL).to.be.an.object;
          expect(UPDATESORTCALL).to.be.deep.equal({type: UPDATE_SORT_SEARCH, sort: 'rodrigo', replace: false, isSearchAction: true})
      })


      it('and updateGroup function should call with the right parameters', () => {
          const UPDTATEGROUPCALL = updateGroup('dondiego', false)
          expect(UPDTATEGROUPCALL).to.be.an.object;
          expect(UPDTATEGROUPCALL).to.be.deep.equal({type: UPDATE_GROUP_SEARCH, group: 'dondiego', replace: false, isSearchAction: true})
      })

      it('and updateSelectedFacets function should call with the right parameters', () => {
        const UPDATESELECTEDFACETS = updateSelectedFacets('rodrigo', false)
        expect(UPDATESELECTEDFACETS).to.be.an.object;
        expect(UPDATESELECTEDFACETS).to.be.deep.equal({type: UPDATE_SELECTED_FACETS_SEARCH, selectedFacets: 'rodrigo', replace: false, isSearchAction: true})
      })
    })
    describe('and the all parts of the result', () => {

      const {UPDATE_QUERY_SEARCH, UPDATE_SORT_SEARCH, UPDATE_GROUP_SEARCH, UPDATE_SELECTED_FACETS_SEARCH} = singleActionCreator('test').types;
      it('should return a string', () => {
          expect(UPDATE_QUERY_SEARCH).to.be.a.string;
          expect(UPDATE_SORT_SEARCH).to.be.a.string;
          expect(UPDATE_GROUP_SEARCH).to.be.a.string;
          expect(UPDATE_SELECTED_FACETS_SEARCH).to.be.a.string;
      })
    })


  });

});
