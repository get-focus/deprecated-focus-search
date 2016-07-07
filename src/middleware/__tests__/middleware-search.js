import {builderAdvancedSearchMiddleware} from '../middleware-search';

const arryOfString = [1, {}, null, "", 'nimp', ()=>{}];
const toBeAString = [undefined, 1, {}, null, "", ()=>{}, []];
const toBeAFunction = [undefined, 1, ()=>{}, null, "", 'nimp', []];


describe('The builderAdvancedSearchMiddleware', ()=> {
  describe('when called with wrong paramaters', () => {
      const SERVICE_MESSAGE = 'SEARCH_MIDDLEWARE_BUILDER: the searchActionAdvancedSearch parameter should be a function';
      it('should throw an error when called with wrong serviceActionAdvancedSearch paramater', () => {
        toBeAFunction.map(element => {
           expect(() => { builderAdvancedSearchMiddleware(element)}).to.throw(SERVICE_MESSAGE);

        })
      });
      const STRING_MESSAGE = 'SEARCH_MIDDLEWARE_BUILDER: the name parameter should be a string';
      it('should throw an error when called with wrong name paramater', () => {
        toBeAString.map(element => {
           expect(() => { builderAdvancedSearchMiddleware(()=>{}, element)}).to.throw(STRING_MESSAGE);

        })
      });
      const ARRAY_MESSAGE = 'SEARCH_MIDDLEWARE_BUILDER: the listenedTypes parameter should be an array.';
      it('should throw an error when called with wrong listenedTypes paramater', () => {
        arryOfString.map(element => {
           expect(() => { builderAdvancedSearchMiddleware(()=>{}, "nimp", element)}).to.throw(ARRAY_MESSAGE);

        })
      });

  });
  describe('when called with right paramaters', () => {
      it('should return a function', () => {
          const middlewareBuilded = builderAdvancedSearchMiddleware(()=>{}, "nimp", ["element"]);
          expect(middlewareBuilded).to.be.a.function;


      });

  });


});
