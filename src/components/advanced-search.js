import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import React, {Component, PropTypes} from 'react';
import {selectSearch} from '../reducer'

import FacetPanel from './facet';
import ToolBar from './toolbar';
import ActionQuery from './searchbar';
import {ResultList, ResultGroup} from './results';

export const AdvancedSearch = ({valuesForResults,unitSearchDispatch,  facetListWithselectedInformation, sort, group,data, query, facet, isGroup}) =>  {
  return <div style={{color: 'orange'}}>
    <ActionQuery group={unitSearchDispatch.group} query={unitSearchDispatch.query}/>
    {isGroup ?
      <ResultGroup isGroup={isGroup}
            data={valuesForResults}
            sort={unitSearchDispatch.sort}
            group={unitSearchDispatch.group}
            /> :
      <ResultList sort={unitSearchDispatch.sort}
            group={unitSearchDispatch.group}
            data={valuesForResults.values}
            sortList={valuesForResults.sortList}
            groupList={valuesForResults.groupList}
            LineComponent={valuesForResults.LineComponent}
            />
    }
    <FacetPanel data={facetListWithselectedInformation}
              facet={unitSearchDispatch.facet}
              title='My awesome facets'/>
  </div>;
}
