import React from 'react'

import {observer, inject} from "mobx-react";

import Button from '@material-ui/core/Button';

@inject("event") @observer
class MdInput extends React.Component {

    constructor(props) {
        super(props)
        //this.codeSort = this.codeSort.bind(this)
    }

    render() {

        return <div className="controlArea">
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={this.props.event.createPdf}
            >
                PDF作成
            </Button>
        </div>
    }

}

export default MdInput;






