import React from 'react';

const Bar = ({ children }) => {

  return (
    <div className="ui top inverted teal fixed fluid one menu">
      { children }
    </div>
  );
}

const LeftItem = ({ children }) => {
  return (
    <div className="item left aligned">
      { children }
    </div>
  );
}
const Title = ({ children }) => {
  return (
    <div className="header item">
      { children }
    </div>
  );
}
const Item = ({ children }) => {
  return (
    <div className="item">
      { children }
    </div>
  );
}
const RightItem = ({ children }) => {
  return (
    <div className="item right aligned">
      { children }
    </div>
  );
}

export default { Bar, Title, Item, LeftItem, RightItem };
