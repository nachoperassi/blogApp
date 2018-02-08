import _ from 'lodash';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../actions/index';

class PostsIndex extends Component {
	// method executed after the component
	// is render
	componentDidMount() {
		this.props.fetchPosts();
	}

	renderPosts() {
		return (
			// as posts is not an array, we can't
			// use normal 'map' method

			// instead, we can use lodash map
			// which allows an object and a callback
			_.map(this.props.posts, (post) => {
				return (
					<Link
						to={`/posts/${post.id}`}
						className="list-group-item list-group-item-action"
						key={post.id}>
						{post.title}
					</Link>

				);
			})
		);
	}
 
	render() {
		return (
			<div className='posts-index'>
				<div className='text-xs-right'>
					<Link className='btn btn-primary btn-add' to='/posts/new'>
						Add a post
					</Link>
				</div>
				<h3>Posts</h3>
				<ul className='list-group'>
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);