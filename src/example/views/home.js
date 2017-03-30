import React, {PureComponent, PropTypes} from 'react';
import {Link} from 'react-router';
import compose from 'lodash/flowRight';
import {connect as connectToSearch} from '../../behaviours/search';
import {unitQuickSearchActions} from '../actions/search-actions';
import {QuickSearch} from '../../components/quick-search';
import SearchBar from '../../components/searchbar';
import i18next from 'i18next';
import Button from 'focus-components/button';
import Modal from 'focus-components/Modal';

const quickSearchOptions= {
    searchName : 'quickSearch',
    unitSearch : unitQuickSearchActions
};
const ConnectedComponentQuickSearch = compose (
    connectToSearch(quickSearchOptions)
)(QuickSearch);

const searchBarOptions = {
    searchName : 'advancedSearch',
    unitSearch : unitAdvancedSearchActions
};

// search bar component
class SearchBarComponent extends PureComponent {
    render() {
        const {onChange, SearchBarProps: {scope, scopes, term, unitSearchDispatch: {queryAction, scopeAction}}} = this.props;
        console.log('on change', onChange);
        return (
            <SearchBar
                onChange={onChange}
                queryAction={queryAction}
                scopes={scopes}
                scope={scope}
                placeholder={i18next.t(`search.bar.placeholder.${scope}`)}
                scopeAction={scopeAction}
                term={term} />
        );
    };
};
SearchBarComponent.displayName = 'SearchBarComponent';
SearchBarComponent.propTypes = {
    onChange: PropTypes.func
};

const ConnectedSearchBar = compose (
    connectToSearch(searchBarOptions)
)(SearchBarComponent);

class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isQuickSearchModalOpen: false
        }
    }

    _onQuickSearchModalToggle = () => {
        const {isQuickSearchModalOpen} = this.state;
        this.setState({isQuickSearchModalOpen: !isQuickSearchModalOpen});
    }

    render() {
        const {isQuickSearchModalOpen} = this.state;
        return(
            <div>
                <div data-demo='home'>
                    <div data-demo='header' className='mdl-shadow--3dp'></div>
                    <div data-demo='content'>
                        Yyoyooyoyo
                        <ConnectedSearchBar />
                    </div>
                    <Button label='quick search' onClick={this._onQuickSearchModalToggle} />
                    <Link to='/advanced'><Button label='advanced search'/></Link>
                </div>
                {isQuickSearchModalOpen &&
                    <Modal open={true} type='from-right'>
                        <ConnectedComponentQuickSearch />
                    </Modal>
                }
            </div>
        )
    }
};

Home.displayName = 'Home';
export default Home;
