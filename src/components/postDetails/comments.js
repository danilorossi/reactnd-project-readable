import React, { Component } from 'react';
import 'semantic-ui/dist/components/dropdown.min.js';
import { connect } from 'react-redux';

import {
  loadCommentsByParent,
  voteUp as voteCommentUpAPI,
  voteDown as voteCommentDownAPI,
  // showDeleteCommentModal,
  // editComment
} from '../../actions/commentActions';

import CommentItem from './commentItem';
import Loader from '../common/loader';
import CommentForm from './commentForm';

class Comments extends Component {

  state = {
    comments: null,
    sorting: {
      criteria: 'score',
      order: 'descending'
    }
  }

  componentDidMount() {
    window.$(this.criteriaDropdown).dropdown({
      onChange: (value, text, $selectedItem) => {
        const newValue = value.replace(' ', '_');
          this.setState({
            sorting: {
              ...this.state.sorting,
              criteria: newValue
            },
            comments: this.sortedCommentsSelector([...this.props.comments], newValue, this.state.sorting.order)
          })
      }
    });
    window.$(this.orderDropdown).dropdown({
      onChange: (value, text, $selectedItem) => {
        this.setState({
          sorting: {
            ...this.state.sorting,
            order: value
          },
          comments: this.sortedCommentsSelector([...this.props.comments], this.state.sorting.criteria, value)
        })
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comments: this.sortedCommentsSelector(nextProps.comments, this.state.sorting.criteria, this.state.sorting.order)
    })
  }

  sortedCommentsSelector(comments, criteria, order) {
    if(!comments) return comments;
    const ascending = order === 'ascending';

    switch(criteria) {
      case 'score':

        return comments.sort(function(a, b) {
          return (ascending ? a.voteScore - b.voteScore : b.voteScore - a.voteScore);
        })

      case 'creation_date':
        return comments.sort(function(a, b) {
          return (ascending ? a.timestamp - b.timestamp : b.timestamp - a.timestamp);
        })

      default:
        return comments;
    }
  }

  render() {

    const { comments } = this.state;

    const commentVoteScoreAttrs = {
      voteUp: this.props.voteCommentUp,
      voteDown: this.props.voteCommentDown,
      loadingStatus: this.props.loadingStatus
    };

    const sortCriteria = this.state.sorting.criteria;
    const sortOrder = this.state.sorting.order;

//  <i className="trophy icon"></i>
    return (

      <div>

        <h4 style={{ margin: 0 }} className="ui dividing header">{comments === null ? '-' : comments.length} comment(s)</h4>

        <h4 className="ui header right aligned" style={{ margin: 0 }}>

          <div className="content">
            Sort by
            <div ref={(dropdown) => { this.criteriaDropdown = dropdown; }} className="ui inline dropdown" style={{ marginLeft: '5px'}}>
              <div className="text"> score</div>
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className={`item ${sortCriteria === 'score' ? 'active':''}`} data-text="score">score</div>
                <div className={`item ${sortCriteria === 'score' ? 'creation_date':''}`} data-text="creation date">creation date</div>
              </div>
            </div>
            <div ref={(dropdown) => { this.orderDropdown = dropdown; }} className="ui inline dropdown">
              <div className="text"> descending</div>
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className={`item ${sortOrder === 'descending' ? 'active':''}`} data-text="descending">descending</div>
                <div className={`item ${sortOrder === 'ascending' ? 'active':''}`} data-text="ascending">ascending</div>
              </div>
            </div>
          </div>
        </h4>

        <div style={{ position: 'relative'}} className="ui comments">

          {!comments && <Loader message={"Loading"} />}

          {comments && comments.length === 0 &&
            <h3>NO COMMENTS</h3>
          }

          <div className="ui comments">
          {comments && comments.map((comment, idx) => (
            <CommentItem
              {...commentVoteScoreAttrs}

              key={comment.id}
              comment={comment}/>

          ))}
            </div>

        </div>

        <CommentForm parentId={this.props.postId}/>

      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    comments: state.commentsByParentId[ownProps.postId] || null
  };
}

function mapDispatchToProps (dispatch) {
  return {
    voteCommentUp: (commentId) => dispatch(voteCommentUpAPI(commentId)),
    voteCommentDown: (commentId) => dispatch(voteCommentDownAPI(commentId))
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Comments);
