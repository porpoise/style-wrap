interface IStyleState {
    startNode: Text;
    endNode: Text;
    rules: Record<string, Text>;
}

export default class ElementStyleManager {
    styleElement: HTMLStyleElement = document.createElement("style");

    prefix: string;

    stateMap: Record<string, IStyleState> = {};

    constructor(elementType: string, datasetIdentifier: string) {
        this.prefix = `style-wrap > ${elementType}[data-style-wrap-id="${datasetIdentifier}"]`;
        document.head.appendChild(this.styleElement);
    }

    get(state: string, name: string) {
        const [_rule, ...valuePieces] = this.stateMap[state]?.rules[
            name
        ]?.nodeValue?.split(":") || [null];

        return valuePieces.length > 0 ? valuePieces.join(":") : undefined;
    }

    set(state: string, name: string, value: string) {
        if (this.stateMap[state]) {
            const ruleTextNode = document.createTextNode(`${name}:${value};`);

            if (this.stateMap[state].rules[name]) {
                this.styleElement.removeChild(this.stateMap[state].rules[name]);
            }

            this.stateMap[state].rules[name] = ruleTextNode;

            this.styleElement.insertBefore(
                this.stateMap[state].rules[name],
                this.stateMap[state].endNode
            );
        } else {
            const startNode = document.createTextNode(
                `${this.prefix}${state === "" ? "" : `:${state}`}{`
            );
            const endNode = document.createTextNode("}");

            this.styleElement.appendChild(startNode);
            this.styleElement.appendChild(endNode);

            this.stateMap[state] = {
                startNode,
                endNode,
                rules: {},
            };

            this.set(state, name, value);
        }
    }

    updatePrefix(elementType: string, datasetIdentifier: string) {
        this.prefix = `style-wrap > ${elementType}[data-style-wrap-id="${datasetIdentifier}"]`;

        for (const state in this.stateMap) {
            const newStartNode = document.createTextNode(
                `${this.prefix}${state === "" ? "" : `:${state}`}{`
            );

            this.styleElement.replaceChild(
                newStartNode,
                this.stateMap[state].startNode
            );

            this.stateMap[state].startNode = newStartNode;
        }
    }
}
