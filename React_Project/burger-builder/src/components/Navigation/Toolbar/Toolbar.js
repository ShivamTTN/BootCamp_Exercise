import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

import classes from './Toolbar.css'


const toolbar = (props) => (
    <header className={classes.Toolbar}>
       <DrawerToggle clicked = {props.openMenu} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DestopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar;