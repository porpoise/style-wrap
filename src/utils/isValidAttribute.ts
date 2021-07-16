const invalidAttributes = [
    "accesskey",
    "autocapitalize",
    "autofocus",
    "class",
    "contenteditable",
    "contextmenu",
    "dir",
    "draggable",
    "enterkeyhint",
    "exportparts",
    "hidden",
    "id",
    "inputmode",
    "lang",
    "nonce",
    "part",
    "slot",
    "spellcheck",
    "style",
    "tabindex",
    "title",
    "translate",
];

const invalidAttributePrefixes = ["data-", "item", "on"];

export default function isValidAttribute(attr: string) {
    const formattedAttr = attr.toLowerCase().trim();

    if (invalidAttributes.indexOf(formattedAttr) !== -1) return false;

    for (const prefix of invalidAttributePrefixes) {
        if (formattedAttr.startsWith(prefix)) return false;
    }

    return true;
}
