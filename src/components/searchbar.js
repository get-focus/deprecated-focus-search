import React, {PropTypes, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import InputText from 'focus-components/input-text';
import InputSelect from 'focus-components/select-mdl';
import debounce from 'lodash/debounce';

//TODO TGN : when another search bar is mounted in the header and header is reduced, if value is changed in the other search bar : modification is not impacted in the other SB
//maybe it should be possible de fix it by removing the cartridge when the page is scroll. or force the rerendering.
export class SearchBarInput extends PureComponent {
    constructor(props) {
        super(props);
        const {queryActionWait} = this.props;
        this._debouncedOnSearchBarInputChange = debounce(this._onSearchBarInputChange.bind(this), queryActionWait);
    }
    shouldComponentUpdate(nextProps) {
        return false; //no need to rerender as props only init the component. and it avoid to rerender input at each keypress ! it freeze the rendering
    }
    componentDidMount() {
        debugger;
        const {hasFocus, term} = this.props;
        this.refs.searchBarInputText.refs.htmlInput.value = term; //if i use rawInputValue it block the component
        if(hasFocus) ReactDOM.findDOMNode(this.refs.searchBarInputText.refs.htmlInput).focus();
    }
    _onSearchBarInputChange(value) {
        const {queryAction} = this.props;
        queryAction({term: value});
    }
    render() {
        return (
            <InputText
                data-focus='search-bar-input'
                name='search-bar-input'
                onChange={this._debouncedOnSearchBarInputChange}
                ref='searchBarInputText' />
        ); //do not use rawInputValue on InputText it freezes it value and make it uneditable.
    }
};
SearchBarInput.displayName = 'SearchBarInput';
SearchBarInput.propTypes = {
    hasFocus: PropTypes.bool,
    queryAction: PropTypes.func.isRequired,
    queryActionWait: PropTypes.number,
    term: PropTypes.string
};
SearchBarInput.defaultProps = {
    hasFocus: false,
    queryActionWait: 300,
    term: ''
};

export class SearchBarScopeSelection extends PureComponent {
    constructor(props) {
        super(props);
        this._onScopeChange = this._onScopeChange.bind(this);
    }
    _onScopeChange(value) {
        const {scopeAction} = this.props;
        if(value === 'all') {
            scopeAction({group: {value: {}, replace: false}, query: {value: {scope: undefined}, replace: false}})
            return;
        }
        scopeAction({query: {value: {scope: value}, replace: false}, group: {value: {}, replace: true}})
    }
    render() {
        const {scope, scopes} = this.props;
        return (
            <InputSelect
                data-focus='search-bar-scope-selection'
                hasUndefined={false} values={scopes}
                name='search-scope'
                onChange={this._onScopeChange}
                rawInputValue={scope || 'all'}
                valueKey='value' />
        );
    }
};
SearchBarScopeSelection.displayName = 'SearchBarScopeSelection';
SearchBarScopeSelection.propTypes = {
    scope: PropTypes.string,
    scopes: PropTypes.arrayOf(PropTypes.object),
    scopeAction: PropTypes.func
};
SearchBarScopeSelection.defaultProps = {
    scopes: []
};



export default class SearchBar extends PureComponent {
    render() {
        const {hasFocus, queryAction, queryActionWait, scope, scopeAction, scopes, term} = this.props;
        return (
            <div data-focus='search-bar'>
                <SearchBarScopeSelection
                    scopeAction={scopeAction}
                    scopes={scopes}
                    scope={scope} />
                <SearchBarInput hasFocus={hasFocus} queryAction={queryAction} queryActionWait={queryActionWait} term={term} />
            </div>
        );
    }
};
SearchBar.displayName = 'SearchBar';
SearchBar.PropTypes = {
    hasFocus: PropTypes.bool,
    queryAction: PropTypes.func.isRequired,
    queryActionWait: PropTypes.number,
    scope: PropTypes.string,
    scopes: PropTypes.arrayOf(PropTypes.object),
    scopeAction: PropTypes.func,
    term: PropTypes.string
};
