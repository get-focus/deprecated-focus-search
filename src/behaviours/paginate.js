import React, {PropTypes, PureComponent} from 'react';
import {slice, set} from 'lodash';
import Button from 'focus-components/button';
import i18next from 'i18next';

export default () => {
    return (ComponentToConnect) => {
        class PaginationConnector extends PureComponent {
            constructor(props) {
                super(props);
                this.state = {
                    top: props.top
                };
                this._onClickNext = this._onClickNext.bind(this);
                this._otherAction = this._otherAction.bind(this);
            }
            _onClickNext() {
                const { onClickNext, top, skip, page } = this.props;
                const newTop = this.state.top + page;
                this.setState({
                    top: newTop
                });
                onClickNext(newTop, skip);
            }
            _otherAction(){
                const {otherAction} = this.props;
                if(!otherAction) {
                    console.log('please define a other function for the other action.');
                    return;
                }
                window.scrollTo(0,0);
                otherAction({...this.props, ...this.state})
            }
            render() {
                const {top} = this.state;
                const {totalCount, otherAction, data} = this.props;
                const isOtherAction = otherAction !== undefined;
                const paginateCount = (data && data.length < top) ? data.length : top;
                return (
                    <div data-focus='list-with-pagination'>
                        <ComponentToConnect {...this.props} />
                        <div data-focus='pagination'>
                            <div data-focus='pagination-indicators'>{i18next.t(`focus.search.paginate.totalCount`, {count: paginateCount})}</div>
                            <div data-focus='pagination__actions'>
                                {!isOtherAction && <Button data-focus='paginate.show.next' label='focus.search.paginate.show.next' onClick={this._onClickNext} />}
                                {isOtherAction && <Button data-focus='paginate.other.action' label='focus.search.paginate.other.action' onClick={this._otherAction} />}
                            </div>
                        </div>
                    </div>
                );
            }
        }
        PaginationConnector.displayName = 'PaginationConnector';
        PaginationConnector.defaultProps = {
            onClickNext: (params) => console.log('please define a function. The passed params are ' + JSON.stringify(params)),
            page: 10,
            skip: 0,
            top: 10
        }
        PaginationConnector.propTypes = {
            onClickNext: PropTypes.func,
            otherAction: PropTypes.func,
            page: PropTypes.number,
            skip: PropTypes.nnumber,
            top: PropTypes.number
        }
        return PaginationConnector;
    }
}
