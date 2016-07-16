import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import d3Chart from './d3chart';

var RoundsPage = React.createClass({
  getInitialState() {
    return {
      data: [],
      domain: {x: [0, 100], y: [0, 100]}
    };
  },
  setAppState(partialState) {
    return this.setState(partialState);
  },
  render() {
    return (
      <div className='rounds-page'>
        <h2>
          Rounds
        </h2>
        <div className='rounds-chart'>
          <Chart
            appState={this.state}
            setAppState={this.setAppState}
          />
          <RoundControl
            appState={this.state}
            setAppState={this.setAppState}
          />
        </div>
      </div>
    );
  }
});

var Chart = React.createClass({
  getDefaultProps() {
    return {
      width: '100%',
      height: '300px'
    };
  },
  dispatcher: null,
  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    var dispatcher = d3Chart.create(el, {
      width: this.props.width,
      height: this.props.height
    }, this.props.appState);
    this.dispatcher = dispatcher;
  },
  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.update(el, this.props.appState, this.dispatcher);
  },
  render() {
    return <div className='chart' />;
  }
});

var RoundControl = React.createClass({
  getInitialState() {
    return {
      x: 10,
      y: 10,
      z: 10,
      error: false
    };
  },
  render() {
    var rounds = this.props.appState.data;
    return (
      <div>
        <h4>You can add up to 5 rounds in the chart. Use x/y/radius inputs to define rounds parameters.</h4>
        {_.map(rounds, (round) => {
          return this.viewRound(rounds, round);
        })}
        {rounds.length < 5 &&
          <div>{this.addRound(rounds)}</div>
        }
      </div>
    );
  },
  viewRound(rounds, round) {
    return <div className='rounds-controls' key={round.id}>
      <div>
        <label>x: </label>
        {round.x};
      </div>
      <div>
        <label>y: </label>
        {round.y};
      </div>
      <div>
        <label>radius: </label>
        {round.z};
      </div>
      <div>
        <button onClick={_.partial(this.handleRemove, round.id)}>Remove</button>
      </div>
    </div>;
  },
  addRound() {
    return <div className='rounds-controls'>
      <div>
        <label>x: </label>
        <input type='number' name='x' ref='x' min='0' max='100' onChange={this.handleChange} value={this.state.x} />
      </div>
      <div>
        <label> y: </label>
        <input type='number' name='y' ref='y' min='0' max='100' onChange={this.handleChange} value={this.state.y} />
      </div>
      <div>
        <label> radius: </label>
        <input type='number' name='z' ref='z' min='0' max='100' onChange={this.handleChange} value={this.state.z} />
      </div>
      <div>
        <button onClick={this.handleAdd} disabled={this.state.error}>Add</button>
      </div>
    </div>;
  },
  handleAdd() {
    var appState = this.props.appState;
    var roundsState = _.clone(appState);
    var values = this.refs;
    roundsState.data.push({
      id: !_.isEmpty(appState.data) ? _.last(appState.data).id + 1 : 1,
      x: values.x.value,
      y: values.y.value,
      z: values.z.value
    });
    this.props.setAppState(roundsState);
  },
  handleRemove(roundId) {
    var roundsState = _.clone(this.props.appState);
    _.remove(roundsState.data, (round) => round.id === roundId);
    this.props.setAppState(roundsState);
  },
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
});

export default RoundsPage;