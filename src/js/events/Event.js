import {useStrict, observable, computed, action, reaction, autorun } from "mobx";

import {ipcRenderer} from "electron";
import fs from 'fs';

class Event {
    constructor(store) {
        this.store = store
    }

    @action.bound
    handleChangeMdText(e) {
        this.store.mdText = e;
        this.store.compile();
    }

    /**
     * PDF作成.
     */
    @action.bound
    createPdf(val) {

        // tmp.html作成
        let result = ipcRenderer.sendSync('printPdf', this.store.html);
    }

    /**
     * mdファイルオープン.
     */
    @action.bound
    openFile() {
        let result = ipcRenderer.sendSync('openFile');

        if (result !== undefined) {
            this.store.mdText = fs.readFileSync(result[0], 'utf8');
            this.store.compile();
        }
    }


}

export default Event


