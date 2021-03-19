import React, { Component } from 'react'
import axios from 'axios'
import Post from '../../../components/Post/Post'
import { Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'
// import { Link } from 'react-router-dom'

import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        // console.log(this.props)
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 5);
                const updatedPost = posts.map((ele) => {
                    return {
                        ...ele,
                        author: 'shivam'
                    }
                })
                this.setState({ posts: updatedPost })
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: true })
            })
    }


    postClickHandler = (id) => {
        // this.props.history.push({pathname : '/' + id})
        this.props.history.push('/posts/'+  id)
    }


    render() {
        let posts = <p style={{ textAlign: 'center' }}><strong>Something Went Wrong</strong></p>
        if (this.state.posts) {
            posts = this.state.posts.map(ele => {
                return (
                    // <Link to={'/' + ele.id} 
                    // style={{textDecoration:'none',color:'black'}}
                    // >

                    <Post
                        key={ele.id}
                        title={ele.title}
                        author={ele.author}
                        clicked={() => this.postClickHandler(ele.id)}
                    />


                    // </Link>
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}

                </section>
                <Route path={this.props.match.url + '/:id'} component={FullPost} />
            </div>
        )
    }
}
export default Posts;