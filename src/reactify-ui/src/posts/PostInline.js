import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostInline extends Component {
  render() {
  	const {post} = this.props
  	const {elClass} = this.props
  	const showContent = elClass === 'card' ? 'd-block' : 'd-none'
    return (
      <div>
      	{post !== undefined ? <div className = {elClass}>
      		<h1>
	      		<Link maintainScrollPosition = {false} to = {{
	      			pathname:`/posts/${post.slug}`,
	      			state: {fromDashboard: false}
	      		}}>{post.title}</Link>
	      	</h1>
      		<h3 className = {showContent}>{post.content}</h3>
      		</div>
      		: ''}
      </div>
    );
  }
}

export default PostInline
