import {actionSearchBuilder} from '../action-search-builder';

export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

const arryOfString = [undefined, 1, {}, null, "", 'nimp', ()=>{}, []];
const toBeAFunction = [undefined, 1, {}, null, "", 'nimp', []];


describe('The actionSearcBuilder', ()=> {
  describe('when called with wrong paramaters', () => {
      it('should throw a type error when called with all paramaters', () => {
          expect(()=> {actionSearchBuilder()}).to.throw(TypeError, 'Cannot read property \'service\' of undefined')
      });
      it('should throw an error when called without a function returning a Promise service parameter', () => {
        const SERVICE_MESSAGE = 'ACTION_SEARCH_BUILDER: the service parameter should be a function.';
        toBeAFunction.map(element => {
           expect(() => { actionSearchBuilder({service: element})}).to.throw(SERVICE_MESSAGE);

        })
        expect(() => { actionSearchBuilder({service: () => Promise.resolve({test: 'test'})})}).to.not.throw(SERVICE_MESSAGE);
      });
      it('should throw an error when called without a string type parameter : load,save,delete', () => {
        const TYPE_MESSAGE = 'ACTION_SEARCH_BUILDER: the name parameter should be a string';
        expect(() => { actionSearchBuilder({service: () => Promise.resolve({test: 'test'}), name: ['test']})}).to.throw(TYPE_MESSAGE);
        expect(() => { actionSearchBuilder({service: () => Promise.resolve({test: 'test'}), name: undefined})}).to.throw(TYPE_MESSAGE);
        expect(() => { actionSearchBuilder({service: () => Promise.resolve({test: 'test'}), name: 1})}).to.throw(TYPE_MESSAGE);
        expect(() => { actionSearchBuilder({service: () => Promise.resolve({test: 'test'}), name: {}})}).to.throw(TYPE_MESSAGE);
        expect(() => { actionSearchBuilder({service: () => Promise.resolve({test: 'test'}), name: () => {}})}).to.throw(TYPE_MESSAGE);
        expect(() => { actionSearchBuilder({service: () => Promise.resolve({test: 'test'}), name: ''})}).to.throw(TYPE_MESSAGE);
        expect(() => { actionSearchBuilder({service: () => Promise.resolve({test: 'test'}), name: 'test'})}).to.not.throw(TYPE_MESSAGE);

      });
  })
  describe('when called with right parameters', () => {
    const RESOLVE_VALUE = {testValue: 'tests'};
    const REJECT_VALUE = {error: 'error'};
    const TEST_VALID_ACTION_SEARCH_BUILDER_PARAMS_RESOLVE = { service: () => Promise.resolve(RESOLVE_VALUE), name: 'test'};
    const TEST_VALID_ACTION_SEARCH_BUILDER_PARAMS_REJECT = { service: () => Promise.reject(REJECT_VALUE), name: 'test'};

    it('should return an object with types, creators, action', () => {
        const actionBuilded = actionSearchBuilder(TEST_VALID_ACTION_SEARCH_BUILDER_PARAMS_RESOLVE);
        expect(actionBuilded).to.be.an('object');
        expect(actionBuilded).to.include.keys('types', 'creators', 'action');
    });
    describe('The types part of the result', () => {
        it('should return an object with three types with REQUEST, RESPONSE and ERROR', () => {
            const {types: actionBuildedTypes} = actionSearchBuilder(TEST_VALID_ACTION_SEARCH_BUILDER_PARAMS_RESOLVE);
            expect(actionBuildedTypes).to.be.an('object');
            expect(actionBuildedTypes).to.include.keys('REQUEST_TEST', 'RESPONSE_TEST', 'ERROR_TEST');
        });
    });
    describe('The action part of the result', () => {
        const {action: actionBuildedSearchResolveAsync} = actionSearchBuilder(TEST_VALID_ACTION_SEARCH_BUILDER_PARAMS_RESOLVE);
        const {action: actionBuildedSearchRejectAsync} = actionSearchBuilder(TEST_VALID_ACTION_SEARCH_BUILDER_PARAMS_REJECT);


        const CRITERIA = {id: 'test'};
        it('should return a function', () => {
            expect(actionBuildedSearchResolveAsync).to.be.a.function;
            expect(actionBuildedSearchRejectAsync).to.be.a.function;
        });
        it('when called with a successfull search service should call the response and request action creators', async done => {
            const dispatchSpy = sinon.spy();
            await actionBuildedSearchResolveAsync()(dispatchSpy);
            expect(dispatchSpy).to.have.callCount(2);
            expect(dispatchSpy).to.have.been.called.calledWith({type: 'REQUEST_TEST', _name: 'test', _meta: {status: PENDING, searching: "search"}});
            expect(dispatchSpy).to.have.been.called.calledWith({type: 'RESPONSE_TEST', payload: RESOLVE_VALUE, _name: 'test', _meta: {status: SUCCESS, searching: "search"}});
            done();
        });
        it('when called with an unsuccessfull search service should call the error action creator', async done => {
            const dispatchSpy = sinon.spy();
            await actionBuildedSearchRejectAsync()(dispatchSpy);
            expect(dispatchSpy).to.have.callCount(2);
            expect(dispatchSpy).to.have.been.called.calledWith({type: 'REQUEST_TEST', _name: 'test', _meta: {status: PENDING, searching: "search"}});
            expect(dispatchSpy).to.have.been.called.calledWith({type: 'ERROR_TEST', payload: REJECT_VALUE, _name: 'test', _meta: {status: ERROR, searching: "search"}});
            done();
        });

    });
  });

});
