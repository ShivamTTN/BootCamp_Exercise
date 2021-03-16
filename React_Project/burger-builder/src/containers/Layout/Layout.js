import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import classes from './Layout.css'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !this.state.showSideDrawer } });
    }

    render() {

        return (<Aux>
            {/* <div>ToolBar,SideDrawer,BackDrop</div> */}
            <Toolbar openMenu={this.sideDrawerOpenHandler} />
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

export default Layout;