import React, {PropTypes, Component} from 'react';
import {IndexRoute, Router, Route} from 'react-router';
import Home from './views/home';
import App from './app'
import {Provider as StoreProvider} from 'react-redux';
import 'babel-polyfill';
import {Provider as SearchProvider} from '../behaviours/search';

/* Components */
const _getLineComponentFromContentTypeExample = (contentType, listData) => {
  switch (contentType) {
    case 'DonDiegoType':
      return {
        LineComponent: props => {
          const color = props.isSelected ? 'orange' : 'blue'
          return <div style={{color: color}}>
                <input type='checkbox' value={props.isSelected} onClick={() => props.toggleLineSelection(props.id)}/>
                Line DonDiegoType {JSON.stringify(props)}
                </div>
        },
        sortList : [
          'ouuuuaaa',
          'trrropo',
          'lalal'
        ],
        groupList: [
          'lala',
          'lulu'
        ]
      }
      break;
    case 'DonRicardoType':
      return {
        LineComponent: props => <div>Line DonRicardoType {JSON.stringify(props)}</div>,
        sortList : [
          'lala',
          'lolo',
          'lulu'
        ],
        groupList: [
          'lala',
          'lulu'
        ]
      }
      break;
    default:
      return {
        LineComponent: props => <div>Bien le bonsoir</div>,
        sortList : [],
        groupList: []
      }

  }
}

class Root extends Component {
    render() {
        const {store, history} = this.props;
        return (
            <StoreProvider store={store}>
              <SearchProvider store={store} searchMetadata={{getLineComponentFromContentTypeExample : _getLineComponentFromContentTypeExample, sortList: ['ouaaaaah', 'ceeeeest', 'biiiiiiiiennnnn'], groupList: ['ouaaaaah', 'ceeeeest', 'biiiiiiiiennnnn']}}>
                <Router history={history}>
                  <Route path='/' component={App} >
                    <IndexRoute component={Home}/>
                  </Route>
                </Router>
              </SearchProvider>
            </StoreProvider>
        );
    }
}

Root.displayName = 'Root';
Root.propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};
export default Root;
