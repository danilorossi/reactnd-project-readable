import React from 'react';
import Header from '../../common/headerBar';

const HomeHeader = ({ createPost }) => {

  return (
    <Header.Bar>

      <Header.Title>
        <i className="comment icon"></i> Readable Project
      </Header.Title>

      <Header.RightItem>

        <a onClick={createPost} className="ui vertical right  floated teal animated button" tabIndex="0">
          <div className="hidden content">
          <i className="plus icon"></i>
          </div>
          <div className="visible content">
            New Post
          </div>
        </a>

      </Header.RightItem>

    </Header.Bar>

  );
}

export default HomeHeader;
