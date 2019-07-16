import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import moment from 'moment'

class PostForm extends Component {

	constructor(props)
	{
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleDraftChange = this.handleDraftChange.bind(this)
		this.clearForm = this.clearForm.bind(this)
		this.clearFormRefs = this.clearFormRefs.bind(this)
		this.postTitleRef = React.createRef()
		this.postContentRef = React.createRef()
		this.state = {
			draft: false,
			title: null,
			content: null,
			publish: null,
			errors: {}
		}
	}

	createPost(data) {
	    const endpoint = '/api/posts/'
	    const csrfToken = cookie.load('csrftoken')
	    let thisComp = this

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
	        if (thisComp.props.newPostItemCreated) {
          		thisComp.props.newPostItemCreated(responseData)
        	}
        	thisComp.clearForm()
	      })
	      .catch(function(error){console.log("error", error)})
	      
	    }
	}

	updatePost(data) {
		const {post} = this.props
	    const endpoint = `/api/posts/${post.slug}/`
	    const csrfToken = cookie.load('csrftoken')
	    let thisComp = this

	    if (csrfToken !== undefined) {
	      let lookupOptions = {
	        method: "PUT",
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
	        if (thisComp.props.postItemUpdated) {
          		thisComp.props.postItemUpdated(responseData)
        	}
        	thisComp.clearForm()
	      })
	      .catch(function(error){console.log("error", error)})
	      
	    }
	}



	handleSubmit(e) {
		e.preventDefault()
		let data = this.state
		const {post} = this.props
		if (post !== undefined){
			this.updatePost(data)
		} else {
			this.createPost(data)
		}
		// this.updatePost(data)
	}

	handleInputChange(e) {
		e.preventDefault()
		//console.log(e.target.name, e.target.value)
		let key = e.target.name
		let value = e.target.value

		if (key === 'title')
		{
			if (value.length > 120)
			{
				alert('dis title too long bruh')
			}
		}

		this.setState({
			[key]: value
		})
	}

	handleDraftChange(e) {
		this.setState({
			draft: !this.state.draft
		})
	}

	clearForm(e){
		if (e) {
			e.preventDefault()
		}
		this.postCreateForm.reset()
		this.defaultState()
	}

	clearFormRefs(){
		this.postTitleRef.current = ''
		this.postContentRef.current = ''
	}

	defaultState() {
		this.setState({
			draft: false,
			title: null,
			content: null,
			publish: moment(new Date()).format('YYYY-MM-DD')
		})
	}
	componentDidMount(){
		const {post} = this.props
		if (post !== undefined){
			this.setState({
				draft: post.draft,
				title: post.title,
				content: post.content,
				publish: moment(post.publish).format('YYYY-MM-DD')
			})
		} else {
			this.defaultState()
		}

		// this.postTitleRef.current.focus()
	}

	render()
	{
		const {publish} = this.state
		const {title} = this.state
		const {content} = this.state   
		const cancelClass = this.props.post === undefined ? "d-block" : "d-none"
		let thisComp = this
		return (
			<form onSubmit = {this.handleSubmit} ref = {(el) => this.postCreateForm = el}>
				<div className = 'form-group'>
					<label for = 'title'>post title</label>
					<input type = 'text'
						id = 'title'
						name = 'title'
						value = {title}
						className = 'form-control'
						placeholder = 'blog post title'
						ref = {this.postTitleRef}
						onChange = {this.handleInputChange}
						required = 'required'
					/>
				</div>
				<div className = 'form-group'>
					<label for = 'content'>content</label>
					<textarea 
						id = 'content'
						name = 'content'
						value = {content}
						className = 'form-control'
						placeholder = 'post content'
						ref = {this.postContentRef}
						onChange = {this.handleInputChange}
						required = 'required'
					/>
				</div>
				<div className = 'form-group'>
					<label for = 'draft'>
					<input 
						type = 'checkbox' 
						id = 'draft'
						checked = {this.state.draft}
						name = 'draft'
						placeholder = 'Draft'
						onChange = {this.handleDraftChange}
					/>
					Draft</label>
				</div>
				<div className = 'form-group'>
					<label for = 'publish'>Publish Date</label>
					<input 
						type = 'date'
						id = 'publish'
						name = 'publish'
						className = 'form-control'
						onChange = {this.handleInputChange}
						value = {publish}
						required = 'required'
					 />
				</div>
				<button className = 'btn btn-primary'>Save</button>
				<button className = {`btn btn-secondary`} onClick = {this.clearForm}>Clear</button>			
			</form>
		)
	}
}

export default PostForm