import marked from 'marked'

class MdCompiler {

    constructor() {

        this.option = {
            pdfPageSize: "A4",
            pdfOrientation: "Portrait",

            newPage: new RegExp(/(^|[\s\r\n])---([\s\r\n]|$)/, 'g'),
            center: new RegExp(/(^|[\s\r\n])---!center([\s\r\n]|$)/, 'g'),
            right: new RegExp(/(^|[\s\r\n])---!right([\s\r\n]|$)/, 'g'),
            left: new RegExp(/(^|[\s\r\n])---!left([\s\r\n]|$)/, 'g'),

            flex: new RegExp(/(^|[\s\r\n])---!flex([\s\r\n]|$)/, 'g'),
            flexContent: new RegExp(/(^|[\s\r\n])---!flexContent([\s\r\n]|$)/, 'g'),

            end: new RegExp(/(^|[\s\r\n])---([!\s\r\n]|$)/, 'g'),


        }

    }

    compile(mdText) {

        let option = this.option;
        // 改ページ
        let pageClass = "page" + " " + option.pdfPageSize + " " + option.pdfOrientation

        let replacedMd = mdText.replace(option.newPage, '</div><div class="' + pageClass + '">' + "\r\r");

        //let html = '<div class="' + pageClass + '">' + marked(mdText.replace(option.newPage, '</div><div class="' + pageClass + '">')) + '</div>';


        // 2カラム
        replacedMd = replacedMd.replace(option.flex, '<div class="flexContainer">' + "\r\r");
        replacedMd = replacedMd.replace(option.flexContent, '<div class="flexContent">' + "\r\r");


        // right,center,left
        replacedMd = replacedMd.replace(option.center, '<div class="text-center">' + "\r\r");
        replacedMd = replacedMd.replace(option.right, '<div class="text-right">' + "\r\r");
        replacedMd = replacedMd.replace(option.left, '<div class="text-left">' + "\r\r");
        replacedMd = replacedMd.replace(option.end, '</div>' + "\r\r");

        //  --- を置き換えてからmd
        return '<div class="' + pageClass + '">' + marked(replacedMd) + '</div>';
    }
}

export default MdCompiler



