import {useStrict, observable, computed, action, reaction, autorun } from "mobx";

import {ipcRenderer} from "electron";
import fs from 'fs';

class Event {
    constructor(store) {
        this.store = store
    }

    @action.bound
    handleChangeViewMode(viewMode) {
        this.store.setViewMode(viewMode)
    }

    @action.bound
    handleChangeMdText(e) {
        //this.store.mdText = e.target.value
        //this.store.compile()
        this.store.mdText = e;
        this.store.compile();
    }

    @action.bound
    handleChangeUser(e) {
        this.store.user = e.target.value
    }

    @action.bound
    handleChangePass(e) {
        this.store.pass = e.target.value
    }

    /**
     * PDF作成.
     */
    @action.bound
    createPdf(val) {

        // tmp.html作成
        let result = ipcRenderer.sendSync('printPdf', this.store.html);
    }


}

export default Event


