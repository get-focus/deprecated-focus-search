import React, {PropTypes, Component} from 'react';
import isFunction from 'lodash/isFunction'
import filter from 'lodash/filter';

const SELECTABLE_LIST = 'SELECTABLE_LIST';


// Default component which explains how the connect works.
function DefaultPureSelectableList(props) {
    return (
        <div style={{backgroundColor: 'tomato', color: 'white'}}>
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
            </p>
            // Example function
            <pre>
                <code>
                    {
                        `function MyExampleList({toggleLineSelection,   lineIdentifierProperty, data}) {
                            return (
                                <ul>
                                    {data.map(({isSelected, ...lineData}) => (
                                        <li>
                                            {JSON.stringify(lineData)}
                                            <button onClick={() => toggleLineSelection(lineData.id)}>
                                                {isSelected ? 'unselect' : 'select'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            );
                        }`
                    }
                </code>
            </pre>
        </div>
    );
};
DefaultPureSelectableList.propTypes = {
    lineIdentifierProperty: PropTypes.string.isRequired
};

const SELECTABLE_LIST_PROPTYPES = {
    data: PropTypes.array,
    lineIdentifierProperty: PropTypes.string.isRequired,
    afterSelection: PropTypes.func
};
const SELECTABLE_LIST_DEFAULT_PROPS = {
    data: [],
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

function toggleAllLine(selectedElements, dataList, lineIdentifierProperty = 'id', selectState){
    return dataList.reduce((previous, dataLine) => {
        return {...previous, [dataLine[lineIdentifierProperty]] : !selectState }
    }, {});
}

function ckeckIfAllElementSelected(selectedElements, dataLength){
    const selectedElementsKeys = Object.keys(selectedElements);
    return selectedElementsKeys.reduce((selectedState, elementKey) => {
        if(selectedState !== false) return selectedState;
        return selectedElements[elementKey];
    }, false)

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
    if(!isFunction(ListToConnect)) throw new Error(`${SELECTABLE_LIST}: You should provide a List Component to the connector.`);

    class SelectableList extends Component {
        constructor(props) {
            super(props);
            this.state = {
                selectedElements: {},
                selectState: false
            };
            this.toggleLineSelectionInState = this.toggleLineSelectionInState.bind(this);
            this.toggleAllLine = this.toggleAllLine.bind(this);
        };

        toggleLineSelectionInState(action) {
            //To add when all the element is checked :
            const selectedElements = toggleLineSelection(this.state.selectedElements, action);
            this.setState({
                selectedElements,
                selectState: ckeckIfAllElementSelected(selectedElements, this.props.data.length)
            },
            this.props.afterSelection.bind(this));
        };

        toggleAllLine() {
            this.setState({
                selectedElements: toggleAllLine(this.state.selectedElements, this.props.data, this.props.lineIdentifierProperty, this.state.selectState),
                selectState: !this.state.selectState
            });
        };

        render() {
            const {data, lineIdentifierProperty, ...otherProps} = this.props;
            const {selectedElements, selectState} = this.state;
            const dataWithSelectedInformation = addSelectedInformationInList(
                data,
                selectedElements,
                lineIdentifierProperty
            );
            const selectedDatas = filter(dataWithSelectedInformation, {'isSelected': true});
            return (
                <ListToConnect
                    data={dataWithSelectedInformation}
                    lineIdentifierProperty={lineIdentifierProperty}
                    numberOfSelectedElement={selectedDatas.length}
                    selectedElements={selectedDatas}
                    stateOfTheSelectionList={selectState}
                    toggleAllLine={this.toggleAllLine}
                    toggleLineSelection={this.toggleLineSelectionInState}
                    {...otherProps} />
            );
        };
    };
    SelectableList.displayName = `connectSelectableList${ListToConnect.name}`;
    SelectableList.propTypes = SELECTABLE_LIST_PROPTYPES;
    SelectableList.defaultProps = SELECTABLE_LIST_DEFAULT_PROPS;
    return SelectableList;
}
export default connect;
