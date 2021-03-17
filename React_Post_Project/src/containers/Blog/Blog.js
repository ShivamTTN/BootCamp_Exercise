import React, { Component } from 'react';
import axios from 'axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }
    componentDidMount() {
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
                //console.log(error);
                this.setState({ error: true })
            })
    }
    postClickHandler = (id) => {
        this.setState({ selectedPostId: id })
    }
    render() {
        let post = <p style={{ textAlign: 'center' }}><strong>Something Went Wrong</strong></p>
        if (!this.state.error) {
            post = this.state.posts.map(ele => {
                return <Post
                    key={ele.id}
                    title={ele.title}
                    author={ele.author}
                    clicked={() => this.postClickHandler(ele.id)}
                />
            });
        }

        return (
            <div>
                <section className="Posts">
                    {post}
                </section>
                <section>
                    <FullPost postId={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;