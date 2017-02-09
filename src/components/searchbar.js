import React, {PropTypes, PureComponent} from 'react';
import ReactDOM from 'react-dom';
import InputSelect from 'focus-components/select-mdl';
import debounce from 'lodash/debounce';
import Icon from 'focus-components/icon';

export class SearchBarInput extends PureComponent {
    constructor(props) {
        super(props);
        const {queryActionWait, term} = props;
        this._onInputChange = this._onInputChange.bind(this);
        this._debouncedOnSearchBarInputChange = debounce(this._onSearchBarInputChange.bind(this), queryActionWait);
        this.state = { inputValue: term };
    }
    componentDidMount() {
        const {hasFocus, term} = this.props;
        if(hasFocus) {
            ReactDOM.findDOMNode(this.refs.searchBarInputText).focus();
        }
    }
    _onInputChange(value) {
        this.setState({
            inputValue: value
        });
        this._debouncedOnSearchBarInputChange(value)
    }
    _onSearchBarInputChange(value) {
        const {onChange, queryAction} = this.props;
        queryAction({term: value});
        if(onChange) onChange({term: value});
    }
    render() {
        const {placeholder} = this.props;
        const {inputValue} = this.state;
        return (
            <div data-focus='search-bar-input'>
                <Icon name='search' />
                <input
                    placeholder={this.props.placeholder}
                    name='search-bar-input'
                    onChange={(evt) => this._onInputChange(evt.target.value)}
                    ref='searchBarInputText'
                    value={inputValue} />
            </div>
        );
    }
};
SearchBarInput.displayName = 'SearchBarInput';
SearchBarInput.propTypes = {
    hasFocus: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    queryAction: PropTypes.func.isRequired,
    queryActionWait: PropTypes.number,
    term: PropTypes.string
};
SearchBarInput.defaultProps = {
    hasFocus: false,
    placeholder: '',
    queryActionWait: 300,
    term: ''
};

export class SearchBarScopeSelection extends PureComponent {
    constructor(props) {
        super(props);
        this._onScopeChange = this._onScopeChange.bind(this);
    }
    _onScopeChange(value) {
        const {onChange, scopeAction} = this.props;
        if(onChange) onChange({scope: value});
        if(value === 'all') {
            scopeAction({group: {value: {}, replace: false}, query: {value: {scope: undefined}, replace: false}})
            return;
        }
        scopeAction({query: {value: {scope: value}, replace: false}, group: {value: {}, replace: true}})
    }
    render() {
        const {scope, scopes} = this.props;
        //console.log('SearchBarScopeSelection', scope, scopes);
        return (
            <InputSelect
                data-focus='search-bar-scope-selection'
                hasUndefined={false}
                name='search-scope'
                onChange={this._onScopeChange}
                rawInputValue={scope || 'all'}
                values={scopes}
                valueKey='value' />
        );
    }
};
SearchBarScopeSelection.displayName = 'SearchBarScopeSelection';
SearchBarScopeSelection.propTypes = {
    onChange: PropTypes.func,
    scope: PropTypes.string,
    scopes: PropTypes.arrayOf(PropTypes.object),
    scopeAction: PropTypes.func
};
SearchBarScopeSelection.defaultProps = {
    scopes: []
};



export default class SearchBar extends PureComponent {
    render() {
        const {hasFocus, onChange, unitSearchDispatch:{queryAction, queryActionWait, scopeAction }, scopes, scope, term, placeholder} = this.props;
        const hasScopes = scopes && scopes.length > 0;
        return (
            <div data-focus='search-bar'>
                    {hasScopes &&
                        <SearchBarScopeSelection
                            onChange={onChange}
                            scopeAction={scopeAction}
                            scopes={scopes}
                            scope={scope} />
                    }
                    <SearchBarInput hasFocus={hasFocus} placeholder={placeholder} onChange={onChange} queryAction={queryAction} queryActionWait={queryActionWait} term={term} />
            </div>
        );
    }
};
SearchBar.displayName = 'SearchBar';
SearchBar.PropTypes = {
    hasFocus: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    queryAction: PropTypes.func.isRequired,
    queryActionWait: PropTypes.number,
    scope: PropTypes.string,
    scopes: PropTypes.arrayOf(PropTypes.object),
    scopeAction: PropTypes.func,
    term: PropTypes.string
};
