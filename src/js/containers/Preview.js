import React from 'react'

import classNames from 'classnames';

import {observer, inject} from "mobx-react";



@inject("event") @observer
class Preview extends React.Component {

    constructor(props) {
        super(props)
        //this.codeSort = this.codeSort.bind(this)
    }

    render() {

        return <div className="content previewContent">
            <div className="previewText" dangerouslySetInnerHTML={{__html: this.props.store.html}}></div>
        </div>

    }

}

export default Preview;






