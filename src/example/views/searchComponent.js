import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import {unitSearchActionBuilder} from '../../actions/action-search';
import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import debounce from 'lodash/debounce'
import {unitSearchActions, searchAction as search} from '../actions/search-actions'

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
    const {dipatchSearch} = this.props;
    const onClick = () => dipatchSearch(this.props.reduxState);
    return <Button onClick={onClick} >seeeeeearrrrch</Button>
  }
  renderInputToSearch(){
    const {dispatchQuery} = this.props;
    const onChange = (value) => dispatchQuery(value);
    return <input onChange={({target:{value}}) => onChange(value)} />
  }
  render () {
    return <div style={{color: 'orange'}}>Search Page
      <code><pre>{JSON.stringify(this.props.reduxState)}</pre></code>
      {this.renderDispatchButton()}
      {this.renderSearchAction()}
      {this.renderInputToSearch()}
    </div>;
  }

}

const ConnectedComponentSearch = compose(
  connectToState(s => ({reduxState: s}), dispatch => ({
      dispatchDeLaGloire : (data) => {
        dispatch(unitSearchActions.updateFacets('dfsfhsdbfbhsdgjfsj'));
        dispatch(unitSearchActions.updateScope('yo'))
        dispatch(unitSearchActions.updateQuery('yo'))
        dispatch(unitSearchActions.updateSelectedFacets('yo'))
      },
      dipatchSearch: (data) => {
        dispatch(search.action(data))
      },
      dispatchQuery: (value) => {
        dispatch(unitSearchActions.updateQuery(value))
      }

    }
  ))
)(Search)
export default ConnectedComponentSearch;
