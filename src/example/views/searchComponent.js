import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import * as actionsSearch from '../../actions/action-search';
import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import {searchAction as search} from '../actions/search-actions'

const selectData = name => (state ={}) => {
  if( !state[name]) throw new Error(`SELECTOR_DATASET : there is no ${name} in the dataset of the state`);
  return state[name]
}

class Search extends Component {
  renderDispatchButton(){
    const {dispatchDeLaGloire} = this.props;
    const onClick = () => dispatchDeLaGloire()
    return <Button onClick={onClick} >action</Button>
  }
  renderSearchAction(){
    const {dispatchDeLaGloire} = this.props;
    const onClick = () => dispatchDeLaGloire(this.props.reduxState);
    return <Button onClick={onClick} >seeeeeearrrrch</Button>
  }

  render () {
    return <div style={{color: 'orange'}}>Search Page
      <code><pre>{JSON.stringify(this.props.reduxState)}</pre></code>
      {this.renderDispatchButton()}
      {this.renderSearchAction()}
    </div>;
  }

}

const ConnectedComponentSearch = compose(
  connectToState(s => ({reduxState: s}), dispatch => ({
      dispatchDeLaGloire : (data) => {
        dispatch(search.action(data))
        // dispatch(actionsSearch.updateFacets('dfsfhsdbfbhsdgjfsj'));
        // dispatch(actionsSearch.updateScope('yo'))
        // dispatch(actionsSearch.updateQuery('yo'))
        // dispatch(actionsSearch.updateSelectedFacets('yo'))
      }
    }
  ))
)(Search)
export default ConnectedComponentSearch;
