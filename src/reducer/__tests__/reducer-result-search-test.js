import isArray from 'lodash/isArray';
import {unitResultsSearchReducerBuilder} from '../reducer-result-search'
const _createSearchCreators = _UPPER_NAME => ({
  request: `REQUEST_${_UPPER_NAME}`,
  response: `RESPONSE_${_UPPER_NAME}`,
  error: `ERROR_${_UPPER_NAME}`
});

describe('The search result reducer', () => {
    const reducerResults = unitResultsSearchReducerBuilder('searchlol')
    const SEARCH_TYPES = _createSearchCreators('SEARCHLOL');
    describe('when it receives an unknown action', () => {
      it('should not modify the existing state', () => {
        const EXISTING_STATE = {lol: 'lol'};
        expect(reducerResults(EXISTING_STATE)).to.equal(EXISTING_STATE)
        expect(reducerResults(EXISTING_STATE, {type: 'inconnuAuBataillon'})).to.equal(EXISTING_STATE)
      })

    });
    describe('when it receive the REQUEST action', () => {
      it('should preserve the existing state and add a searching attribute', () => {
        const EXISTING_STATE = {lol: 'lol'};
        expect(reducerResults(EXISTING_STATE, {type: SEARCH_TYPES.request})).to.deep.equal({...EXISTING_STATE, searching: true})
      });
    })
    describe('when it receive the ERROR action', () => {
      it('should preserve the existing state and add a searching attribute', () => {
        const EXISTING_STATE = {lol: 'lol'};
        const error = 'What a non sense search... Please try again...';
        expect(
          reducerResults(
            EXISTING_STATE,
            {type: SEARCH_TYPES.error, payload: error})
          ).to.deep.equal({...EXISTING_STATE, searching: false, error})
      });
    });
    describe('when it receive the RESPONSE action', () => {
      it('should preserve the existing state and add add an error attribute', () => {
        const EXISTING_STATE = {lol: 'lol'};
        const RESPONSE_CONTENT = {
          facets: 'Yolo',
          groups: {gp1: 'lol', gp2: 'lool'},
          totalCount: 3156
        };
        expect(reducerResults(EXISTING_STATE, {type: SEARCH_TYPES.response, payload: RESPONSE_CONTENT})).to.deep.equal({
          searching: false,
          data: RESPONSE_CONTENT.groups,
          totalCount: RESPONSE_CONTENT.totalCount,
          facets: RESPONSE_CONTENT.facets,
          hasGroups: true
        })
      });
    });

});
