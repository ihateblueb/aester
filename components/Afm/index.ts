import * as afm from 'mfm-js';
import { convert } from 'html-to-text';

export function render(i: string): any[] {
    let parsed = afm.parse(convert(i, {
        selectors: [
            { selector: 'a', options: { 
                hideLinkHrefIfSameAsText: true,
                linkBrackets: ["$[afm_url", "]"] } },
          ]
    }));
    let final: any[] = [];
    console.info(parsed)
    parsed.forEach((element) => {
        console.info(element.type)
        if (element.type === "text") {
            final.push(`<span>${element.props.text}</span>`)
        } else if (element.type === "italic") {
            element.children.forEach(element => {
                if (element.type === "text") {
                    final.push(`<i>${element.props.text}</i>`)
                } 
            })
        } else if (element.type === "url") {
            final.push(`<a href="${element.props.url}">${element.props.url}</a>`)
        } else {
            final.push(`<span>${element.type}</span>`)
        }
    }); 
    return final;
}