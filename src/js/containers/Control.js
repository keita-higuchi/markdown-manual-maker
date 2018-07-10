import React from 'react'

import {observer, inject} from "mobx-react";

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
                onClick={this.props.event.openFile}
            ><Icon>folder_open</Icon></Button>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={this.props.event.saveFile}
            ><Icon>save</Icon></Button>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={this.props.event.createPdf}
            ><Icon>picture_as_pdf</Icon></Button>
        </div>
    }

}

export default MdInput;


