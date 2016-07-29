// test utils
import { mount, shallow } from 'enzyme';
// Components
import {Facet, FacetPanel, FacetBlock,FacetTitle, FacetCount} from '../facet';

describe('<Facet />', () => {

  it('should be a li with a material class', () => {
    const wrapper = shallow(<Facet />);
    expect(wrapper.find('li.mdl-list__item')).to.have.length(1);
  });
  it('should be a display the provided label', () => {
    const wrapper = shallow(<Facet label='rodrigo'/>);
    expect(wrapper.contains(<FacetTitle>{'rodrigo'}</FacetTitle>)).to.be.true;
  });
  it('should be a display the provided count', () => {
    const wrapper = shallow(<Facet count={3}/>);
    expect(wrapper.contains(<FacetCount>{3}</FacetCount>)).to.be.true;
  });
  it('should call the action on click', () => {
    const selectFacetSpy =  sinon.spy();
    const wrapper = shallow(<Facet code='MONKEY'count={3} label='papa' selectFacet={selectFacetSpy}/>)
    wrapper.find('li').simulate('click');
    expect(selectFacetSpy).to.have.property('callCount', 1);
    expect(selectFacetSpy).to.have.been.calledWith('MONKEY')
  })
});
