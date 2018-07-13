import {useStrict, observable, computed, action, reaction, autorun } from "mobx";
import marked from 'marked'

class Store {

    @observable mdText = ""
    @observable html = ""
    @observable currentPage = 1
    @observable showPreview = true;

    @observable pageSettingModal = {
        open: false
    };

    @observable pdfPageSize = "A4";
    @observable pdfOrientation = "Portrait";

    @action.bound
    compile() {

        let pageClass = "page" + " " + this.pdfPageSize + " " + this.pdfOrientation

        //  --- を置き換えてからmd
        this.html = '<div class="' + pageClass + '">' + marked(this.mdText.replace(/---/g, '</div><div class="' + pageClass + '">')) + '</div>';
    }
}

export default Store


