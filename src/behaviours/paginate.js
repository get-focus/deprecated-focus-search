import React, {PropTypes, PureComponent} from 'react';
import {slice, set} from 'lodash';
import Button from 'focus-components/button';

export default (options = {}) => {
    const {
        page = 10,
        skip = 0,
        top = 10,
        otherAction,
        onClickNext = (params) => console.log('please define a function. The passed params are ' + JSON.stringify(params)),
        isOtherAction
    } = options;
    return (ComponentToConnect) => {
        class PaginationConnector extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    top: top
                };
                this._onClickNext = this._onClickNext.bind(this);
                this._otherAction = this._otherAction.bind(this);
            }
            _onClickNext() {
                const newTop = this.state.top + page;
                this.setState({
                    top: newTop
                });
                onClickNext(newTop, skip);
            }
            _otherAction(){
              otherAction({...this.props, ...this.state})
            }
            render() {
                const {top} = this.state;
                const {totalCount} = this.props;
                return (
                    <div data-focus='pagination'>
                        <ComponentToConnect {...this.props} />
                        <div data-focus='pagination-indicators'>{top} / {totalCount}</div>
                        <div data-focus='pagination__actions'>
                            {!isOtherAction && <Button label='focus.application.paginate.show.next' onClick={this._onClickNext} />}
                            {isOtherAction && <Button label='focus.application.paginate.other.action' onClick={this._otherAction} />}
                        </div>
                    </div>
                );
            }
        }
        PaginationConnector.displayName = 'PaginationConnector';
        PaginationConnector.props = ComponentToConnect.props;
        return PaginationConnector;
    }
}
