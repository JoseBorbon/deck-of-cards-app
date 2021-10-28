import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import './Deck.css';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { url: '', remaining: null, drawnCards: [] };
    this.drawCard = this.drawCard.bind(this);
  }

  async drawCard() {
    if (this.state.remaining === 0) return;
    let response = await axios.get(this.state.url);
    //push object to drawnCards
    this.setState((st) => {
      return {
        drawnCards: [...st.drawnCards, response.data],
        remaining: response.data.remaining,
      };
    });
  }

  async componentDidMount() {
    //get the data based off url length in state
    if (this.state.url.length === 0) {
      //if empty use https://deckofcardsapi.com/api/deck/new/shuffle
      let response = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/shuffle'
      );
      console.log(response.data);
      //swap url in state to be https://deckofcardsapi.com/api/deck/${deck_id}/draw/
      this.setState({
        url: `https://deckofcardsapi.com/api/deck/${response.data.deck_id}/draw/`,
      });
    }
  }

  render() {
    const cards = this.state.drawnCards.map(
      ({ cards: [{ image, value, suit }] }) => (
        <Card
          imageUrl={image}
          altText={`${value} of ${suit}`}
          zIdx={-this.state.remaining}
          key={uuid()}
        />
      )
    );
    return (
      <div>
        <div>
          <button onClick={this.drawCard}>GIMME A CARD</button>
          <div className="Deck-cards">{cards}</div>
        </div>
      </div>
    );
  }
}

export default Deck;
