import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state = {
        post: null
    }
    componentDidMount() {
        // console.log(this.props)
        this.loadedData();
        
    }
    componentDidUpdate(){
        console.log(this.props)
        this.loadedData();
    }

    loadedData(){
        if (this.props.match.params.id) {
            if (!this.state.post || (this.state.post && this.state.post.id !== +this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        //const postData = response.data;
                        this.setState({ post: response.data });
                        //console.log(response.data)
                    });
            }
        }
    }
    deletePostHandler = ()=>{
        axios.delete('/posts/' + this.props.match.params.id)
        .then(response=>{
            console.log(response)
        })
    }
    render() {
        let postData = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            postData = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }

        if (this.state.post) {
            postData = (
                <div className="FullPost">
                    <h1>{this.state.post.title}</h1>
                    <p>{this.state.post.body}</p>
                    <div className="Edit">
                        <button  onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return postData;
    }
}

export default FullPost;