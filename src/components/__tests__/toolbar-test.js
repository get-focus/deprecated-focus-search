// test utils
import { mount, shallow, render } from 'enzyme';
// Components
import ToolBar, {ToolbarGroup, ToolbarSort} from '../toolbar';

describe('ToolBar components ', () => {
    describe('<ToolBar />', ()=> {
        it('should be a div with a data-focus=toolbar', () => {
            const values = ['truc', 'machin', 'bidule'];
            const toolbarProps = {
                sort: sinon.spy(),
                group: sinon.spy(),
                sortList: values,
                groupList: values
            };
            const wrapper = render(<ToolBar toolbarProps={toolbarProps} selectState={false} toggleAllLine={() => sinon.spy()} />);
            expect(wrapper.find("div[data-focus='toolbar']")).to.exist;
        });
    });
    describe('<ToolbarGroup/>', () => {
        it("should have three options if the listeGroup have a length equal to 3 ", ()=> {
            const wrapper = mount(<ToolbarGroup groupList={['truc', 'machin', 'bidule']}/>)
            expect(wrapper.find("[data-focus='dropdown'] ul li")).to.have.length(3);
        });
        it('should call the props group on the change event', ()=> {
            const groupSpy = sinon.spy();
            const wrapper = mount(<ToolbarGroup group={groupSpy} groupList={['truc', 'machin', 'bidule']}/>)
            wrapper.find("[data-focus='dropdown'] ul li").at(0).simulate('click');
            expect(groupSpy).to.have.property('callCount', 1);
            expect(groupSpy).to.have.been.calledWith()
        });
    });
    describe('<ToolbarSort/>', () => {
        it('should call the props sort on the change event', ()=> {
            const sortSpy = sinon.spy();
            const wrapper = mount(<ToolbarSort sort={sortSpy} sortList={['truc', 'machin', 'bidule']} />)
            wrapper.find("[data-focus='dropdown'] ul li").at(0).simulate('click');
            expect(sortSpy).to.have.property('callCount', 1);
            expect(sortSpy).to.have.been.calledWith()
        });
        it('should have 6 options if the listeGroup have a length equal to 3', ()=> {
            const wrapper = mount(<ToolbarSort sortList={['truc', 'machin', 'bidule']}/>)
            expect(wrapper.find("[data-focus='dropdown'] ul li")).to.have.length(6);
        });
    });
});
