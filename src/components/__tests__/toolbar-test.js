// test utils
import { mount, shallow } from 'enzyme';
// Components
import {ToolBarContainer, ToolbarGroup, ToolbarSort,ToolBar} from '../toolbar';

describe('ToolBar components ', () => {
  describe('<ToolBarContainer />', ()=> {
    it('should be a div with a data-focus=toolbar-container', () => {
      const wrapper = shallow(<ToolBarContainer />);
      expect(wrapper.find("[data-focus='toolbar-container']")).to.have.length(1);
    });
  });
  describe('<ToolBar />', ()=> {
    it('should be a div with a data-focus=toolbar', () => {
      const wrapper = shallow(<ToolBar/>);
      expect(wrapper.find("[data-focus='toolbar']")).to.have.length(1);
    });

  });
  describe('<ToolbarGroup/>', () => {
    it('nananna2', ()=> {
      const wrapper = shallow(<ToolbarGroup listGroup={['truc', 'machin', 'bidule']}/>)
      expect(wrapper.find("[data-focus='option-group']")).to.have.length(3);
    })

    it('nananna2', ()=> {
      const groupSpy = sinon.spy();
      const wrapper = shallow(<ToolbarGroup group={groupSpy} listGroup={['truc', 'machin', 'bidule']}/>)
      wrapper.find("[data-focus='select-group']").simulate('change', {target: {value: 'My new value'}})
      expect(groupSpy).to.have.property('callCount', 1);
      expect(groupSpy).to.have.been.calledWith()
    })
  })
  describe('<ToolbarSort/>', () => {
    it('nananna3', ()=> {
      const sortSpy = sinon.spy();
      const wrapper = shallow(<ToolbarSort sort={sortSpy} listSort={['truc', 'machin', 'bidule']}/>)
      wrapper.find("[data-focus='select-sort']").simulate('change', {target: {value: 'My new value'}})
      expect(sortSpy).to.have.property('callCount', 1);
      expect(sortSpy).to.have.been.calledWith()
    })

    it('nananna', ()=> {
      const wrapper = shallow(<ToolbarSort listSort={['truc', 'machin', 'bidule']}/>)
      expect(wrapper.find("[data-focus='option-sort']")).to.have.length(6);
    })
  })



})
