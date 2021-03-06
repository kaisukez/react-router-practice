import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/react-router-practice/');
    });
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>loading...</div>
    }

    return (
      <div>
        <Link to="/react-router-practice/">Back To Index</Link>
        <button
          className="btn btn-danger float-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h2>{post.title}</h2>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
