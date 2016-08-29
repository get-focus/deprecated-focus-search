import React, {PropTypes} from 'react';
import ToolBar from './toolbar';
import connectToSelectableList from './selectable-list';

export function MaterialListWrapper ({children}) {
    return <ul data-focus='list-component' className='mdl-list'>{children}</ul>
};

export function MaterialLineWrapper({children}) {
    return <li data-focus='line-component' className='mdl-list__item'>{children}</li>
};

export function ListComponent({toggleLineSelection, toggleAllLine, LineComponent, lineIdentifierProperty, data,  ListWrapper, LineWrapper,toolbarProps, selectState}){
    return <div>
        <ToolBar data-focus='toolbar-advanced-search'
            toolbarProps={toolbarProps}
            toggleAllLine={toggleAllLine}
            selectState={selectState}
            />
        <ListWrapper>
            {data.map( ({isSeleted, ...lineDescriptor}) =><div data-focus='line-advanced-search' key={lineDescriptor[lineIdentifierProperty]}> <LineWrapper><LineComponent isSelected={isSeleted} toggleLineSelection={toggleLineSelection}  {...lineDescriptor} /></LineWrapper></div>)}
        </ListWrapper>
    </div>
};

ListComponent.displayName ='ListcomponentWithSelection';
ListComponent.propTypes = {
    toggleLineSelection: PropTypes.func.isRequired,
    LineComponent: PropTypes.func.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    data: PropTypes.array.isRequired,
    ListWrapper: PropTypes.func.isRequired,
    LineWrapper: PropTypes.func
};
ListComponent.defaultProps = {
    ListWrapper: MaterialListWrapper,
    LineWrapper: MaterialLineWrapper
};


/*
<Provider Lines>

const connectToLineComponent =  Component => ({contentType, ...otherProps}) => {
const LineComponent = _getLineComponentFromContext(contentType);
return <Component {...otherProps} LineComponent={LineComponent}/>;
}
*/

export function ResultList({data, lineIdentifierProperty,  LineComponent, ListComponent, toolbarProps}) {
    return(
        <div data-focus='result-list'>
            {/**Toolbar needs the toggleAllLine :-1 */}
            <ListComponent data-focus='selectable-list-advanced-search'
                LineComponent={LineComponent}
                data={data}
                toolbarProps={toolbarProps}/>
        </div>
    );
};
ResultList.defaultProps = {
    data: [],
    lineIdentifierProperty: 'id',
    isSelectable: false,
    toolbarProps: {},
    ListComponent: ListComponent
};
ResultList.propTypes = {
    data: PropTypes.array,
    toolbarProps: PropTypes.object.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isSelectable: PropTypes.bool,
    /* This function is use to get the line component depending */
    ListComponent: PropTypes.func
};


export function ResultGroup  ({data, sort, group, isGroup, toolbarProps}) {
    return <div data-focus='result-group' >
        {data.map(element => {
            //TO do add ListWrapper
            return <ResultList data={element.data}
                toolbarProps={toolbarProps}
                LineComponent={element.LineComponent}
                />
        })}
    </div>
};
ResultGroup.displayName = 'Result Group'
ResultGroup.propTypes = {
    data: PropTypes.array.isRequired,
    toolbarProps: PropTypes.object.isRequired
};
ResultGroup.defaultProps = {
    data: [],
    toolbarProps: {}
};
