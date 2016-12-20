import React, {PropTypes, PureComponent} from 'react';
import {slice, set} from 'lodash';
import Button from 'focus-components/button';

export default (options = {}) => {
    const {
        page = 10,
        skip = 0,
        top = 10,
        onClickNext = (params) => console.log('please define a function. The passed params are ' + JSON.stringify(params))
    } = options;
    return (ComponentToConnect) => {
        class PaginationConnector extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    top: top
                };
                this._onClickNext = this._onClickNext.bind(this);
                console.log('constructor');
            }
            _onClickNext() {
                const newTop = this.state.top + page;
                this.setState({
                    top: newTop
                });
                onClickNext(newTop, skip);
            }
            render() {
                const {top} = this.state;
                return (
                    <div data-focus='pagination'>
                        <ComponentToConnect {...this.props} />
                        <div data-focus='pagination__actions'>
                            <Button label='focus.application.paginate.show.next' onClick={this._onClickNext} />
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
