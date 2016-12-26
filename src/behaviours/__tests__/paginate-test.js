// test utils
import { mount, shallow, render } from 'enzyme';
// Components
import connectPaginate from '../paginate';

describe('The Pagninate connector ', () => {
  describe('The connector with a list which uses the selected props', ()=>{
    const propsSpy = sinon.spy();
    const List = props => {
      return <ul>{props.data.map((d,i) => <li key={i}>{JSON.stringify(d)}</li>)}</ul>
    }
    const ConnectedPaginateList = connectPaginate()(props => <List data={[1,2,3]} />);
    const wrapper = mount(<ConnectedPaginateList onClickNext={propsSpy} />);
    it('should add four differents div', () => {
        expect(wrapper.find('[data-focus="pagination"]')).to.have.length(1)
        expect(wrapper.find('[data-focus="pagination-indicators"]')).to.have.length(1);
        expect(wrapper.find('[data-focus="pagination__actions"]')).to.have.length(1);
        expect(wrapper.find('[data-focus="list-with-pagination"]')).to.have.length(1)
    });
    it("should call the onClickNext function on the button next 's click", () => {
      expect(wrapper.find("[data-focus='pagination__actions']").find('button')).to.have.length(1);
      wrapper.find("[data-focus='pagination__actions']").find('button').simulate('click');
      wrapper.find("[data-focus='pagination__actions']").find('button').simulate('click');
      expect(propsSpy).to.have.callCount(2);
      expect(propsSpy).to.have.been.calledWith(20,0)
      expect(propsSpy).to.have.been.calledWith(30,0)
    });

    it("should call the otherAction function on the button other action 's click and props isOtherAction", () => {
      const otherAction=sinon.spy()
      const wrapperOther = mount(<ConnectedPaginateList onClickNext={()=>{}} otherAction={otherAction} isOtherAction={true} />);
      expect(wrapperOther.find("[data-focus='pagination__actions']").find('button')).to.have.length(1);
      wrapperOther.find("[data-focus='pagination__actions']").find('button').simulate('click');
      expect(otherAction).to.have.callCount(1);
    });
  });

});
