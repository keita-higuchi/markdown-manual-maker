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
        this.store.isEdit = true;
        this.store.compile();
    }

    @action.bound
    togglePreview() {
        this.store.showPreview = !this.store.showPreview;
    }

    @action.bound
    closePageSetingModal() {
        this.store.pageSettingModal.open = false;
    }

    @action.bound
    openPageSettingModal() {
        this.store.pageSettingModal.open = true;
    }

    @action.bound
    changePdfSetting(e, type) {
        switch (type) {
        case 'size':
            this.store.pdfPageSize = e.target.value;
            break;
        case 'orientation':
            this.store.pdfOrientation = e.target.value;
            break;
        }

        this.store.compile();
    }


    /**
     * PDF作成.
     */
    @action.bound
    createPdf(val) {

        // tmp.html作成
        let result = ipcRenderer.sendSync('printPdf', {
            html: this.store.html,
            pageSize: this.store.pdfPageSize,
            pdfOrientation: this.store.pdfOrientation,
        });
    }

    /**
     * mdファイルオープン.
     */
    @action.bound
    openFile() {
        let result = ipcRenderer.sendSync('openFile');
        if (result !== '') {
            this.store.mdText = fs.readFileSync(result[0], 'utf8');
            this.store.compile();
        }

    }

    /**
     * mdファイル保存.
     */
    @action.bound
    saveFile() {
        let result = ipcRenderer.sendSync('saveFile');
        if (result !== '') {
            fs.writeFileSync(result, this.store.mdText);
            this.store.mdTextFilePath = result;
            this.store.isEdit = false;
        }
    }

    @action.bound
    autoSaveFile() {
        fs.writeFileSync(this.store.mdTextFilePath, this.store.mdText);
        this.store.isEdit = false;
    }

    @action.bound
    setMdTextFilePath(path) {
        this.store.mdTextFilePath = path
    }


}

export default Event


