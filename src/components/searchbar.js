import React, {PropTypes, PureComponent} from 'react';
import InputText from 'focus-components/input-text';
import InputSelect from 'focus-components/select-mdl';


export class SearchBarInput extends PureComponent {
    render() {
        const {queryAction} = this.props;
        return <InputText data-focus='search-bar-input' name='search-bar-input' onChange={(value) => queryAction({term: value})} />
    }
};
SearchBarInput.displayName = 'SearchBarInput';
SearchBarInput.propTypes = {
    queryAction: PropTypes.func.isRequired
};



export class SearchBarScopeSelection extends PureComponent {
    constructor(props) {
        super(props);
        this._onScopeChange = this._onScopeChange.bind(this);
    }
    _onScopeChange(value) {
        const {scopeAction} = this.props;
        if(value === 'ALL') {
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
                rawInputValue={scope || 'ALL'}
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
        const {queryAction, scope, scopeAction, scopes} = this.props;
        return (
            <div data-focus='search-bar'>
                <SearchBarScopeSelection
                    scopeAction={scopeAction}
                    scopes={scopes}
                    scope={scope} />
                <SearchBarInput queryAction={queryAction} />
            </div>
        );
    }
};
SearchBar.displayName = 'SearchBar';
SearchBar.PropTypes = {
    queryAction: PropTypes.func.isRequired,
    scope: PropTypes.string,
    scopes: PropTypes.arrayOf(PropTypes.object),
    scopeAction: PropTypes.func
};
