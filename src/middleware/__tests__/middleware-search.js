import {searchTriggerMiddlewareBuilder} from '../middleware-search';

const ALL_TYPES_EXCEPT_ARRAY_OBJECT = [1, "", null, 'nimp'];
const ALL_TYPES_EXCEPT_FUNCTION = [undefined, 1, {}, null, "", 'nimp', []];


describe('The searchTriggerMiddlewareBuilder', ()=> {
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
      it('should return a function', () => {
          const middlewareBuilded = searchTriggerMiddlewareBuilder(['nimp', 'nimp'], ()=>{}, ()=>{});
          expect(middlewareBuilded).to.be.a.function;
      });
      const getStateSpy = sinon.spy();
      const nextSpy = sinon.spy();
      const dispatchSpy = sinon.spy();
      const searchActionSpy = sinon.spy();
      const _state = {searchNimp: {criteria: 'Yooooo'}};
      const store = {
          dispatch: d => dispatchSpy(d),
         getState: () => {
           getStateSpy(_state);
          return _state;
         }
      }
      const searchMiddleWare = searchTriggerMiddlewareBuilder(['YO', 'YUP'], state =>  state.searchNimp, searchActionSpy);

      beforeEach(() => {
        getStateSpy.reset();
        nextSpy.reset();
        dispatchSpy.reset();
        searchActionSpy.reset();
      });
      describe('when the middleware sees an action which it does not know', () => {
        it('should do nothing about it', () => {
          searchMiddleWare(store)(nextSpy)({type: 'INPUT_BLUR', entityPath: 'user', fieldName: 'firstName'});
           expect(getStateSpy).to.not.have.been.called;
           expect(dispatchSpy).to.not.have.been.called;
           expect(searchActionSpy).to.not.have.been.called;
           expect(nextSpy).to.have.been.called.once;
        })
      })
      describe('when the middleware sees an action which it listens to', () => {
        it('should dispatch a search action', () => {
          searchMiddleWare(store)(nextSpy)({type: 'YUP', entityPath: 'user', fieldName: 'firstName'});
          expect(getStateSpy).to.have.been.called.once;
          expect(dispatchSpy).to.have.been.called.once;
          expect(searchActionSpy).to.have.been.called.once;
          expect(searchActionSpy).to.have.been.calledWith('Yooooo');
          expect(nextSpy).to.have.been.called.once;
        })
      })
      describe('when the middleware state selector does not provide a criteria', ()=>{
        const _wrongstate = {searchNimp: {noCriteria: 'Yooooo'}};
        const wrongStore = {
            dispatch: d => dispatchSpy(d),
           getState: () => {
             getStateSpy(_state);
            return _wrongstate;
           }
        }
        it('should warn something to the user and call the search with an undefined criteria', () => {
          searchMiddleWare(wrongStore)(nextSpy)({type: 'YUP', entityPath: 'user', fieldName: 'firstName'});
          expect(getStateSpy).to.have.been.called.once;
          expect(dispatchSpy).to.have.been.called.once;
          expect(searchActionSpy).to.have.been.called.once;
          expect(searchActionSpy).to.have.been.calledWith(undefined);
          expect(nextSpy).to.have.been.called.once;
        })
      })

  });

});
