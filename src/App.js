import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import Home from './pages/Home';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import About from './pages/About';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import Error from './pages/Error';
import Signin from './pages/Signin';
import RouteHandler from './components/RouteHandler';
import Signup from './pages/Signup';
import AdPage from './pages/AdPage';
import {Template} from './components/TemplateComponents';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
const Page=(props)=>{
  return(
    <BrowserRouter>
      <Template>
        <Header/>
        <Switch>
          <RouteHandler exact path="/"><Home/></RouteHandler>
          <RouteHandler exact path="/signin"><Signin/></RouteHandler>
          <RouteHandler exact path="/signup"><Signup/></RouteHandler>
          <RouteHandler exact path="/about"><About/></RouteHandler>
          <RouteHandler exact path="/ads"><Ads/></RouteHandler>
          <RouteHandler private exact path="/post-an-ad"><AddAd/></RouteHandler>
          <RouteHandler exact path="/ad/:id"><AdPage/></RouteHandler>
          <RouteHandler><Error/></RouteHandler>
        </Switch>
        <Footer/>
      </Template>
      
    </BrowserRouter>
  );
}
const mapStatToProps =(state)=>{
  return {
    user:state.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    
  }
}

export default connect(mapStatToProps,mapDispatchToProps)(Page);
