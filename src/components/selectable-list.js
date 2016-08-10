import React, {PropTypes, Component} from 'react';
const DATA_TEST = [
  {id: 1,name: 'Amelie', age: 25},
  {id: 2, name: 'Pierre', age: 28}
]

// Default component which explains how the connect works.
function DefaultPureSelectableList(props){
  return <div style={{backgroundColor: 'tomato', color: 'white'}}>

    <p>
    {`  You forget to provide a ListComponent to the selectableList connector.`}
    <code>{`connectSelectableList(ListComponentToConnect)`}</code>
    </p>
    <p>
    {`In the props of your list you should have`}
    <ul>
     <li>{`data`}</li>
    <li>{`a line component in LineComponent`}</li>
    <li>{`a lineIdentifierProperty to know which property is the id of your line`}</li>
    </ul>
    With the connector to selectableList you will have
    <li>{`a isSelected property in each line data`}</li>
    <li>{`a toggleLineSelection function to toggle the line selection (you need to provide the id of the line)`}</li>
  }</p>
    // Example function
    <pre><code>
  {`function MyExampleList({toggleLineSelection,   lineIdentifierProperty, data}){
      return <ul>
        {
          data.map(
          ({isSelected, ...lineData}) => <li>

            {JSON.stringify(lineData)}
            <button onClick={() => toggleLineSelection(lineData.id)}>
            {isSelected ? 'unselect' : 'select'}
            </button>
          </li>
          )
        }
      </ul>
    }
    `}
    </code></pre>
  </div>
}

DefaultPureSelectableList.propTypes = {
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
const connect = (ListToConnect = DefaultPureSelectableList) => {
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
