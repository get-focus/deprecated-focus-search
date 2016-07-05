import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import React, {Component, PropTypes} from 'react';
import map from 'lodash/map';
import debounce from 'lodash/debounce'
import {unitOtherSearchActions, otherSearchAction} from '../actions/search-actions'

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
    console.log(otherSearchAction);
    return <div style={{color: 'orange'}}>Other Search
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
)(Search)
export default ConnectedComponentSearch;
