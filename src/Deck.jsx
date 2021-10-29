import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import './Deck.css';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawnCards: [], isOut: false };
    this.drawCard = this.drawCard.bind(this);
  }

  async drawCard() {
    if (this.state.drawnCards.length === 52) {
      this.setState({ isOut: true });
      return;
    }
    const { deck_id: id } = this.state.deck;
    const card = await axios.get(`${API_BASE_URL + id}/draw/`);
    this.setState((st) => {
      return {
        drawnCards: [...st.drawnCards, card.data],
      };
    });
  }

  async componentDidMount() {
    if (this.state.drawnCards.length === 0) {
      let deck = await axios.get(`${API_BASE_URL}new/shuffle`);
      this.setState({
        deck: deck.data,
      });
    }
  }

  render() {
    const cards = this.state.drawnCards.map(
      ({ cards: [{ image, value, suit }], remaining }) => (
        <Card
          imageUrl={image}
          altText={`${value} of ${suit}`}
          zIdx={-remaining}
          key={uuid()}
        />
      )
    );
    const button = this.state.isOut ? (
      <button>GIMME MORE CARDS!</button>
    ) : (
      <button onClick={this.drawCard}>GIMME A CARD</button>
    );
    return (
      <div>
        <div>
          {button}
          <div className="Deck-cards">{cards}</div>
        </div>
      </div>
    );
  }
}

export default Deck;
