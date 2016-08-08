import React, {PropTypes, Component} from 'react';
const DATA_TEST = [
  {id: 1,name: 'Amelie', age: 25},
  {id: 2, name: 'Pierre', age: 28}
]

function PureSelectableList(props){
  // TODO: add a component with explaination on how to do the selectable connxion.
  return <ul>
    hello
    {
      props.data.map(
      ({isSelected, ...lineData}) => <li key={lineData[props.lineIdentifierProperty]}>
          {'IsSelected:'} {isSelected ? '[x]' : '[ ]'} -
          {JSON.stringify(lineData)}
          <button onClick={() => props.toggleLineSelection(lineData[props.lineIdentifierProperty])}>{'ToggleLine'}</button>
        </li>
      )
    }</ul>
}

PureSelectableList.propTypes = {
  lineIdentifierProperty: PropTypes.string.isRequired
}


const SELECTABLE_LIST_PROPTYPES = {
  data: PropTypes.array,
  lineIdentifierProperty: PropTypes.string.isRequired,
  afterSelection: PropTypes.func
};

const SELECTABLE_LIST_DEFAULT_PROPS = {
  data: DATA_TEST, //[]
  lineIdentifierProperty: 'id',
  afterSelection: () => {}
};

function addSelectedInformationInList(dataList = [], selectedElements = {}, lineIdentifierProperty = 'id'){
  return dataList.map(
    lineData => ({
      ...lineData,
      isSelected: !!selectedElements[lineData[lineIdentifierProperty]]}
    )
  );
}

function toggleLineSelection(selectedElements, elementId){
  return {...selectedElements, ...{[elementId] : !selectedElements[elementId]}};
}

/**
 * Convert a list into a selectable list.
 * It does two things =>
 * - Add a `isSelected` props into the line data.
 * - Add  a `toggleLineSelection` sort of action which call the parent state and change the selected information.
 * Warning: Your list should have a props lineIdentifierPropert, see SELECTABLE_LIST_PROPTYPES. And the data shoud be an array.
 *Example
function PureSelectableListCustom({data, lineIdentifierProperty, toggleLineSelection}){
   return <ul>
     {
       data.map(
       ({isSelected, ...lineData}) => <li key={lineData[lineIdentifierProperty]}>
          {isSelected ? '[x]' : '[ ]'} -
           {JSON.stringify(lineData)}
           <button onClick={() => toggleLineSelection(lineData[lineIdentifierProperty])}>{'ToggleLine'}</button>
         </li>
       )
     }</ul>
 }
 *
*/
const connect = (ListToConnect = PureSelectableList) => {
  class SelectableList extends Component {
    constructor(props){
        super(props);
        this.state = {
          selectedElements: {}
        };
    }
    toggleLineSelectionInState(action){
      //console.log('action', this.state, action)
      this.setState({
          selectedElements: toggleLineSelection(this.state.selectedElements, action)
        },
        this.props.afterSelection.bind(this)
      );
    }
    render(){
      const {data, lineIdentifierProperty} = this.props;
      const dataWithSelectedInformation = addSelectedInformationInList(
        data,
        this.state.selectedElements,
        lineIdentifierProperty
      );
      return(
      <ListToConnect
        data={dataWithSelectedInformation}
        toggleLineSelection={this.toggleLineSelectionInState.bind(this)}
        lineIdentifierProperty={lineIdentifierProperty}
      />);
    }
  }
  SelectableList.displayName = `connectSelectableList${ListToConnect.name}`;
  SelectableList.propTypes = SELECTABLE_LIST_PROPTYPES;
  SelectableList.defaultProps = SELECTABLE_LIST_DEFAULT_PROPS;
  return SelectableList;
}



export default connect();
