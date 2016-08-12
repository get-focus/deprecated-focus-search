// test utils
import { mount, shallow, render } from 'enzyme';
// Components
import connectListToSelectable from '../selectable-list';

describe.only('Selectable list component ', () => {
  describe('The connector with a simple list component', ()=> {
    const List = props => <ul>{props.data.map((d,i) => <li key={i}>{JSON.stringify(d)}</li>)}</ul>
    List.defaultProps = {
      data: []
    }
    it('should throw an error when the ListComponent is not a function', () => {
      const ERROR_MSG = 'SELECTABLE_LIST: You should provide a List Component to the connector.';
      expect(() => connectListToSelectable({List})).to.throw(ERROR_MSG);
    });

    it('should be render without error', () => {
      const SelectableList = connectListToSelectable(List);
      const wrapper = shallow(<SelectableList />);
      expect(wrapper.find('li')).to.have.length(0);
    });
    it('should render the list as is', () => {
      const SelectableList = connectListToSelectable(List);
      const wrapper = render(<SelectableList data={[1,2,3,4,5]} />);
      expect(wrapper.find('li')).to.have.length(5);
    });
  });
  describe('The connector with a list which uses the selected props', ()=>{
    it('should call the spy with the toggleSelectProps ', () => {
      const propsSpy = sinon.spy();
      const List = props => {
        propsSpy(props);
        return <ul>{props.data.map((d,i) => <li key={i}>{JSON.stringify(d)}</li>)}</ul>
      }
      const SelectableList = connectListToSelectable(List);
      const wrapper = render(<SelectableList data={[1,2,3,4,5]} />);
      expect(propsSpy).to.have.callCount(1);
      const spyCall = propsSpy.getCall(0).args[0];
      expect(spyCall).to.be.an.object;
      expect(spyCall).to.have.property('toggleLineSelection');
      expect(spyCall.toggleLineSelection).to.be.a.function;
    });
  })
});
