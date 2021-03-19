import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { BrowserRouter, Route } from 'react-router-dom'
import Orders from './containers/Orders/Orders'

class App extends Component {

  // state = {
  //   show: true
  // }

  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false})
  //   },5000)
  // }

  render() {
    return (
      <BrowserRouter>
        <Layout >

          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />

        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
