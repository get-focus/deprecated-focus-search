import { mount, shallow, render } from 'enzyme';
import i18next from 'i18next';
import {Facet, FacetPanel, FacetBlockShowPartial as FacetBlock, FacetTitle, FacetCount} from '../facet';

describe('Facets components ', () => {
    describe('<FacetTitle />', ()=> {
        it('should be a span with a data-focus=facet-title', () => {
            const wrapper = shallow(<FacetTitle />);
            expect(wrapper.find('[data-focus="facet-title"]')).to.have.length(1);
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
    });
    describe('<Facet />', () => {
        it('should be a li with a data-focus=facet', () => {
            const wrapper = shallow(<Facet />);
            expect(wrapper.find('[data-focus="facet"]')).to.have.length(1);
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
            const wrapper = render(<FacetBlock />);
            expect(wrapper.find('[data-focus="facet-block"]')).to.have.length(1);
        });
        it('should be a title when a label is provided', () => {
            i18next.init({
                lng: 'en',
                resources: {en: {translation: {search: {facets: {items: {label: 'This is a title'}}}}}}
            }, (err, t) => {
                const wrapper = render(<FacetBlock label='label'/>);
                expect(wrapper.find('h3').text()).to.equal(t('search.facets.items.label'));
            });
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
            const wrapper = shallow(<FacetPanel i18n={elm => elm} />);
            expect(wrapper.find('[data-focus="facet-panel"]')).to.have.length(1);
        });
        it.skip('should add the title given as props', () => {
            const wrapper = shallow(<FacetPanel i18n={elm => elm}  title='Great title'/>);
            expect(wrapper.contains(<h4>{'focus.search.facets'}</h4>)).to.be.true;
        });
        it('should add the facet-block given as data in the props', () => {
            const wrapper = mount(<FacetPanel i18n={elm => elm}  title='Great title' data={[{values: ['1'], selected: true}, {values: ['2'], selected: true}, {values: ['3'], selected: true}]}/>);
            expect(wrapper.find('[data-focus="facet-block"]')).to.have.length(3);
        });
    });
})
