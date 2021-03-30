import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import { connect } from 'react-redux'
import * as actions from './store/actions/index'

import asyncComponent from './hoc/asycComponent/asycComponent'


const asycCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asycOrder = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

const asycAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})



class App extends Component {

  // state = {
  //   show: true
  // }

  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false})
  //   },5000)
  // }
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asycAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={asycCheckout} />
          <Route path="/orders" component={asycOrder} />
          <Route path="/auth" component={asycAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>)
    }
    return (

      <Layout >

        {/* {this.state.show ? <BurgerBuilder /> : null} */}
        {routes}

      </Layout>

    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
