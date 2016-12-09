import {mount, shallow, render} from 'enzyme';
import {ResultList, ResultGroup, ListComponentWithToolBar} from '../results';

const resultListProps = {
    customLineProps: {},
    isGroup: false,
    lineIdentifierProperty: 'id',
    ListComponent: (props) => <ListComponentWithToolBar {...props} />,
    unitSearchDispatch: {},
    valuesForResult: {
        lineIdentifierProperty:'movId',
        LineComponent: (props) => (<div>line</div>),
        data:[
            {'movId':179810,'title':'A.T.O.M.: Alpha Teens on Machines'},
            {'movId':109557,'title':'Supernova'}
        ],
        listType:'MovieIndex',
        totalCount:2,
        groupSelect:{}
    }
};


describe('Results Search components', () => {
    describe('<ResultList/>', () => {
        it('should be a div with data-focus="result-list"', () => {
            const wrapper = shallow(<ResultList />);
            expect(wrapper.find('[data-focus="result-list"]')).to.have.length(1);
        });
        //TODO EPHRAME : activate this test
        it.skip('allows us to set props isSelectable ', () => {
            const wrapper = shallow(<ResultList />)
            expect(wrapper.find('[data-focus="list-advanced-search"]')).to.have.length(1);
            wrapper.setProps({isSelectable: true})
            expect(wrapper.find('[data-focus="selectable-list-advanced-search"]')).to.have.length(1);

        });
        it('should have two line in the list', () => {
            const wrapper = mount(<ResultList {...resultListProps} />);
            expect(wrapper.find("[data-focus='line-advanced-search']")).to.have.length(2);
        });
        describe("when it's a list with no listWrapper in the props", () => {
            it('should have a ul with a className="mdl-list"', () => {
                const wrapper = mount(<ResultList {...resultListProps} />);
                expect(wrapper.find("[data-focus='line-advanced-search']")).to.have.length(2);
                expect(wrapper.find("ul.mdl-list")).to.have.length(1);

            });
        });
    });
});
