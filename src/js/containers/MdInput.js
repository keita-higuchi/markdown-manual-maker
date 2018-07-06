import React from 'react'

import classNames from 'classnames';

import {observer, inject} from "mobx-react";

import TextField from '@material-ui/core/TextField';
import AceEditor from 'react-ace';

import 'brace/mode/markdown';
import 'brace/theme/github';


@inject("event") @observer
class MdInput extends React.Component {

    constructor(props) {
        super(props)
        //this.codeSort = this.codeSort.bind(this)
    }

    render() {

        return <div className="content inputContent">
            <AceEditor
                mode="markdown"
                theme="github"
                fontsize={14}
                highlightActiveLine={true}
                showGutter={false}
                value={this.props.store.mdText}
                onChange={(e) => {this.props.event.handleChangeMdText(e)}}
            />
            {
            //<TextField
            //    id="mdText"
            //    label="Markdown Text"
            //    multiline
            //    value={this.props.store.mdText}
            //    onChange={(e) => {this.props.event.handleChangeMdText(e)}}
            ///>
            }
        </div>
    }

}

export default MdInput;





