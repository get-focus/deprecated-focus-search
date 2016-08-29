import React, {Component, PropTypes} from 'react';
import {IndexRoute, Router, Route} from 'react-router';
import Home from './views/home';
import App from './app'
import {Provider as StoreProvider} from 'react-redux';
import 'babel-polyfill';
import {Provider as SearchProvider} from '../behaviours/search';

/* Components */
const _getListMetadata = (contentType, listData) => {
    switch (contentType) {
        case 'DonDiegoType':
        return {
            LineComponent: props => {
                const color = props.isSelected ? 'orange' : 'blue'
                return (
                    <div>
                        <input type='checkbox' checked={props.isSelected} onClick={() => props.toggleLineSelection(props.id)}/>
                        <div>Line DonDiegoType {JSON.stringify(props)}</div>
                    </div>)
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

    class Root extends Component { /*On place le provider de store au plus haut afin de pouvoir injecter des informations du store dans toute l'applciation.*/
        render() {
            const {store, history} = this.props;
            return (
                <StoreProvider store={store}>
                    <SearchProvider store={store} searchMetadata={{getListMetadata : _getListMetadata, sortList: ['ouaaaaah', 'ceeeeest', 'biiiiiiiiennnnn'], groupList: ['ouaaaaah', 'ceeeeest', 'biiiiiiiiennnnn']}}>
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

    Root.propTypes = {
        history: PropTypes.object.isRequired
    };

    export default Root;
