// test utils
import { mount, shallow } from 'enzyme';
// Components
import AdvancedSearch from '../advanced-search';
import FacetPanel from '../facet';
import {ResultList} from '../results';
import {ResultGroup} from '../results';

describe('Advanced Search components ', () => {
  describe('<AdvancedSearch />', ()=> {
    it("should be a div with a data-focus='advanced-search'", () => {
      const wrapper = shallow(<AdvancedSearch />);
      expect(wrapper.find("[data-focus='advanced-search']")).to.have.length(1);

    });

    it("should be compose of two components when there is no group", () => {
      const wrapper = shallow(<AdvancedSearch />);
      expect(wrapper.find(ResultList)).to.have.length(1);
      expect(wrapper.find(FacetPanel)).to.have.length(1);
    })

    it("allows us to set props isGroup", () => {
      const wrapper = shallow(<AdvancedSearch isGroup={false}/>);
      expect(wrapper.find(ResultList)).to.have.length(1);
      expect(wrapper.find(FacetPanel)).to.have.length(1);

      wrapper.setProps({isGroup: true})
      expect(wrapper.find(ResultGroup)).to.have.length(1);
      expect(wrapper.find(FacetPanel)).to.have.length(1);
    })
  });
})
