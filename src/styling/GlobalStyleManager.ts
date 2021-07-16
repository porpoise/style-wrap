export default class GlobalStyleManager {
    styleElement: HTMLStyleElement = document.createElement("style");
    startNode: Text = document.createTextNode("style-wrap{");
    endNode: Text = document.createTextNode("}");

    globalNodeMap: Record<string, Text> = {};

    constructor() {
        this.styleElement.appendChild(this.startNode);
        this.styleElement.appendChild(this.endNode);
        document.head.appendChild(this.styleElement);
    }

    get(name: string) {
        if (this.globalNodeMap[name]) {
            const [_rule, ...valuePieces] = this.globalNodeMap[
                name
            ]?.nodeValue?.split(":") || [null];

            return valuePieces.length > 0 ? valuePieces.join(":") : undefined;
        }
    }

    set(name: string, value: string) {
        const variableString = `--${name}:${value};`;

        if (this.globalNodeMap[name]) {
            this.styleElement.removeChild(this.globalNodeMap[name]);
        }

        this.globalNodeMap[name] = document.createTextNode(variableString);
        this.styleElement.insertBefore(this.globalNodeMap[name], this.endNode);
    }
}
