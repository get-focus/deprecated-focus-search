import React, {Component, PropTypes} from 'react';
import {connect as connectToForm } from 'focus-redux/behaviours/form';
import {connect as connectToMetadata} from 'focus-redux/behaviours/metadata';
import {connect as connectToFieldHelpers} from 'focus-redux/behaviours/field';
import {loadUserAction, saveUserAction} from '../../actions/user-actions';

// Les boutons de de save et de load sont maintenant portés par le panel, attention de ne pas utiliser celui de Focus-components
import Panel from 'focus-redux/components/panel';
import compose from 'lodash/flowRight';

class User extends Component {
    componentWillMount() {
        const {id, load} = this.props;
        // Et voila un load !
        load({id});
    }

    render() {
        // Via le connectToFieldHelpers nous pouvons récupérer les fieldFor des props
        const {fieldFor} = this.props;
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

//FormKey : Elle doit être unique pour chaque Form, elle nous permet d'avoir un discrinant !
//Definit les definitions relatives au form en question, vous pouvez en mettre autant que vous voulez !
// Load Action, elle porte bien son nom ! Elle se trouve maintenant dans les props sous le nom de .... load
// Save Action, elle porte également très bien sont nom et se trouve également dans les props sont le nom de ... save !!
// nonValidatedFields : vous avez une défition qui donne un champ required et pour ce form en particulier vous voulez l'enlevez
// c'est l'endroit, il suffit de mettre: entityPath."nom de la proprieté", pour les listes voici un exemple : {'user.childs': ['firstName']}
// 'entityPath.'nom de la propriété de la liste dans l'objet' : tableau des proprietés de l'objet de la liste
const formConfig = {
    formKey: 'userForm',
    entityPathArray: ['user'],
    loadAction: loadUserAction,
    saveAction: saveUserAction,
    nonValidatedFields: ['user.firstName']
};

// Il faut connecter notre composant aux différents providers
// Les domaines + définitions
// Puis pour le form
// et enfin le FieldHelpers
// Attention l'ordre des connecteurs est important !
const ConnectedUserForm = compose(
    connectToMetadata(['user']),
    connectToForm(formConfig),
    connectToFieldHelpers()
)(User);

export default ConnectedUserForm;
