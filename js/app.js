import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import RoundsPage from './rounds';
import '../styles/styles.less';

class App {
  initialize() {
    var RootComponent = React.createClass({
      render() {
        return (
          <div id='content-wrapper'>
            <RoundsPage />
          </div>
        );
      }
    });
    this.rootComponent = ReactDOM.render(
      <RootComponent />,
      $('#main-container')[0]
    ).refs.child;
  }
}

window.app = new App();

$(() => app.initialize());

export default app;
