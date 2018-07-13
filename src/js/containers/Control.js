import React from 'react'

import {observer, inject} from "mobx-react";

import {Button, Icon, Tooltip} from '@material-ui/core';

@inject("event") @observer
class MdInput extends React.Component {

    constructor(props) {
        super(props)
        //this.codeSort = this.codeSort.bind(this)
    }

    toggleIcon() {
        if (this.props.store.showPreview === true) {
            return <Icon>keyboard_arrow_right</Icon>
        } else {
            return <Icon>keyboard_arrow_left</Icon>
        }
    }

    render() {

        return <div className="controlArea">
            <Tooltip title="Open md file">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={this.props.event.openFile}
                ><Icon>folder_open</Icon></Button>
            </Tooltip>

            <Tooltip title="Save md file">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={this.props.event.saveFile}
                ><Icon>save</Icon></Button>
            </Tooltip>

            <Tooltip title="Create PDF">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={this.props.event.createPdf}
                ><Icon>picture_as_pdf</Icon></Button>
            </Tooltip>

            <Tooltip title="PDF Setting">
                <Button
                    className="floatRight"
                    variant="contained"
                    mini
                    color="primary"
                    size="small"
                    onClick={this.props.event.openPageSettingModal}
                ><Icon>settings</Icon></Button>
            </Tooltip>

            <Tooltip title="Toggle Preview">
                <Button
                    className="floatRight"
                    variant="contained"
                    mini
                    color="primary"
                    size="small"
                    onClick={this.props.event.togglePreview}
                >{this.toggleIcon()}</Button>
            </Tooltip>

        </div>
    }

}

export default MdInput;


