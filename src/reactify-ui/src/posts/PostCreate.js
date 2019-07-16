import React, {Component} from 'react'
import PostForm from './PostForm'

class PostCreate extends Component {
	render(){
		return (
			<div>
				<h1>Create Post</h1>
				<PostForm/>
			</div>
		)
	}
}

export default PostCreate

//left for reference

// import React, {Component} from 'react'
// import 'whatwg-fetch'
// import cookie from 'react-cookies'
// import moment from 'moment'

// class PostCreate extends Component {

// 	constructor(props)
// 	{
// 		super(props)
// 		this.handleSubmit = this.handleSubmit.bind(this)
// 		this.handleInputChange = this.handleInputChange.bind(this)
// 		this.handleDraftChange = this.handleDraftChange.bind(this)
// 		this.clearForm = this.clearForm.bind(this)
// 		this.clearFormRefs = this.clearFormRefs.bind(this)
// 		this.postTitleRef = React.createRef()
// 		this.postContentRef = React.createRef()
// 		this.state = {
// 			draft: false,
// 			title: null,
// 			content: null,
// 			publish: null,
// 			errors: {}
// 		}
// 	}

// 	createPost(data) {
// 	    const endpoint = '/api/posts/'
// 	    const csrfToken = cookie.load('csrftoken')
// 	    let thisComp = this

// 	    if (csrfToken !== undefined) {
// 	      let lookupOptions = {
// 	        method: "POST",
// 	        headers: {
// 	          'Content-Type': 'application/json',
// 	          'X-CSRFToken': csrfToken
// 	        },
// 	        body: JSON.stringify(data),
// 	        credentials: 'include'
// 	      }

// 	      fetch(endpoint, lookupOptions)
// 	      .then(function(response){return response.json()})
// 	      .then(function(responseData){
// 	        console.log(responseData)
// 	        if (thisComp.props.newPostItemCreated) {
//           		thisComp.props.newPostItemCreated(responseData)
//         	}
//         	thisComp.clearForm()
// 	      })
// 	      .catch(function(error){console.log("error", error)})
	      
// 	    }
// 	}



// 	handleSubmit(e) {
// 		e.preventDefault()
// 		let data = this.state
// 		//console.log(this.state)
// 		// let data = this.state
// 		// if (data['draft'] === 'on'){
// 		// 	data['draft'] = true
// 		// } else {
// 		// 	data['draft'] = false
// 		// }
// 		// console.log(data)
// 		this.createPost(data)
// 	}

// 	handleInputChange(e) {
// 		e.preventDefault()
// 		//console.log(e.target.name, e.target.value)
// 		let key = e.target.name
// 		let value = e.target.value

// 		if (key === 'title')
// 		{
// 			if (value.length > 120)
// 			{
// 				alert('dis title too long bruh')
// 			}
// 		}

// 		this.setState({
// 			[key]: value
// 		})
// 	}

// 	handleDraftChange(e) {
// 		this.setState({
// 			draft: !this.state.draft
// 		})
// 	}

// 	clearForm(e){
// 		if (e) {
// 			e.preventDefault()
// 		}
// 		this.postCreateForm.reset()
// 	}

// 	clearFormRefs(){
// 		this.postTitleRef.current = ''
// 		this.postContentRef.current = ''
// 	}

// 	componentDidMount(){
// 		this.setState({
// 			draft: false,
// 			title: null,
// 			content: null,
// 			publish: moment(new Date()).format('YYYY-MM-DD')
// 		})
// 		this.postTitleRef.current.focus()
// 	}

// 	render()
// 	{
// 		const {publish} = this.state
// 		return (
// 			<form onSubmit = {this.handleSubmit} ref = {(el) => this.postCreateForm = el}>
// 				<div className = 'form-group'>
// 					<label for = 'title'>post title</label>
// 					<input type = 'text'
// 						id = 'title'
// 						name = 'title'
// 						className = 'form-control'
// 						placeholder = 'blog post title'
// 						ref = {this.postTitleRef}
// 						onChange = {this.handleInputChange}
// 						required = 'required'
// 					/>
// 				</div>
// 				<div className = 'form-group'>
// 					<label for = 'content'>content</label>
// 					<textarea id = 'content' name = 'content' className = 'form-control' placeholder = 'post content' ref = {this.postContentRef} onChange = {this.handleInputChange} required = 'required'/>
// 				</div>
// 				<div className = 'form-group'>
// 					<label for = 'draft'>
// 					<input 
// 						type = 'checkbox' 
// 						id = 'draft'
// 						checked = {this.state.draft}
// 						name = 'draft'
// 						placeholder = 'Draft'
// 						onChange = {this.handleDraftChange}
// 					/>
// 					Draft</label>
// 				</div>
// 				<div className = 'form-group'>
// 					<label for = 'publish'>Publish Date</label>
// 					<input 
// 						type = 'date'
// 						id = 'publish'
// 						name = 'publish'
// 						className = 'form-control'
// 						onChange = {this.handleInputChange}
// 						value = {publish}
// 						required = 'required'
// 					 />
// 				</div>
// 				<button className = 'btn btn-primary'>Save</button>
// 				<button className = 'btn btn-secondary' onClick = {this.clearForm}>Cancel</button>			
// 			</form>
// 		)
// 	}
// }

// export default PostCreate