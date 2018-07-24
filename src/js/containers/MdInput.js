import React from 'react'

import {observer, inject} from "mobx-react";

import {TextField, Icon, Tooltip, IconButton} from '@material-ui/core';
import AceEditor from 'react-ace';

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

    componentDidMount() {
        this.props.event.handleChangeMdText('');
        let editor = this.refs.aceEditor.editor;

        editor.commands.addCommand({
            Name: 'savefile',
            bindKey: { win: 'Ctrl-S', mac: 'Command-S'},
            exec: (editor) => {
                this.onSaveFile()
            }
        })

        editor.focus();

    }

    onSaveFile() {
        if (this.props.store.mdTextFilePath == '') {
            this.props.event.saveFile();
        } else {
            this.props.event.autoSaveFile();
        }
    }

    addText(type) {
        //this.props.event.addText(position, type);

        let editor = this.refs.aceEditor.editor;
        let selection = this.refs.aceEditor.editor.selection;
        let tmp = '';

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
            break;

        case 'table':
            let tableText = '|head|head|head|\n|:-:|:-:|:-:|\n|data|data|data|\n|data|data|data|\n|data|data|data|\r';

            editor.insert(tableText);
            break;

        case 'newpage':
            tmp = '\r---\r';
            editor.insert(tmp);
            break;

        case 'center':
            tmp = '\r---!center\r\r---!\r';
            editor.insert(tmp);
            selection.moveCursorUp();
            selection.moveCursorUp();
            break;
        case 'right':
            tmp = '\r---!right\r\r---!\r';
            editor.insert(tmp);
            selection.moveCursorUp();
            selection.moveCursorUp();
            break;
        case 'left':
            tmp = '\r---!left\r\r---!\r';
            editor.insert(tmp);
            selection.moveCursorUp();
            selection.moveCursorUp();
            break;
        case 'flex':
            tmp = '\r---!flex\r---!flexContent\r\r---!\r---!flexContent\r\r---!\r---!\r';
            editor.insert(tmp);
            selection.moveCursorUp();
            selection.moveCursorUp();
            selection.moveCursorUp();
            selection.moveCursorUp();
            selection.moveCursorUp();
            selection.moveCursorUp();
            break;
        }

        editor.focus();

    }


    render() {

        return <div className="content inputContent">
            <div className="editButtons">
                <Tooltip title="bold">
                    <IconButton
                        onClick={(e) => {this.addText('bold')}}
                    ><Icon>format_bold</Icon></IconButton>
                </Tooltip>
                <Tooltip title="itaric">
                    <IconButton
                        onClick={(e) => {this.addText('itaric')}}
                    ><Icon>format_italic</Icon></IconButton>
                </Tooltip>
                <Tooltip title="link">
                    <IconButton
                        onClick={(e) => {this.addText('link')}}
                    ><Icon>insert_link</Icon></IconButton>
                </Tooltip>
                <Tooltip title="image">
                    <IconButton
                        onClick={(e) => {this.addText('image')}}
                    ><Icon>image</Icon></IconButton>
                </Tooltip>
                <Tooltip title="table">
                    <IconButton
                        onClick={(e) => {this.addText('table')}}
                    ><Icon>grid_on</Icon></IconButton>
                </Tooltip>

                <Tooltip title="new page">
                    <IconButton
                        onClick={(e) => {this.addText('newpage')}}
                    ><Icon>keyboard_return</Icon></IconButton>
                </Tooltip>

                <Tooltip title="left">
                    <IconButton
                        onClick={(e) => {this.addText('left')}}
                    ><Icon>format_align_left</Icon></IconButton>
                </Tooltip>
                <Tooltip title="center">
                    <IconButton
                        onClick={(e) => {this.addText('center')}}
                    ><Icon>format_align_center</Icon></IconButton>
                </Tooltip>
                <Tooltip title="right">
                    <IconButton
                        onClick={(e) => {this.addText('right')}}
                    ><Icon>format_align_right</Icon></IconButton>
                </Tooltip>
                <Tooltip title="flex">
                    <IconButton
                        onClick={(e) => {this.addText('flex')}}
                    ><Icon>view_column</Icon></IconButton>
                </Tooltip>

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





