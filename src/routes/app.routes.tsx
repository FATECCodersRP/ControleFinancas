import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './private.routes';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import CadUsers from "../pages/CadUsers";
import CadMovement from "../pages/CadMovement"
import UserTable from "../pages/UserManagement"

const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/list/:type" exact component={List} /> 
            <Route path="/CadUser" exact component={CadUsers} /> 
            <Route path="/CadMovement" exact component={CadMovement} /> 
            <PrivateRoute path="/adm" exact component={UserTable} />         
            
        </Switch>
    </Layout>
);

export default AppRoutes;
