import React from 'react';
import Card from './card';

const routes = [
  {route: '/user/2', destination: 'Adress', description: 'Composant user avec une adresse', title: 'adress'},
  {route: '/user/finance/2', destination: 'Form', description: 'Composant user avec un superbe form', title: 'form'},
  {route: '/user/list/2', destination: 'Custom', description: 'Composant user avec un superbe form custom', title: 'custom'},
  {route: '/user/select/2', destination: 'Custom', description: 'Composant user avec un superbe form display', title: 'display'}
];

const Home = props => <div style={{display: 'flex', flexWrap: 'wrap'}}>{routes.map(route => <Card key={route.route} {...route} />)}</div>;

export default Home;
