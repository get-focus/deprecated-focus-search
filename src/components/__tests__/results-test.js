import {mout, shallow, render} from 'enzyme';
import {ResultList, ResultGroup} from '../results';

describe ('Results Search components', () => {
    describe('<ResultList/>', () => {
        it('should be a div with data-focus="result-list"', () => {
            const wrapper = shallow(<ResultList />);
            expect(wrapper.find("[data-focus='result-list']")).to.have.length(1);
        });;
        it('allows us to set props isSelectable ', () => {
            const wrapper = shallow(<ResultList />)
            expect(wrapper.find("[data-focus='list']")).to.have.length(1);
            wrapper.setProps({isSelectable: true})
            expect(wrapper.find("[data-focus='selectable-list']")).to.have.length(1);
        });
        it('should have three line in the list', () => {
            const LineComponent = props => <div>Line de Test</div>
            const wrapper = shallow(<ResultList LineComponent={LineComponent} data={[{linedata: 1},{ linedata: 2}, {linedata: 3}]}/>)
            expect(wrapper.find("[data-focus='line-component']")).to.have.length(3);
        });
        describe("when it's a list with no listWrapper in the props", () => {
            it('should have a ul with a className="mdl-list"', () => {
                const ListGroup =['group1', 'group2', 'group3'];
                const ListSort =['sort1', 'sort2', 'sort3'];
                const wrapper = render(<ResultList groupList={ListGroup} sortList={ListSort} isSelectable={false}/>)
                expect(wrapper.find("ul.mdl-list")).to.have.length(1);
            });
        });
        describe("when it's a selectable list", () => {
            it('should have a data-focus="list-component"', ()=> {
                const LineComponent = props => <div>Line de Test</div>
                const ListGroup =['group1', 'group2', 'group3'];
                const ListSort =['sort1', 'sort2', 'sort3'];
                const wrapper = render(<ResultList isSelectable={true}
                    groupList={ListGroup}
                    sortList={ListSort}
                    LineComponent={LineComponent}
                    data={[{linedata: 1},{ linedata: 2}, {linedata: 3}]}/>)
                    expect(wrapper.find("[data-focus='list-component']")).to.have.length(1);
                    expect(wrapper.find("[data-focus='list-component']")).to.have.length(3);
                });
            });
        });
    });
