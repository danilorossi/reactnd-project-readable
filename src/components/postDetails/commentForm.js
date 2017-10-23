import React, { Component } from 'react';
import uuid from 'js-uuid';
import { connect } from 'react-redux';

import Loader from '../../components/common/loader';

import { publishComment } from '../../actions/commentActions';
//
// const defaultState = {
//   formData: {},
//   errors: {
//     body: '',
//     author: ''
//   }
// };

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }
  state = {
    formData: {
      author: '',
      body: ''
    },
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

  componentWillReceiveProps(nextProps) {
    if(this.props.savingPost && !nextProps.savingPost) {
     this.setState({
       formData: {
         author: '',
         body: ''
       }
      });
    }
  }

  saveComment() {

    const { formData } = this.state;
    if(this.validateForm(formData)) {

      const data = {
        ...formData,
        id: uuid.v1(),
        parentId: this.props.parentId,
        timestamp: Date.now(),
        voteScore: 0,
        deleted: false,
        parentDeleted: false
      }
      this.props.publishNewComment(data);
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
    const publishButtonClass = this.props.savingPost || errorClass.author === 'error' || errorClass.body === 'error' ? 'disabled' : '';

    return (
      <div>
        <h4 className="ui dividing header"></h4>
        <form className="ui reply form">

            {this.props.savingPost && <Loader message="Publishing comment..." />}
            {!this.props.savingPost &&
              <div>

              <div className={`field ${errorClass.author}`}>
               <label>Author*</label>
               <input
                onChange={this.handleChange}
                value={formData.author}
                name="author"
                type="text"
                placeholder="Leave your name!"/>
              </div>

                <div className={`field ${errorClass.body}`}>
                  <label>Leave a comment*</label>
                  <textarea
                    onChange={this.handleChange}
                    value={formData.body}
                    name="body"
                    placeholder="Your comment here!" rows="3"></textarea>

                </div>



                <div onClick={() => this.saveComment()} className={`fluid ui basic teal button ${publishButtonClass}`}>
                  Publish
                </div>
              </div>
            }



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

function mapStateToProps(state, ownProps) {
  return {
    savingPost: state.ajaxStatus.savingComment || false
  };
}

function mapDispatchToProps (dispatch) {
  return {
    publishNewComment: (comment) => dispatch(publishComment(comment)),
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
