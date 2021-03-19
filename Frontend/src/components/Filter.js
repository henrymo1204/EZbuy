import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class Filter extends Component {
    render(){
        return (
            <Form className="filter">

                <Form.Group>
                <div class="filter-radio">
                    <label>
                        <input type="radio" value="Apple" />
                        Apple
                    </label>
                </div>
                </Form.Group>
                <Form.Group>
                <div class="filter-radio">
                    <label>
                        <input type="radio" value="Banana" />
                        Banana
                    </label>
                </div>
                </Form.Group>
                <Form.Group>
                <div class="filter-radio">
                    <label>
                        <input type="radio" value="Orange" />
                        Orange
                    </label>
                </div>
                </Form.Group>
            </Form>
        );
    }
}

export default Filter;