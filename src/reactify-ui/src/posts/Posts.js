import React, { Component } from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import PostForm from './PostForm'
import PostInline from './PostInline'
import { Link } from 'react-router-dom'



class Posts extends Component {

  constructor(props) {
    super(props)
    this.togglePostListClass = this.togglePostListClass.bind(this)
    this.handleNewPost = this.handleNewPost.bind(this)
    this.loadMorePosts = this.loadMorePosts.bind(this)

    this.state = {
      posts: [],
      postsListClass: "card",
      next: null,
      previous: null,
      author: false,
      count: 0
    }
  }



  createPost() {
    const endpoint = '/api/posts/'
    const csrfToken = cookie.load('csrftoken')
    let data = {
      "slug": "",
      "title": "",
      "content": "",
      "draft": false,
      "publish": null
    }

    if (csrfToken !== undefined) {
      let lookupOptions = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(data),
        credentials: 'include'
      }

      fetch(endpoint, lookupOptions)
      .then(function(response){return response.json()})
      .then(function(responseData){
        console.log(responseData)
      })
      .catch(function(error){console.log("error", error)})
      
    }
  }

  loadMorePosts(){
    const {next} = this.state
    if (next !==  null || next !== undefined) {
      this.loadPosts(next)
    }
    
  }

  loadPosts(nextEndpoint) {
    let endpoint = '/api/posts/'
    if (nextEndpoint !== undefined) {
      endpoint = nextEndpoint
    }
    const lookupOptions = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }

          const csrfToken = cookie.load('csrftoken')

      if (csrfToken !== undefined) {
        lookupOptions['credentials'] = 'include'
        lookupOptions['headers']['X-CSRFToken'] = csrfToken
        }

    let thisComp = this

    fetch(endpoint, lookupOptions)
    .then(function(response){return response.json()})
    .then(function(responseData){
      console.log(responseData)
      let currentPosts = thisComp.state.posts
      currentPosts.concat(responseData.result)
      thisComp.setState({
        posts: responseData.results,
        next: responseData.next,
        previous: responseData.previous,
        author: responseData.author,
        count: responseData.count
      })
    })
    .catch(function(error){console.log("error", error)})
  }

  handleNewPost(postItemData){
    //console.log(postItemData)
    let currentPosts = this.state.posts
    currentPosts.push(postItemData) //unshift
    this.setState({
      posts: currentPosts
    })
  }

  togglePostListClass(event) {
    event.preventDefault()
    let currentListClass = this.state.postsListClass
    if (currentListClass === "")
    {
      this.setState({
        postsListClass: "card",
      })
    } else {
      this.setState({
        postsListClass: "",
      })
    }
  }

  componentDidMount() {
    this.setState({
      posts: [],
      postsListClass: "card",
      next: null,
      previous: null,
      author: false,
      count: 0
    })
    this.loadPosts()
  }

  render() {
    const{posts} = this.state
    const {postsListClass} = this.state
    const {author} = this.state
    const {next} = this.state
    // const csrfToken = cookie.load('csrftoken')
    return (
      <div>
        <h1>ye</h1>
        {author === true ? <Link className = 'mr-2' maintainScrollPosition = {false} to = {{
              pathname:`/posts/create/`,
              state: {fromDashboard: false}
            }}>Create Post</Link> : ''}
        <button onClick = {this.togglePostListClass}>Toggle Class</button>
        {posts.length > 0 ? posts.map((postItem, index) => {return (<PostInline post = {postItem} elClass = {postsListClass}/>)}) : <p>no posts</p>}
        {next !== null ? <button onClick = {this.loadMorePosts}>Load More</button> : ''}
      </div>
    )
  }
}

export default Posts
