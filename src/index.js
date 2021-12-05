import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

class App extends React.Component {
  state = {
    quote: false
  };

  async componentDidMount() {
    await this.load();
  }

  load = async () => {
    await this.setState({ quote: false });
    const number = Math.floor(Math.random() * 100);
    const results = await axios.get(
      `https://indie-hackers.firebaseio.com/loadingQuotes/${number}.json`
    );
    this.setState({ quote: results.data });
  };

  render() {
    return (
      <div className="App">
        <h1>
          <a href="https://indiehackers.com">Indie Hackers</a> Quotes
        </h1>
        <p>Because the damn things vanish before I finish reading them</p>
        <br />
        <hr />
        <br />
        {!this.state.quote && <div>Loading a random quote...</div>}
        {this.state.quote && (
          <div>
            <blockquote>
              <h2>
                <em>{this.state.quote.quote}</em>
              </h2>
              <cite>&ndash;{this.state.quote.byline}</cite>
            </blockquote>
            <button onClick={() => this.load()}>Gimme some more</button>
          </div>
        )}
        <br />
        <br />
        <hr />
        <br />
        Quickly slapped together by{" "}
        <a href="https://indiehackers.com/joshtronic">@joshtronic</a>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
