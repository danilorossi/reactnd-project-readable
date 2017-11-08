import React, { Component } from 'react';
import 'semantic-ui/dist/components/dropdown.min.js';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  voteUp as voteCommentUpAPI,
  voteDown as voteCommentDownAPI,
} from '../../actions/commentActions';
import { mapCriteriaToField } from '../../selectors/filterSelectors';
import { sortedCommentsSelector } from '../../selectors/commentsSelectors';
import CommentItem from './commentItem';
import Loader from '../common/loader';
import CommentForm from './commentForm';
import ListSorter from '../common/listSorter';


const StyledComments = styled.div`
  position: relative;
`;
const StyledHeader = styled.h4`
  margin: 0 !important;
`;

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

  changeCriteria(nextCriteria) {
    let criteria = mapCriteriaToField(nextCriteria);
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

        <StyledHeader className="ui dividing header">{comments === null ? '-' : comments.length} comment(s)</StyledHeader>

        { comments && comments.length > 0 &&
          <ListSorter onCriteriaChange={this.changeCriteria} onOrderChange={this.changeOrder} />
        }

        <StyledComments>

          {!comments &&
            <Loader message={"Loading"} />
          }

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
            <br/>
          </div>

        </StyledComments>

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
