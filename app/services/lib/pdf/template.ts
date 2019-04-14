export function toTemplate(obj: any): string {
    return `
    html
        body
            div hello world
                h1 Greetings! ${obj.user}
    `
}