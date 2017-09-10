import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const findClassName = `form-control ${touched && error ? 'is-invalid' : ''}`

    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className={findClassName}
          type="text"
          {...field.input}
          // onChange={field.input.onChange}
          // onFocus={field.input.onFocus}
        />
        <div className="invalid-feedback">
          {touched ? error : ""}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/react-router-practice/');
    });

  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/react-router-practice/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};
  //Validate the input from 'values'
  // if(values.title.length < 3) {
  //   errors.title = "Title must be at least 3 characters";
  // }
  if(!values.title) {
    errors.title = "Enter a title!";
  }
  if(!values.categories) {
    errors.categories = "Enter some categories";
  }
  if(!values.content) {
    errors.content = "Enter some content please";
  }

  //if errors is empty, the form is fine to submit
  //if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewFormUniqueName'
})(
  connect(null, { createPost })(PostsNew)
);
