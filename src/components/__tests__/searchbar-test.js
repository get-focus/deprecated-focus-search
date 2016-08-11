// test utils
import { mount, shallow } from 'enzyme';
// Components
import {SearchBar, ActionQueryContainer, ScopeSelection,ActionBar} from '../searchbar';

describe('SearchBar components ', () => {
  describe('<SearchBar />', ()=> {
    it('should call the query props on the change event ', () => {
      const searchbarSpy = sinon.spy();
      const wrapper = shallow(<SearchBar query={searchbarSpy}/>);
      wrapper.find("[data-focus='searchbar']").simulate('change', {target: {value: 'My new value'}})
      expect(searchbarSpy).to.have.property('callCount', 1);
      expect(searchbarSpy).to.have.been.calledWith()
    });
  });
  describe('<ActionQueryContainer />', ()=> {
    it('should be a div with a data-focus="action-query-container"', () => {
      const wrapper = shallow(<ActionQueryContainer/>);
      expect(wrapper.find("[data-focus='action-query-container']")).to.have.length(1);
    });

  });
  describe('<ScopeSelection />', ()=> {
    it('should call the group props on the change event', () => {
      const groupSpy = sinon.spy();
      const wrapper = shallow(<ScopeSelection group={groupSpy}/>);
      expect(wrapper.find("[data-focus='scope-selection']")).to.have.length(1);
      wrapper.find("[data-focus='scope-selection']").simulate('change',{target: {value: 'My new value'}} )
      expect(groupSpy).to.have.property('callCount', 1);
      expect(groupSpy).to.have.been.calledWith()

    });

  });
  describe('<ActionBar />', ()=> {
    it('should be a div with a data-focus="action-bar"', () => {
      const wrapper = shallow(<ActionBar/>);
      expect(wrapper.find("[data-focus='action-bar']")).to.have.length(1);
    });

  });


})
