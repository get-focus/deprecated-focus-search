import React, {PropTypes, Component} from 'react';
const DATA_TEST = [
  {id: 1,name: 'Amelie', age: 25},
  {id: 2, name: 'Pierre', age: 28}
]

function PureSelectableList(props){
  return <ul>
    hello
    {
      props.data.map(
      ({isSelected, ...lineData}) => <li key={lineData[props.lineIdentifierProperty]}>
          {'IsSelected:'} {isSelected ? '[x]' : '[ ]'} -
          {JSON.stringify(lineData)}
          <button onClick={() => props.toggleLine(lineData[props.lineIdentifierProperty])}>{'ToggleLine'}</button>
        </li>
      )
    }</ul>
}

PureSelectableList.propTypes = {
  lineIdentifierProperty: PropTypes.string.isRequired
}


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
    <PureSelectableList
      data={dataWithSelectedInformation}
      toggleLine={this.toggleLineSelectionInState.bind(this)}
      lineIdentifierProperty={lineIdentifierProperty}
    />);
  }
}

SelectableList.propTypes =  {
  data: PropTypes.array,
  lineIdentifierProperty: PropTypes.string.isRequired,
  afterSelection: PropTypes.func
}
SelectableList.defaultProps = {
  data: DATA_TEST, //[]
  lineIdentifierProperty: 'id',
  afterSelection: () => {console.log('lol je suis sélectionné')}
}

export default SelectableList;
