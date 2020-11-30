import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import Error from './pages/Error';
import Signin from './pages/Signin';
import {Template} from './components/TemplateComponents';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
const Page=(props)=>{
  return(
    <BrowserRouter>
      <Template>
        <Header/>
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/signin"><Signin/></Route>
          <Route exact path="/about"><About/></Route>
          <Route><Error/></Route>
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
