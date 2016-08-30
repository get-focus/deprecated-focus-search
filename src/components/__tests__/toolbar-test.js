// test utils
import { mount, shallow } from 'enzyme';
// Components
import {ToolBarContainer, ToolbarGroup, ToolbarSort,ToolBar} from '../toolbar';

describe('ToolBar components ', () => {
  describe('<ToolBar />', ()=> {
    it('should be a div with a data-focus=toolbar', () => {
      const toolbarProps = {
        groupList: ['truc', 'machin', 'bidule'],
        sortList: ['truc', 'machin', 'bidule']
      }
      const wrapper = shallow(<ToolBar toolbarProps={toolbarProps} />);
      expect(wrapper.find("[data-focus='toolbar']")).to.have.length(1);
    });

  });
  describe('<ToolbarGroup/>', () => {
    it("should have three options if the listeGroup have a length equal to 3 ", ()=> {
      const wrapper = shallow(<ToolbarGroup listGroup={['truc', 'machin', 'bidule']}/>)
      expect(wrapper.find("[data-focus='option-group']")).to.have.length(3);
    })

    it('should call the props group on the change event', ()=> {
      const groupSpy = sinon.spy();
      const wrapper = shallow(<ToolbarGroup group={groupSpy} listGroup={['truc', 'machin', 'bidule']}/>)
      wrapper.find("[data-focus='select-group']").simulate('change', {target: {value: 'My new value'}})
      expect(groupSpy).to.have.property('callCount', 1);
      expect(groupSpy).to.have.been.calledWith()
    })
  })
  describe('<ToolbarSort/>', () => {
    it('should call the props sort on the change event', ()=> {
      const sortSpy = sinon.spy();
      const wrapper = shallow(<ToolbarSort sort={sortSpy} listSort={['truc', 'machin', 'bidule']}/>)
      wrapper.find("[data-focus='select-sort']").simulate('change', {target: {value: 'My new value'}})
      expect(sortSpy).to.have.property('callCount', 1);
      expect(sortSpy).to.have.been.calledWith()
    })

    it('should have 6 options if the listeGroup have a length equal to 3', ()=> {
      const wrapper = shallow(<ToolbarSort listSort={['truc', 'machin', 'bidule']}/>)
      expect(wrapper.find("[data-focus='option-sort']")).to.have.length(6);
    })
  })



})
