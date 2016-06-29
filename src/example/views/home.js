import {connect as connectToState} from 'react-redux';
import compose from 'lodash/flowRight';
import Button from './components/button';
import {updateQuery} from '../../actions/action-search';
import React, {Component, PropTypes} from 'react';


const selectData = name => (state ={}) => {
  if( !state[name]) throw new Error(`SELECTOR_DATASET : there is no ${name} in the dataset of the state`);
  return state[name]
}

class Home extends Component {
  render () {
    console.log(this.props);
    return <div style={{color: 'orange'}}>Home Page
      <code><pre>{JSON.stringify(this.props.reduxState)}</pre></code>

      <Button onClick={()=> {
        this.props.dispatch(updateQuery('yo'))
      }} ></Button>
    </div>;
  }

}

const ConnectedComponentHome = compose(
  connectToState(s => ({reduxState: s}), dispatch => ())
)(Home)
export default ConnectedComponentHome;
