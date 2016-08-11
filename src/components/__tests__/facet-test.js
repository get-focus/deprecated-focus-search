// test utils
import { mount, shallow } from 'enzyme';
// Components
import {Facet, FacetPanel, FacetBlock,FacetTitle, FacetCount} from '../facet';

describe('Facets components ', () => {
  describe('<FacetTitle />', ()=> {
    it('should be a div with a data-focus=facet-title', () => {
      const wrapper = shallow(<FacetTitle />);
      expect(wrapper.find('[data-focus="facet-title"]')).to.have.length(1);
    });
    it('should be a span with a material line content class', () => {
      const wrapper = shallow(<FacetTitle />);
      expect(wrapper.find('span.mdl-list__item-primary-content')).to.have.length(1);
    });
    it('should add its children props', () => {
      const wrapper = shallow(<FacetTitle><div>{'Amélie'}</div></FacetTitle>);
      expect(wrapper.contains(<div>{'Amélie'}</div>)).to.be.true;
    });
  });
  describe('<FacetCount />', ()=> {
    it('should be a div with a data-focus=facet-count', () => {
      const wrapper = shallow(<FacetCount />);
      expect(wrapper.find('[data-focus="facet-count"]')).to.have.length(1);
    });
    it('should be a span with a material line secondary content class', () => {
      const wrapper = shallow(<FacetCount />);
      expect(wrapper.find('div.mdl-list__item-secondary-content')).to.have.length(1);
    });
    it('should add its children props in a badge material', () => {
      const wrapper = shallow(<FacetCount>{'3'}</FacetCount>);
      expect(wrapper.contains(<span className='mdl-badge' data-badge={'3'}></span>)).to.be.true;
    });
  });
  describe('<Facet />', () => {
    it('should be a li with a data-focus=facet', () => {
      const wrapper = shallow(<Facet />);
      expect(wrapper.find('[data-focus="facet"]')).to.have.length(1);
    });
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
      const wrapper = shallow(<Facet code='MONKEY'count={3} label='papa' onClick={selectFacetSpy}/>)
      wrapper.find('li').simulate('click');
      expect(selectFacetSpy).to.have.property('callCount', 1);
      expect(selectFacetSpy).to.have.been.calledWith('MONKEY')
    })
  });
  describe('<FacetBlock />', () => {
    it('should be a div with a data-focus=facet', () => {
      const wrapper = shallow(<FacetBlock />);
      expect(wrapper.find('[data-focus="facet-block"]')).to.have.length(1);
    });
    it('should be a div with a material shadow class', () => {
      const wrapper = shallow(<FacetBlock />);
      expect(wrapper.find('div.mdl-card.mdl-shadow--2dp')).to.have.length(1);
    });
    it('should be an title when a label is provided', () => {
      const wrapper = shallow(<FacetBlock label='don diego'/>);
      expect(wrapper.contains(<h3>{'don diego'}</h3>)).to.be.true;
    });
    it('should be display all the facets provided into values', () => {
      const FACET_VALUES = [
        {code: 'FAIBLE', label: 'faible', count: 22},
        {code: 'MOYEN', label: 'moyen', count: 54},
        {code: 'FORT', label: 'fort', count: 7}
      ];
      const wrapper = mount(<FacetBlock label='don diego' values={FACET_VALUES}/>);
      expect(wrapper.find('[data-focus="facet"]')).to.have.length(FACET_VALUES.length);
    });
    it('should use the FacetComponent provide in the props', () => {
      const facetSpy = sinon.spy();
      const SpyFacetComponent = props => {
        facetSpy(props);
        return <div>Facet</div>
      }
      const FACET_VALUES = [
        {code: 'FAIBLE', label: 'faible', count: 22},
        {code: 'MOYEN', label: 'moyen', count: 54},
        {code: 'FORT', label: 'fort', count: 7}
      ];
      const wrapper = mount(<FacetBlock label='don diego' values={FACET_VALUES} FacetComponent={SpyFacetComponent}/>);
      expect(facetSpy).to.have.callCount(3);
    });
  });
  describe('<FacetPanel />', () => {
    it('should be a div with a data-focus=facet-panel', () => {
      const wrapper = shallow(<FacetPanel />);
      expect(wrapper.find('[data-focus="facet-panel"]')).to.have.length(1);
    });
    it('should be a div with a material shadow class', () => {
      const wrapper = shallow(<FacetPanel />);
      expect(wrapper.find('div.mdl-card.mdl-shadow--3dp')).to.have.length(1);
    });
    it('should add the title given as props', () => {
      const wrapper = shallow(<FacetPanel title='Great title'/>);
      expect(wrapper.contains(<h2>{'Great title'}</h2>)).to.be.true;
    });
    it('should add the title given as props', () => {
      const wrapper = mount(<FacetPanel title='Great title' data={[1,2,3,4,5]}/>);
      expect(wrapper.find('[data-focus="facet-block"]')).to.have.length(5);
    });
  });
})
