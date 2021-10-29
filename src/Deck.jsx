import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck/';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawnCards: [], isOut: false };
    this.drawCard = this.drawCard.bind(this);
  }

  async componentDidMount() {
    if (this.state.drawnCards.length === 0) {
      let deck = await axios.get(`${API_BASE_URL}new/shuffle`);
      this.setState({
        deck: deck.data,
      });
    }
  }

  async drawCard() {
    try {
      const { deck_id: id } = this.state.deck;
      let card = await axios.get(`${API_BASE_URL + id}/draw/`);
      if (!card.data.success) {
        throw new Error('ALL OUT BUB!');
      }
      card = card.data.cards[0];
      this.setState((st) => {
        return {
          drawnCards: [
            ...st.drawnCards,
            {
              id: card.code,
              image: card.image,
              altText: `${card.value} of ${card.suit}`,
            },
          ],
        };
      });
    } catch (err) {
      this.setState({ isOut: true });
    }
  }

  render() {
    const cards = this.state.drawnCards.map(({ id, image, altText }) => (
      <Card imageUrl={image} altText={altText} key={id} />
    ));
    const display = this.state.isOut ? (
      <h1 className="Deck-all-out">All Out Bub!</h1>
    ) : (
      <button className="Deck-button" onClick={this.drawCard}>
        GIMME A CARD
      </button>
    );
    return (
      <div>
        <div>
          <h1 className="Deck-title">Card Dealer</h1>
          {display}
          <div className="Deck-cards">{cards}</div>
        </div>
      </div>
    );
  }
}

export default Deck;
