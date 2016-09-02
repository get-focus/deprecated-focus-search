// test utils
import { mount, shallow } from 'enzyme';
// Components
import SearchBar, {SearchBarScopeSelection, SearchBarInput} from '../searchbar';

describe('SearchBar components ', () => {
    describe('<SearchBarInput />', ()=> {
        it('should call the query props on the change event ', () => {
            const searchbarSpy = sinon.spy();
            const wrapper = shallow(<SearchBarInput query={searchbarSpy}/>);
            wrapper.find("[data-focus='search-bar-input']").simulate('change', {target: {value: 'My new value'}})
            expect(searchbarSpy).to.have.property('callCount', 1);
            expect(searchbarSpy).to.have.been.calledWith()
        });
    });
    describe('<SearchBarScopeSelection />', ()=> {
        const spy = sinon.spy();
        const scopes = [{value: 'TOTO', label: 'Toto'}, {value: 'TITI', label: 'Titi'}, {value: 'TATA', label: 'Tata'}];
        const component = <SearchBarScopeSelection scope='TOTO' scopes={scopes} scopeFunction={spy} />;
        it('should shallow [data-focus=\'search-bar-scope-selection\']', () => {
            const shallowWrapper = shallow(component);
            expect(shallowWrapper.find("[data-focus='search-bar-scope-selection']")).to.have.length(1);
        });
        it('should have 3 scopes corresponding to 3 values in props', () => {
            const shallowMount = mount(component);
            const selectInput = shallowMount.find("[data-focus='select-mdl']");
            expect(selectInput).to.exist;
            expect(selectInput.find('ul li')).to.have.length(3);
        });
        it('should call the group props on the change event', () => {
            const shallowMount = mount(component);
            const selectInput = shallowMount.find("[data-focus='select-mdl']");
            expect(selectInput).to.exist;
            selectInput.find('ul li').at(0).simulate('click');
            expect(spy).to.have.property('callCount', 1);
            expect(spy).to.have.been.calledWith()
        });
    });
    describe('<SearchBar />', ()=> {
        it('should be a div with a data-focus="action-bar"', () => {
            const wrapper = shallow(<SearchBar/>);
            expect(wrapper.find("[data-focus='search-bar']")).to.have.length(1);
        });
    });
});
