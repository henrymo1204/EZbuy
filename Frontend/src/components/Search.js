// This app was created by group 6 for CSUF's CPSC 462 class. It is a collaborative effort to
//create a react-based website that functions as a unique web store.
//
import React, { Component } from 'react';

//Import components
import Products from './Products';

//Import render styling from react bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageTemplate from './PageTemplate'
import axios from './commons/axios';

import '../css/product/Search.scss';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {options: null, selected: []};
  }

  updatePage = () => {
    this.forceUpdate();
  }

  selected = (name) => {
    var { selected } = this.state;
    if (selected.includes(name)) {
      for (var i = 0; i < selected.length; i++) {
        if (selected[i] === name) {
          selected.splice(i, 1);
        }
      }
    }
    else {
      selected.push(name);
    }
    if (selected.length === 0) {
      axios.get('/products/').then((res) => {
        global.appState.setSearchResult(res.data['products']);
        this.setState({options: res.data['options'], state: 0})
      });
    }
    else {
      axios.get('/products/', {params: {options: selected}}).then((res) => {
        global.appState.setSearchResult(res.data['products']);
        this.updatePage();
      });
    }
  }

  render() {

    let products = global.appState.getSearchResult();
    let options = global.appState.getProductCatagory();

    if (products.length === 0) {
        return (
          <PageTemplate>
            <Row className="search-result-container">
              <Col md='auto' className="search-result-control filter-container">
                <div className='filter'>
                  {
                    options.map(option =>
                      <div> 
                      <label>
                        <input type="checkbox" value={option.name} onChange={e => this.selected(option.name)}/>
                          {option.name}
                      </label></div> )
                  }
                </div>
              </Col>
              <Col className="search-result-control">
                <div className="products no-search-result-control">
                  No search result found in inventory
                </div>
              </Col>
            </Row>
          </PageTemplate>
        );
    }
    else {
        return (
        <PageTemplate>
          <Row className="search-result-container">
            <Col md='auto' className="search-result-control filter-container">
                <div className='filter'>
                  {
                    options.map(option =>
                      <div> 
                      <label>
                        <input type="checkbox" value={option.name} onChange={e => this.selected(option.name)}/>
                          {option.name}
                      </label></div> )
                  }
                </div>
            </Col>
            <Col className="search-result-control">
              <div className="products grid search-result-control">
                {
                  products.map((p, index) => <Products key={index} productDetail={p} updatePage={this.updatePage}/>)
                }
              </div>
            </Col>
          </Row>
        </PageTemplate>
        );
    }
  }
}

export default Search;