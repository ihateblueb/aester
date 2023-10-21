import * as mfm from 'mfm-js';

export function render(i: string):any[] {
    let parsed = mfm.parse(i);
    let final: any[] = [];
    console.info(parsed)
    parsed.forEach((element) => {
        console.info(element.type)
        if (element.type === "text") {
            final.push(`<span>${element.props.text}</span>`)
        } else if (element.type === "emojiCode") {
            final.push(`<span>${element.props.name}</span>`)
        } else if (element.type === "unicodeEmoji") {
            final.push(`<Emoji>${element.props.emoji}</Emoji>`)
        } else if (element.type === "url") {
            final.push(`<a href="${element.props.url}">${element.props.url}</a>`)
        } else {
            final.push(`<span>[MFM ${element.type}]</span>`)
        }
    });
    return final;
}
