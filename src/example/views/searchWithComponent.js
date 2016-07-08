import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import SearchComponent from './searchComponent'
import OtherSearchComponent from './otherSearchComponent';
import AdvancedSearch from '../../components/advanced-search';
import {unitOtherSearchActions, otherSearchAction} from '../actions/search-actions'


class SearchWithComponent extends Component {
  render () {
    return <div style={{color: 'orange'}}>
      <AdvancedSearch action={otherSearchAction.action} deleteSelectedFacets={unitOtherSearchActions.deleteSelectedFacets} updateSelectedFacets={unitOtherSearchActions.updateSelectedFacets}/>
    </div>;
  }

}


const ConnectedComponentSearch = compose(
  connectToState(s => ({reduxState: s}), dispatch => ({
      dispatchDeLaGloire : (data) => {
        dispatch(unitOtherSearchActions.updateFacets('Ouaaaah'));
        dispatch(unitOtherSearchActions.updateScope('c'))
        dispatch(unitOtherSearchActions.updateQuery('est'))
        dispatch(unitOtherSearchActions.updateSelectedFacets('beau'))
      },
      dipatchSearch: (data) => {
        dispatch(otherSearchAction.action(data))
      },
      dispatchQuery: (value) => {
        dispatch(unitOtherSearchActions.updateQuery(value))
      }

    }
  ))
)(SearchWithComponent)
export default ConnectedComponentSearch;
