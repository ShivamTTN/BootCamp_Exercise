import React, { Component } from 'react';
import { Route, NavLink, Switch,} from 'react-router-dom'
import Posts from './Posts/Posts'
import asyncComponent from '../../hoc/asyncComponent'
// import FullPost from './FullPost/FullPost'
// import NewPost from './NewPost/NewPost'

// import axios from 'axios'

// import Post from '../../components/Post/Post';
// import FullPost from '../../components/FullPost/FullPost';
// import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

const AsyncNewPost = asyncComponent(()=>{
    return import('./NewPost/NewPost')
    
})

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
        auth: true
    }


    render() {

        return (
            <div>
                <header className='Blog'>
                    <nav>
                        <ul>
                            <li><NavLink to='/posts/'
                                exact
                                activeClassName='active'
                                activeStyle={{ textDecoration: 'underline', color: 'blue' }}
                            >
                                Posts
                              </NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#none',
                                search: 'quick-submit=true'
                            }}>New Post</NavLink></li>

                        </ul>
                    </nav>
                </header>

                {/* <section>
                    <FullPost postId={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section> */}
                {/* <Route path='/' exact render={() =>
                    <h1>Hello</h1>
                } /> */}
                {/* <Route path='/new-post' exact render={() =>
                    <Posts />
                } /> */}

                <Switch>
                    {this.state.auth ? <Route path='/new-post' component={AsyncNewPost} /> : null}
                    <Route path='/posts' component={Posts} />
                   
                    <Route render={()=><h1>Error 404!!! Not Found</h1>}></Route>
                    {/* <Redirect from='/' to='/posts'></Redirect> */}

                </Switch>
            </div>
        );
    }
}

export default Blog;