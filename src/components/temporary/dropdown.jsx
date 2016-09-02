import React, {Component, PureComponent, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import MDBehaviour from 'focus-components/behaviours/material';
import Button from 'focus-components/components/button';
import {translate} from 'focus-core/translation';
import uniqueId from 'lodash/uniqueId';
import map from 'lodash/map';

@MDBehaviour('dropdown')
class Dropdown extends PureComponent {
    constructor(props) {
        super(props);
        this._htmlId = uniqueId('dropdown-');
        this.state = {
            menuVisible: false
        };
    };

    _handleAction(action) {
        return () => {
            if (this.props.operationParam) {
                action(this.props.operationParam);
            } else {
                action();
            }
        };
    };

    _handleButtonClick() {
        this.setState({menuVisible: !this.state.menuVisible});
    };

    render() {
        const {menuVisible} = this.state;
        const {buttonProps, menuPosition, operationList} = this.props;
        const mdlClasses = `mdl-menu mdl-menu--${menuPosition.vertical}-${menuPosition.horizontal} mdl-js-menu mdl-js-ripple-effect`;
        if(0 === operationList.length) { return null; }
        return (
            <div data-focus='dropdown'>
                <Button handleOnClick={this._handleButtonClick.bind(this)} icon={buttonProps.icon} id={this._htmlId} isJs={true} label={buttonProps.label} shape={buttonProps.shape}  />
                <ul className={mdlClasses} htmlFor={this._htmlId} ref='dropdown'>
                    {map(operationList, (operation, idx) => (
                        <li className={`mdl-menu__item ${operation.style}`} key={idx}
                            onClick={this._handleAction(operation.action)}>
                            {translate(operation.label)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
};

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = {
    menuPosition: {
        vertical: 'bottom',
        horizontal: 'left'
    },
    buttonProps: {
        icon: 'more_vert',
        shape: 'icon'
    },
    operationList: []
};
Dropdown.propTypes = {
    menuPosition: PropTypes.shape ({
        vertical: PropTypes.string.isRequired,
        horizontal: PropTypes.string.isRequired
    }),
    button: PropTypes.shape ({
        icon: PropTypes.string,
        label: PropTypes.string,
        shape: PropTypes.string
    }),
    operationList: PropTypes.array
};
export default Dropdown;
