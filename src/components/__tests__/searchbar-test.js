// test utils
import { mount, shallow } from 'enzyme';
// Components
import {SearchBar, SearchBarScopeSelection, SearchBarInput} from '../searchbar';

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
    it('should call the group props on the change event', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<SearchBarScopeSelection group={spy} query={spy}/>);
      expect(wrapper.find("[data-focus='scope-selection']")).to.have.length(1);
      wrapper.find("[data-focus='scope-selection']").simulate('change',{target: {value: 'My new value'}} )
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


})
