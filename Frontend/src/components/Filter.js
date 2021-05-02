import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import "../css/product/Filter.scss"

class Filter extends Component {
    render(){
        return (
            <Form className="filter">

                <Form.Group>
                <div className="filter-radio">
                    <label>
                        <input type="radio" />
                        Brand1
                    </label>
                </div>
                </Form.Group>
                <Form.Group>
                <div className="filter-radio">
                    <label>
                        <input type="radio"/>
                        Brand2(3D)
                    </label>
                </div>
                </Form.Group>
                <Form.Group>
                <div className="filter-radio">
                    <label>
                        <input type="radio" />
                        Brand3(auction)
                    </label>
                </div>
                </Form.Group>
            </Form>
        );
    }
}

export default Filter;