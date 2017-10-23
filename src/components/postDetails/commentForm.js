import React, { Component } from 'react';

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.publishComment = this.publishComment.bind(this);
  }
  state = {
    formData: {},
    errors: {
      body: '',
      author: ''
    }
  }
  handleChange(event) {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    }, () => {
      this.validateForm(this.state.formData);
    });
  }

  publishComment() {

    const { formData } = this.state;
    if(this.validateForm(formData)) {
      console.log('publish comment');
      console.log(this.state.formData)
    } else {
      console.log('MISSING COMMENT FIELDS!')
    }

  }

  validateForm(data) {
    let validated = true;
    const errors = {
      author: '',
      body: ''
    }
    if(!data.author || data.author.trim().length <= 0) {
      validated = false;
      errors.author = 'Author name is required.';
    }

    if(!data.body || data.body.trim().length <= 0) {
      validated = false;
      errors.body = 'Comment text is required.';
    }

    this.setState({ ...this.state, errors }) 

    return validated;

  }

  render() {

    const { formData, errors } = this.state;

    const errorClass = {
      author: errors.author.trim().length > 0 ? 'error':'',
      body: errors.body.trim().length > 0 ? 'error':''
    }
    const publishButtonClass = errorClass.author === 'error' || errorClass.body === 'error' ? 'disabled' : '';

   console.log('RENDER, ', errorClass)
    return (
      <div>
        <h4 className="ui dividing header"></h4>

        <form className="ui reply form">

          <div className={`field ${errorClass.body}`}>
            <label>Leave a comment*</label>
            <textarea
              onChange={this.handleChange}
              value={formData.body}
              name="body"
              placeholder="Your comment here!" rows="3"></textarea>

          </div>



            <div className={`field ${errorClass.author}`}>
             <label>Author*</label>
             <input
              onChange={this.handleChange}
              value={formData.author}
              name="author"
              type="text"
              placeholder="Leave your name!"/>
            </div>

            <div onClick={this.publishComment} className={`fluid ui basic teal submit button ${publishButtonClass}`}>
              Publish
            </div>



        </form>

        {/*(errorClass.author === 'error' || errorClass.body === 'error') &&
          <div className="ui error message">
            <div className="header">Could you check something!</div>
            <ul className="list">
              {errorClass.author === 'error' && <li>{this.state.errors.author}</li>}
              {errorClass.body === 'error' && <li>{this.state.errors.body}</li>}
            </ul>
          </div>
        */}


      </div>
    )
  }
}

export default CommentForm;
