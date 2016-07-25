import {searchTriggerMiddlewareBuilder} from '../middleware-search';

const arryOfString = [1, {}, null, "", 'nimp', ()=>{}];
const toBeAString = [undefined, 1, {}, null, "", ()=>{}, []];
const toBeAFunction = [undefined, 1, {}, null, "", 'nimp', []];


describe('The searchTriggerMiddlewareBuilder', ()=> {
  describe('when called with wrong paramaters', () => {
      const SERVICE_MESSAGE = 'SEARCH_TRIGGER_MIDDLEWARE_BUILDER: the searchActionAdvancedSearch parameter should be a function';
      it('should throw an error when called with wrong serviceActionAdvancedSearch parameter', () => {
        toBeAFunction.map(element => {
           expect(() => { searchTriggerMiddlewareBuilder(element)}).to.throw(SERVICE_MESSAGE);

        })
      });
      const STRING_MESSAGE = 'SEARCH_TRIGGER_MIDDLEWARE_BUILDER: the name parameter should be a string';
      it('should throw an error when called with wrong name parameter', () => {
        toBeAString.map(element => {
           expect(() => { searchTriggerMiddlewareBuilder(()=>{}, element)}).to.throw(STRING_MESSAGE);

        })
      });
      const ARRAY_MESSAGE = 'SEARCH_TRIGGER_MIDDLEWARE_BUILDER: the listenedTypes parameter should be an array.';
      it('should throw an error when called with wrong listenedTypes parameter', () => {
        arryOfString.map(element => {
           expect(() => { searchTriggerMiddlewareBuilder(()=>{}, "nimp", element)}).to.throw(ARRAY_MESSAGE);

        })
      });

  });
  describe('when called with right paramaters', () => {
      it('should return a function', () => {
          const middlewareBuilded = searchTriggerMiddlewareBuilder(()=>{}, "nimp", ["element"]);
          expect(middlewareBuilded).to.be.a.function;


      });

  });


});
