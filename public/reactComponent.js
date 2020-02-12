'use strict';

const e = React.createElement;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.interval;
  }

  componentDidMount = () => {
    this.interval = setInterval(() => {
      this.setState({ isLoading: !this.state.isLoading });
    }, 1000);
  };

  componentDidUpdate = () => {
    // here, we check if the user has loaded all of the products, then we set this.state.isLoading to be false
    // this way, the loading animation stops
  };

  render() {
    return e(
      'span',
      {
        style: {
          fontSize: 32,
          position: 'relative',
          left: '45%',
          right: '45%',
          top: '45%',
          bottom: '45%',
          padding: 16,
          opacity: this.state.isLoading ? 1 : 0
        }
      },
      ['Loading...']
    );
  }
}

const domContainer = document.querySelector('#react_component');
ReactDOM.render(e(Loading), domContainer);
