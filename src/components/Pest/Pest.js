import React, { Component } from "react";

import './Pest.scss';
import PestService from './Pest.service';

class Pests extends Component {

    constructor(props) {
        super(props);
        console.log(PestService);
    }

    render() {
        return (
            <div className="wrapper-pest">
                <h2>Pest</h2>
                <p>Vehicula eget sodales vitae, rhoncus eget sapien pest:</p>
            </div>
        );
    }
}

export default Pests;