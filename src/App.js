import React from 'react';
import ListItems from './components/ListItems';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      currentItems: {
        text: '',
        key: ''
      }
    }
  }

  handleInput = (e) => {
    this.setState({
      currentItems:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItems;

    if(newItem.text !== '') {
      const newItems=[...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItems: {
          text: '',
          key: ''
        }
      })
    }
  }

  deleteItem = (key) => {
    const filterItems = this.state.items.filter(item => item.key !== key );

    this.setState({
      items: filterItems
    })
  }

  setUpdate = (text, key) => {
    const items = this.state.items;

    items.forEach(item => {
      if(item.key === key) {
        item.text = text;
      }
    })
    this.setState({
      items: items
    })
  }

  render() {
    return (
      <div className="app">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input type="text" 
              value={this.state.currentItems.text}
              onChange={this.handleInput}
            />
            <button type="submit">Add to do!</button>
          </form>
        </header>
        <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate} />
      </div>
    );
  }
}

export default App;
