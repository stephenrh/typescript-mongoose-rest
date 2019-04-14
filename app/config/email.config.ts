export const EMAILCONFIG: EmailConfig = {
    user: 'test',                 // Your GMail account used to send emails
    pass: 'test',
    from: 'test'
}
interface EmailConfig {
    user: string,
    pass: string,
    from: string
}