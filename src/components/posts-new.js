import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions/index';

class PostsNew extends Component {

	render() {
		const { handleSubmit } = this.props;

		return (
			// in the Fields's component property, we should provide
			// a function but not call it with ()

			// when the user attempts to submit the form, first
			// ReduxForm's handleSubmit is called. That function
			// will execute validation and other form's state stuff
			// then, our onSubmit function is called

			<div className='form-container'>
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
				<Field
					label='Title'
					name='title'
					component={this.renderField}
				/>
				<Field 
					label='Categories'
					name='categories'
					component={this.renderField}
				/>
				<Field
					label='Content'
					name='content'
					component={this.renderField}
				/>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
				<Link to='/' className='btn btn-danger'>Cancel</Link>
			</form>
			</div>

		);
	}

	renderField(field) {
		
		const className = `form-group
						   ${field.meta.touched && field.meta.error ?
						   	'has-danger' : ''}`;

		return (
			// {...field.input} is a shortcut for
			// onChange = field.onChange, onFocus = field.onFocus, etc...
			<div className={className}>
				<label>
					{field.label}
				</label>
				<input
					{...field.input}
					className='form-control'
					type='text'
				/>
				<div className='text-help'>
					{ field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		// createPost(values, callback)
		// the history object has some properties related
		// to the navigation history
		// history.push allows us to go to a new location
		// when a Link element from react router dom is clicked,
		// history.push is called in the backgrounds
		this.props.createPost(values, () => this.props.history.push('/'));

	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Please enter a title';
	}
	if (!values.categories) {
		errors.categories = 'Please enter some categories';
	}
	if (!values.content) {
		errors.content = 'Please enter some content';
	}

	// if error is empty, the form is OK to submit
	return errors;
}

export default reduxForm({
	form: 'PostsNewForm',
	validate
})( connect(null, { createPost })(PostsNew) );