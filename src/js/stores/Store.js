import {useStrict, observable, computed, action, reaction, autorun } from "mobx";
import marked from 'marked'

class Store {

    @observable mdText = ""
    @observable html = ""

    @action.bound
    compile() {

        //  --- を置き換えてからmd
        this.html = '<div class="page">' + marked(this.mdText.replace(/- - -/g, '</div><div class="page">')) + '</div>';
    }
}

export default Store


