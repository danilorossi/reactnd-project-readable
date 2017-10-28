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

import { sortedCommentsSelector } from '../../selectors/commentsSelectors';
import CommentItem from './commentItem';
import Loader from '../common/loader';
import CommentForm from './commentForm';
import ListSorter from '../common/listSorter';


class Comments extends Component {

  state = {
    comments: null,
    sorting: {
      criteria: 'voteScore',
      order: 'descending'
    }
  }

  constructor(props) {
    super(props);
    this.changeCriteria = this.changeCriteria.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
  }

  mapCriteriaToField(nextCriteria) {
    switch(nextCriteria) {
      case 'score': return 'voteScore';
      case 'creation_date': return 'timestamp';
    }
  }
  changeCriteria(nextCriteria) {
    let criteria = this.mapCriteriaToField(nextCriteria);
    this.setState({
      sorting: {
        ...this.state.sorting,
        criteria: criteria
      },
      comments: sortedCommentsSelector([...this.props.comments], criteria, this.state.sorting.order)
    })
  }
  changeOrder(nextOrder) {
    this.setState({
      sorting: {
        ...this.state.sorting,
        order: nextOrder
      },
      comments: sortedCommentsSelector([...this.props.comments], this.state.sorting.criteria, nextOrder)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comments: sortedCommentsSelector([...nextProps.comments], this.state.sorting.criteria, this.state.sorting.order)
    })
  }

  render() {
    const { comments } = this.state;

    const commentVoteScoreAttrs = {
      voteUp: this.props.voteCommentUp,
      voteDown: this.props.voteCommentDown,
      loadingStatus: this.props.loadingStatus
    };

    return (

      <div>

        <h4 style={{ margin: 0 }} className="ui dividing header">{comments === null ? '-' : comments.length} comment(s)</h4>

        <ListSorter onCriteriaChange={this.changeCriteria} onOrderChange={this.changeOrder} />

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
