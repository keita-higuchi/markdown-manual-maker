import ReactDOM from "react-dom";
import React from "react";


import {useStrict, observable, computed, action, reaction, autorun } from "mobx";
import {observer, Provider, inject} from "mobx-react";

import Store from './stores/Store'
import Event from './events/Event'

import Control from './containers/Control';
import MdInput from './containers/MdInput';
import Preview from './containers/Preview';


@inject("event") @observer
class App extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render () {
        return <div className="contentWrapper">
            <Control store={this.props.store} />
            <div className="mainContainer">
                <MdInput store={this.props.store} />
                <Preview store={this.props.store} />
            </div>
        </div>
    }
}


const store = new Store()
const event = new Event(store)

ReactDOM.render(<Provider event={event}><App store={store} /></Provider>,
        document.getElementById("app"))

