import React from 'react'

import {observer, inject} from "mobx-react";

import TextField from '@material-ui/core/TextField';
import AceEditor from 'react-ace';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import fs from 'fs';

import 'brace/mode/markdown';
import 'brace/theme/github';


@inject("event") @observer
class MdInput extends React.Component {

    constructor(props) {
        super(props)
        //this.codeSort = this.codeSort.bind(this)
        this.addText = this.addText.bind(this)

        document.ondragover = function () {
            return false;
        };
        document.ondragleave = document.ondragend = function () {
            return false;
        };
        document.ondrop = (e) => {
            e.preventDefault();
            let file = e.dataTransfer.files[0];
            let editor = this.refs.aceEditor.editor;

            if (/^image/.test(file.type)) {
                editor.insert('![](' + file.path.replace(/ /g, '%20') + ')');
            } else if (/^text/.test(file.type) || file.type == '') {

                // ファイル読み込み
                // TODO 確認してから
                let str = fs.readFileSync(file.path, 'utf8');
                this.props.store.mdText = str;



            }


            return false;
        };

    }

    addText(type) {
        //this.props.event.addText(position, type);

        let editor = this.refs.aceEditor.editor;
        let selection = this.refs.aceEditor.editor.selection;

        switch (type) {
        case 'bold':
            editor.insert('**bold**');
            selection.moveCursorLongWordLeft();
            selection.selectAWord();
            break;
        case 'itaric':
            editor.insert('*itaric*');
            selection.moveCursorLongWordLeft();
            selection.selectAWord();
            break;
        case 'link':
            editor.insert('[link](http://)');
            selection.moveCursorLeft();
            selection.moveCursorLeft();
            selection.selectAWord();
            break;
        case 'image':
            editor.insert('![](/)');
            selection.moveCursorLeft();
            selection.moveCursorLeft();
            break;

        case 'table':
            let tableText = '|head|head|head|\n|:-:|:-:|:-:|\n|data|data|data|\n|data|data|data|\n|data|data|data|';

            editor.insert(tableText);
            break;
        }

        editor.focus();

    }


    render() {

        return <div className="content inputContent">
            <div className="editButtons">
                <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {this.addText('bold')}}
                ><Icon>format_bold</Icon></Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {this.addText('itaric')}}
                ><Icon>format_italic</Icon></Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {this.addText('link')}}
                ><Icon>insert_link</Icon></Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {this.addText('image')}}
                ><Icon>image</Icon></Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={(e) => {this.addText('table')}}
                ><Icon>grid_on</Icon></Button>
            </div>
            <AceEditor
                mode="markdown"
                theme="github"
                height="600px"
                width="100%"
                fontSize={16}
                highlightActiveLine={true}
                showGutter={true}
                value={this.props.store.mdText}
                ref='aceEditor'
                onChange={(e) => {this.props.event.handleChangeMdText(e)}}
            />
        </div>
    }

}

export default MdInput;





