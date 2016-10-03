// test utils
import { mount, shallow } from 'enzyme';
// Components
import {AdvancedSearch} from '../advanced-search'

describe('Advanced Search components ', () => {
  describe('<AdvancedSearch />', ()=> {
    it("should be a div with a data-focus='advanced-search'", () => {
      const wrapper = shallow(<AdvancedSearch unitSearchDispatch={{start: props => props}}/>);
      expect(wrapper.find("[data-focus='advanced-search']")).to.have.length(1);

    });

    it("should be compose of three components when there is no group", () => {
      const wrapper = shallow(<AdvancedSearch unitSearchDispatch={{start: props => props}}/>);
      expect(wrapper.find("[data-focus='information-bar-advanced-search']")).to.have.length(1);
      expect(wrapper.find("[data-focus='result-list-advanced-search']")).to.have.length(1);
      expect(wrapper.find("[data-focus='facet-panel-advanced-search']")).to.have.length(1);
    })

    it("allows us to set props isGroup", () => {
      const wrapper = shallow(<AdvancedSearch unitSearchDispatch={{start: props => props}} isGroup={false}/>);
      expect(wrapper.find("[data-focus='information-bar-advanced-search']")).to.have.length(1);
      expect(wrapper.find("[data-focus='result-list-advanced-search']")).to.have.length(1);
      expect(wrapper.find("[data-focus='facet-panel-advanced-search']")).to.have.length(1);

      wrapper.setProps({isGroup: true})
      expect(wrapper.find("[data-focus='information-bar-advanced-search']")).to.have.length(1);
      expect(wrapper.find("[data-focus='result-group-advanced-search']")).to.have.length(1);
      expect(wrapper.find("[data-focus='facet-panel-advanced-search']")).to.have.length(1);
    })
  });
})
