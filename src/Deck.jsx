import React, { Component } from 'react';
import Card from './Card';
import './Deck.css';

class Deck extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Card />
      </div>
    );
  }
}

export default Deck;
