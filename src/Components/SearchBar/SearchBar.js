import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {term: ''};
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }

//commence search by hitting enter rather than clicking search.
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      return this.props.onSearch(this.state.term);
    }
    return;
  }

  render() {
    return (
      <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist"
                 onChange={this.handleTermChange}
                 onKeyPress={this.handleKeyPress}/>
          <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
};

export default SearchBar;
