import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost } from '../actions/index';

class PostsDetails extends Component {
	
	// lifecycle method called when the component was rendered 
	componentDidMount() {
		// the match object (ReactRouter) contains information about the route
		const id = this.props.match.params.id;
		this.props.fetchPost(id);
	}

	render() {
		const post = this.props.post;

		if (!post) {
			return (
				<div>
					Loading...
				</div>
			);
		}

		return (
			<div className="card text-xs-center">
			  	<div className="card-header">
			    	Post
			  	</div>
			  	<div className="card-body">
			    	<h5 className="card-title">{post.title}</h5>
			    	<h6 className='categories'>Categories: {post.categories}</h6>
			    	<p className="card-text">{post.content}</p>
			    	<Link to='/' className="btn btn-primary">Back to index</Link>
			  	</div>
			  	<div className="card-footer text-muted">
			  	</div>
			</div>			
		);
	}
}

// ownProps are === to this.props
// is useful when we want to filter the state
// based on a component's property
function mapStateToProps({ posts }, ownProps) {
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost })(PostsDetails);