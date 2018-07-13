import React from 'react'

import classNames from 'classnames';

import {observer, inject} from "mobx-react";


@inject("event") @observer
class Preview extends React.Component {

    constructor(props) {
        super(props)
        //this.codeSort = this.codeSort.bind(this)
    }

    showPreview() {
        if (this.props.store.showPreview === true) {

            return <div className="previewContent">
                <div className="previewText" dangerouslySetInnerHTML={{__html: this.props.store.html}}></div>
            </div>
        } else {
            return ""
        }
    }

    render() {

        return <div className="content">
            {this.showPreview()}
        </div>

    }

}

export default Preview;






