import { PDFService, EmailService }  from '../services'
export default class Service {
    status: boolean = true
    public static pdfService = PDFService
    public static emailService = EmailService
    constructor() {
        console.log(`Service Status: ${this.status}`)
    }
}