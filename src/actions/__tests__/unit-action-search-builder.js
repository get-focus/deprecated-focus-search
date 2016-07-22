import {unitSearchActionBuilder} from '../single-action-creator';

export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

describe('The unitActionSearchBuilder', ()=> {
  describe('when called with wrong paramaters', () => {
      const SERVICE_MESSAGE = 'UNIT_ACTION_SEARCH_BUILDER: the name parameter should be a string';
      it('should throw an error when called with wrong paramater', () => {
          expect(() => { unitSearchActionBuilder( undefined)}).to.throw(SERVICE_MESSAGE);
          expect(() => { unitSearchActionBuilder(1)}).to.throw(SERVICE_MESSAGE);
          expect(() => { unitSearchActionBuilder({})}).to.throw(SERVICE_MESSAGE);
          expect(() => { unitSearchActionBuilder(null)}).to.throw(SERVICE_MESSAGE);
          expect(() => { unitSearchActionBuilder("")}).to.throw(SERVICE_MESSAGE);
          expect(()=> { unitSearchActionBuilder()}).to.throw(SERVICE_MESSAGE);
          expect(() => { unitSearchActionBuilder('test')}).to.not.throw(SERVICE_MESSAGE);

      });
  })
  describe('when called with right parameters', () => {
    it('should return an object', ()=> {
      const result = unitSearchActionBuilder('test');
      expect(result).to.be.an('object');
      expect(result).to.include.keys('updateQuery', 'updateFacets', 'updateScope', 'updateSelectedFacets');
    })
    describe('and the all parts of the result', () => {
      const {updateQuery, updateFacets, updateScope, updateSelectedFacets} = unitSearchActionBuilder('test');
      it('should return a function', () => {
          expect(updateQuery).to.be.a.function;
          expect(updateFacets).to.be.a.function;
          expect(updateScope).to.be.a.function;
          expect(updateSelectedFacets).to.be.a.function;
      })
    })


  });

});
