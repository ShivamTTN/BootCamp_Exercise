import React, { useState } from 'react';
import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import { connect } from 'react-redux'

import classes from './Layout.css'

const layout = props => {

    const [showSideDrawer,setShowSideDrawer] = useState(false)

    // state = {
    //     showSideDrawer: false
    // }
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
        // this.setState({ showSideDrawer: false })
    }

    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(!showSideDrawer)
        // this.setState((prevState) => { return { showSideDrawer: !this.state.showSideDrawer } });
    }



    return (<Aux>
        {/* <div>ToolBar,SideDrawer,BackDrop</div> */}
        <Toolbar
            openMenu={sideDrawerOpenHandler}
            isAuth={props.isAuthenticated}
        />
        <SideDrawer
            isAuth={props.isAuthenticated}
            open={showSideDrawer}
            closed={sideDrawerClosedHandler}
        />
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
    );

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);