import React, { Suspense, useEffect } from 'react';
import './App.css';
import Layout from './layout/Layout';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setNavItem } from './store/actionCreators/navActions';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { setInitLocations } from './store/actionCreators/locationAction';
import { setInitFactories } from './store/actionCreators/factoryAction';

import { setLocationLoading } from './store/actionCreators/dataActions';
import { setFactoryLoading } from './store/actionCreators/dataActions';
import { setLocationErrorMessage } from './store/actionCreators/dataActions';
import { setFactoryErrorMessage } from './store/actionCreators/dataActions';

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const NewFactory = React.lazy(() => import('./pages/NewFactory'))
const AddLocation = React.lazy(() => import('./pages/AddLocation'))
const EditFactories = React.lazy(() => import('./pages/EditFactories'))
const Locations = React.lazy(() => import('./pages/Locations'))

function App() {
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => { 
    (function fetchLocationData() {
      dispatch(setLocationLoading(true))
      axios.get('http://localhost:5000/locations')
      .then(response => dispatch(setInitLocations(response.data)))
      .catch(error => dispatch(setLocationErrorMessage(error.message)))
      .then(() => dispatch(setLocationLoading(false)) )
    })()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    (function fetchFactoriesData(){
      dispatch(setFactoryLoading(true))
      axios.get('http://localhost:5000/factories')
      .then(response => dispatch(setInitFactories(response.data)))
      .catch(error => dispatch(setFactoryErrorMessage(error.message)))
      .then(() => dispatch(setFactoryLoading(false)) )
      
    })()  
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    switch(location.pathname){
      case '/dashboard' || '/':
        dispatch(setNavItem('Dashboard'))
        break;
      case '/newfactory':
        dispatch(setNavItem('New factory'))
        break;
      case '/editfactories':
        dispatch(setNavItem('Edit factories'))
        break;
      case '/locations':
        dispatch(setNavItem('Locations'))
        break;
      case '/addlocation':
        dispatch(setNavItem('Add location'))
        break;
      default:
        dispatch(setNavItem('Dashboard'))
        break;
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const page = useSelector(s => s.navbar)
  return (
    <div className="App">
      <Layout title={page.item}>
        <Suspense fallback={<> <h6>Loading... </h6> <Spinner animation="border" size="sm" /> </>}>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/newfactory" element={<NewFactory />} />
              <Route path="/addlocation" element={<AddLocation />} />
              <Route path="/editfactories" element={<EditFactories />} />
              <Route path="/locations" element={<Locations />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
