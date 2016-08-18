import React, {PropTypes} from 'react';
import ToolBar from './toolbar';
import connectToSelectableList from './selectable-list';

export function MaterialListWrapper ({children}) {
  return <ul data-focus='list-component' className='mdl-list'>{children}</ul>;
}

export function ListComponent({toggleLineSelection, LineComponent, lineIdentifierProperty, data}){
    return <ul data-focus='list-component'>
    {data.map( ({isSeleted, ...lineDescriptor}) =><div data-focus='line-advanced-search' key={lineDescriptor[lineIdentifierProperty]}> <LineComponent isSelected={isSeleted} toggleLineSelection={toggleLineSelection}  {...lineDescriptor} /></div>)}
    </ul>
  }

ListComponent.displayName='Selectable List Component ';
ListComponent.propTypes= {
  toggleLineSelection: PropTypes.func.isRequired,
  LineComponent: PropTypes.func.isRequired,
  lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.array.isRequired,

}


/*
<Provider Lines>

const connectToLineComponent =  Component => ({contentType, ...otherProps}) => {
  const LineComponent = _getLineComponentFromContext(contentType);
  return <Component {...otherProps} LineComponent={LineComponent}/>;
}
*/
export function ResultList ({data, isSelectable, lineIdentifierProperty, LineComponent, sort, group, ListWrapper, sortList, isGroup, groupList}) {
  const ListWrapperSelectable = connectToSelectableList(ListComponent, LineComponent) ;
  return(
    <div data-focus='result-list'>
      <ToolBar data-focus='toolbar-advanced-search' listGroup={groupList} listSort={sortList} sort={sort} group={group} isGroup={isGroup}/>
      {
        isSelectable ?
        <ListWrapperSelectable data-focus='selectable-list-advanced-search' data={data}/> :
        <ListWrapper data-focus='list-advanced-search'>
          {data.map(lineDescriptor => <LineComponent  data-focus='line-advanced-search' key={lineDescriptor[lineIdentifierProperty]} {...lineDescriptor} />)}
        </ListWrapper>
      }
    </div>
  );
}

ResultList.defaultProps = {
  data: [],
  lineIdentifierProperty: 'id',
  isSelectable: false,
  ListWrapper: MaterialListWrapper
}

ResultList.propTypes = {
  data: PropTypes.array,
  lineIdentifierProperty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSelectable: PropTypes.bool,
  /* This function is use to get the line component depending */
  ListWrapper: PropTypes.func
}
export function ResultGroup  ({data, sort, group, isGroup}) {
  return <div data-focus='result-group' >
    {data.map(element => {
        //TO do add ListWrapper
        return <ResultList data={element.data}
                  sort={sort} group={group}
                  isGroup={isGroup}
                  LineComponent={element.LineComponent}
                  groupList={element.groupList}
                  sortList={element.sortList} />
    })}
  </div>
}

ResultGroup.displayName='Result Group'
ResultGroup.propTypes= {
  data: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired,
  group: PropTypes.func.isRequired,

}
ResultGroup.defaultProps= {
  data: [],
  sort: ()=>{},
  group: ()=>{}
}
