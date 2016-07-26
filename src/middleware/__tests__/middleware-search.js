import {searchTriggerMiddlewareBuilder} from '../middleware-search';

const ALL_TYPES_EXCEPT_ARRAY_OBJECT = [1, "", null, 'nimp'];
const ALL_TYPES_EXCEPT_FUNCTION = [undefined, 1, {}, null, "", 'nimp', []];


describe.only('The searchTriggerMiddlewareBuilder', ()=> {
  describe('when called with wrong paramaters', () => {
      const ARRAY_MESSAGE = 'SEARCH_TRIGGER_MIDDLEWARE_BUILDER: the actionsWhichTriggerTheSearch parameter should be an object or array.';
      it('should throw an error when called with wrong listenedTypes parameter', () => {
        ALL_TYPES_EXCEPT_ARRAY_OBJECT.map(element => {
           expect(() => { searchTriggerMiddlewareBuilder(element)}).to.throw(ARRAY_MESSAGE);

        })
      });
      const FUNCTION_MESSAGE = 'SEARCH_TRIGGER_MIDDLEWARE_BUILDER: the stateSearchSelector parameter should be a function.';
      it('should throw an error when called with wrong stateSearchSelector parameter', () => {
        ALL_TYPES_EXCEPT_FUNCTION.map(element => {
           expect(() => { searchTriggerMiddlewareBuilder([], element)}).to.throw(FUNCTION_MESSAGE);

        })
      });
      const SERVICE_MESSAGE = 'SEARCH_TRIGGER_MIDDLEWARE_BUILDER: the stateSearchSelector parameter should be a function.';
      it('should throw an error when called with wrong serviceActionAdvancedSearch parameter', () => {
        ALL_TYPES_EXCEPT_FUNCTION.map(element => {
           expect(() => { searchTriggerMiddlewareBuilder([],() => {}, element)}).to.throw(FUNCTION_MESSAGE);
        })
      });



  });
  describe('when called with right paramaters', () => {
      it('should return an object', () => {
          const middlewareBuilded = searchTriggerMiddlewareBuilder(['nimp', 'nimp'], ()=>{}, ()=>{});
          expect(middlewareBuilded).to.be.a.function;


      });

  });


});
