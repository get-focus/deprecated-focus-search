import React, {PropTypes} from 'react';
import ToolBar from './toolbar';
import connectToSelectableList from './selectable-list';

export const DefaultLineComponent = () => (
    <div style={{backgroundColor: 'tomato', color: 'white'}}>
        You forgot to define the LineComponent containing your data.
    </div>
);

export const MaterialListWrapper = ({children}) => (
    <ul data-focus='list-component' className='mdl-list'>{children}</ul>
);

export const MaterialLineWrapper = ({children, data, isSelected}) => (
    <li data-focus='line-component' className='mdl-list__item'>{children}</li>
);

/*
 export const ListComponent = ({toggleLineSelection, LineComponent, lineIdentifierProperty, data}) => (
     <div data-focus='list-component'>
         {data.map( ({isSeleted, ...lineDescriptor}) => (
             <LineComponent key={lineDescriptor[lineIdentifierProperty]} isSelected={isSeleted} toggleLineSelection={toggleLineSelection} {...lineDescriptor} />
         ))}
     </div>
 );
 ListComponent.displayName='ListComponent';
 ListComponent.defaultProps = {
     LineComponentWrapper: MaterialLineWrapper
 };
 ListComponent.propTypes = {
     data: PropTypes.array.isRequired,
     LineComponent: PropTypes.func.isRequired,
     LineComponentWrapper: PropTypes.func.isRequired,
     lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
     toggleLineSelection: PropTypes.func.isRequired
 };

 */

export const ListComponent = ({data, LineComponent, lineIdentifierProperty, LineComponentWrapper, ListComponentWrapper, toggleLineSelection}) => (
    <ListComponentWrapper data={data} LineComponent={LineComponent} lineIdentifierProperty={lineIdentifierProperty}>
        {data.map(({isSeleted, ...lineDescriptor}) => (
            <LineComponentWrapper key={lineDescriptor[lineIdentifierProperty]} data={data} isSeleted={isSeleted} {...lineDescriptor}>
                <LineComponent isSelected={isSeleted} toggleLineSelection={toggleLineSelection} {...lineDescriptor} />
            </LineComponentWrapper>
        ))}
    </ListComponentWrapper>
);
ListComponent.displayName='ListComponent';
ListComponent.defaultProps = {
    LineComponent: DefaultLineComponent,
    LineComponentWrapper: MaterialLineWrapper,
    ListComponentWrapper: MaterialListWrapper,
    toggleLineSelection: () => {}
};
ListComponent.propTypes = {
    data: PropTypes.array.isRequired,
    LineComponent: PropTypes.func.isRequired,
    LineComponentWrapper: PropTypes.func.isRequired,
    ListComponentWrapper: PropTypes.func.isRequired,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    toggleLineSelection: PropTypes.func.isRequired
};

export const Test = ({children}) => (
    <ul>{children}</ul>
);

/*
<Provider Lines>

const connectToLineComponent =  Component => ({contentType, ...otherProps}) => {
  const LineComponent = _getLineComponentFromContext(contentType);
  return <Component {...otherProps} LineComponent={LineComponent}/>;
}
*/
export const ResultList = ({data, group, groupList, isGroup, isSelectable, lineIdentifierProperty, LineComponent, LineComponentWrapper, ListComponentWrapper, sort, sortList}) => {
    const ListWrapperSelectable = isSelectable ? connectToSelectableList(ListComponent, { LineComponent, LineComponentWrapper, ListComponentWrapper }) : ListComponent;
    const notSelectableProps = { data, LineComponent, lineIdentifierProperty, LineComponentWrapper, ListComponentWrapper };
    return (
        <div data-focus='result-list'>
            <ToolBar listGroup={groupList} listSort={sortList} sort={sort} group={group} isGroup={isGroup} />
            {isSelectable && <ListWrapperSelectable data-focus='selectable-list-advanced-search' />}
            {!isSelectable && <ListComponent data-focus='list-advanced-search' {...notSelectableProps}/>}
        </div>
    );
};
ResultList.defaultProps = {
    data: [],
    lineIdentifierProperty: 'id',
    isSelectable: false
};
ResultList.propTypes = {
    data: PropTypes.array,
    lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isSelectable: PropTypes.bool,
    /* This function is use to get the line component depending */
    LineComponent: PropTypes.func,
    LineComponentWrapper: PropTypes.func,
    ListComponentWrapper: PropTypes.func
};



export const ResultGroup = ({data, sort, group, isGroup}) => (
    <div data-focus='result-group'>
        {data.map(element => (
            //TODO add ListWrapper
            <ResultList
                data={element.data}
                sort={sort} group={group}
                isGroup={isGroup}
                LineComponent={element.LineComponent}
                groupList={element.groupList}
                sortList={element.sortList} />
        ))}
    </div>
);
ResultGroup.displayName='ResultGroup';
ResultGroup.propTypes = {
    data: PropTypes.array.isRequired,
    sort: PropTypes.func.isRequired,
    group: PropTypes.func.isRequired
};
ResultGroup.defaultProps= {
    data: [],
    sort: () => {},
    group: () => {}
};
