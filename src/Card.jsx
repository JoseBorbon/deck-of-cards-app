import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.imageUrl}
          alt={this.props.altText}
          style={{
            zIndex: this.props.zIdx,
            transform:
              this.props.zIdx % 2 === 0 ? 'rotate(20deg)' : 'rotate(50deg)',
          }}
        />
      </div>
    );
  }
}

export default Card;
