import {singleActionCreatorBuilder as singleActionCreator} from '../single-action-creator';

export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

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
    it('should return an object', ()=> {
      const result = singleActionCreator('test').creators;
      expect(result).to.be.an('object');
      expect(result).to.include.keys('updateQuery', 'updateSort', 'updateGroup', 'updateSelectedFacets');
    })
    describe('and the all parts of the result', () => {
      const {updateQuery, updateGroup, updateSort, updateSelectedFacets} = singleActionCreator('test').creators;
      it('should return a function', () => {
          expect(updateQuery).to.be.a.function;
          expect(updateSort).to.be.a.function;
          expect(updateGroup).to.be.a.function;
          expect(updateSelectedFacets).to.be.a.function;
      })
    })


  });

});
