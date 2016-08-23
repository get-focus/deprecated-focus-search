// test utils
import { mount, shallow } from 'enzyme';
// Components
import SearchBar, {ActionQueryContainer, ScopeSelection, InputSearch} from '../search-bar';

describe('SearchBar components ', () => {
    describe('<SearchBar />', ()=> {
        it('should be a div with a data-focus="search-bar-input"', () => {
            const wrapper = shallow(<SearchBar />);
            expect(wrapper.find("[data-focus='search-bar']")).to.have.length(1);
        });
    });
    describe('<InputSearch />', ()=> {
        it('should call the query props on the change event ', () => {
            const searchbarSpy = sinon.spy();
            const wrapper = shallow(<InputSearch query={searchbarSpy}/>);
            wrapper.find("[data-focus='search-bar-input']").simulate('change', {target: {value: 'My new value'}})
            expect(searchbarSpy).to.have.property('callCount', 1);
            expect(searchbarSpy).to.have.been.calledWith()
        });
    });
    describe('<ActionQueryContainer />', () => {
        it('should be a div with a data-focus="action-query-container"', () => {
            const wrapper = shallow(<ActionQueryContainer />);
            expect(wrapper.find("[data-focus='search-bar-query-container']")).to.have.length(1);
        });
    });
    describe('<ScopeSelection />', () => {
        it('should call the group props on the change event', () => {
            const spy = sinon.spy();
            const wrapper = shallow(<ScopeSelection group={spy} query={spy}/>);
            expect(wrapper.find("[data-focus='search-bar-scope-selection']")).to.have.length(1);
            wrapper.find("[data-focus='search-bar-scope-selection']").simulate('change',{target: {value: 'My new value'}} )
            expect(spy).to.have.property('callCount', 1);
            expect(spy).to.have.been.calledWith()
        });
    });
})
