import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadUserAction, saveUserAction} from '../../actions/user-actions';

import Panel from 'focus-redux/components/panel';
import compose from 'lodash/flowRight';

class User extends Component {
    componentWillMount() {
        const {id, load} = this.props;
        load({id});
    }

    render() {
        const {editing, fields, fieldFor,  loading, saving, list} = this.props;
        return (
            <Panel title='User' {...this.props}>
                {fieldFor('uuid', {entityPath: 'user'})}
                {fieldFor('firstName', {entityPath: 'user'})}
                {fieldFor('lastName', {entityPath: 'user'})}
            </Panel>
        );
    }
};

User.displayName = 'User';
const formConfig = {
    formKey: 'userForm',
    entityPathArray: ['user'],
    loadAction: loadUserAction,
    saveAction: saveUserAction,
    nonValidatedFields: ['user.firstName']
};

//Connect the component to all its behaviours (respect the order for store, store -> props, helper)
const ConnectedUserForm = compose(
    connectToMetadata(['user']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(User);

export default ConnectedUserForm;
