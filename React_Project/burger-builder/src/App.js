import React, { useEffect, Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
// import Orders from './containers/Orders/Orders'
// import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import { connect } from 'react-redux'
import * as actions from './store/actions/index'

// import asyncComponent from './hoc/asycComponent/asycComponent'


const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
})

const Order = React.lazy(() => {
  return import('./containers/Orders/Orders')
})

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
})



const app = props => {

  // state = {
  //   show: true
  // }

  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false})
  //   },5000)
  // }

  const { onTryAutoSignUp } = props;

  useEffect(() => {
    onTryAutoSignUp()
  }, [onTryAutoSignUp])
  // componentDidMount() {
  //   this.props.onTryAutoSignUp()
  // }

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth  {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Order {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>)
  }
  return (

    <Layout >

      {/* {this.state.show ? <BurgerBuilder /> : null} */}
      <Suspense fallback={<p>Loading ..</p>}>
        {routes}
      </Suspense>


    </Layout>

  );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
