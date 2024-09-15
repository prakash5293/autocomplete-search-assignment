import React from "react";
import PropTypes from 'prop-types';
import "./Card.css"

const Card = ({ data }) => {
  const {title, summary, author} = data;

  const getSummary = () => summary.length > 250 ? summary.slice(0, 250)+'...': summary;

  return (
    <div className="card" data-testid="card">
        <h4>{title}</h4>
        <p data-testid="summary">{getSummary()}</p>
      <div style={{alignSelf:"end" }}>
      <h6>{author}</h6>
      </div>
    </div>
  );
};

Card.defaultProps = {
  data: {}
};

Card.propTypes = {
data: PropTypes.object
};

export default Card;
