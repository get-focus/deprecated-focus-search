import React, {PropTypes, PureComponent} from 'react';
import {slice, set} from 'lodash';
import Button from 'focus-components/button';

export const connect = (options = {}) => {
    const {
        displayAll = false,
        numberOfElements = 6,
        valuesPropsName = 'values'
    } = options;
    return (ComponentToConnect) => {
        class ConnectedComponent extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    displayAll: displayAll
                };
                this._onShowButtonClick = this._onShowButtonClick.bind(this);
            }
            _onShowButtonClick() {
                const {displayAll} = this.state;
                this.setState({
                    displayAll: !displayAll
                });
            }
            render() {
                const {displayAll} = this.state;
                const values = this.props[valuesPropsName] || [];
                const displayedValues = slice(values, 0, displayAll ? undefined : numberOfElements);
                const overloadedProps = set({}, valuesPropsName, displayedValues);
                const showButton = displayAll ? (values.length > numberOfElements) : (displayedValues.length < values.length);
                return (
                    <div data-focus='show-partial-connector'>
                        <ComponentToConnect {...this.props} {...overloadedProps} />
                        <div data-focus='show-partial-connector__button'>
                            {!displayAll && showButton && <Button shape={null} label='focus.search.facets.show.more' onClick={this._onShowButtonClick} />}
                            {displayAll && showButton && <Button shape={null} label='focus.search.facets.show.less' onClick={this._onShowButtonClick} />}
                        </div>
                    </div>
                );
            }
        }
        ConnectedComponent.displayName = 'ShowPartialConnector';
        return ConnectedComponent;
    }
}
