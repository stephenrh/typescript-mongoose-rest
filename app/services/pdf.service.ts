import * as htmlpdf from 'html-pdf'
import * as pug from 'pug'
import path from 'path'
import { toTemplate } from './lib/pdf/template'
export class PDFService {
    constructor() {

    }
    public static render(obj: any): Promise<any> {
        return new Promise((resolve) => {
            pug.render(`${toTemplate(obj)}`, (error, html) => {
                if(error) { throw error }
                htmlpdf.create(html, {orientation: "landscape"}).toBuffer((error, buffer) => {
                    console.log(`BUFFER`, buffer);
                    resolve(buffer);
                })
            });
        })
    }
}