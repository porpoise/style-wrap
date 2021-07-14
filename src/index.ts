import GlobalStyleManager from "./global-style-manager";
import modifierMap from "./modifier-map";

import "./es5-adapter";

export interface IAttributeDescriptor {
    name: string;
    value: string | null;
}

// Don't update css for these attributes:
const ignoredAttributes = ["id", "class", "style"];

export default class StyleWrap extends HTMLElement {
    static globalStyles = new GlobalStyleManager();

    // The attributes NamedNodeMap mapped to an Array:
    get attributeMap(): IAttributeDescriptor[] {
        const attributeList: IAttributeDescriptor[] = [];

        for (let i = 0; i < this.attributes.length; i++) {
            const { nodeName, nodeValue } = this.attributes[i];

            attributeList.push({
                name: nodeName,
                value: nodeValue,
            });
        }

        return attributeList;
    }

    // Returns the target element to style:
    get targetElement(): HTMLElement | null {
        return this.firstElementChild as HTMLElement | null;
    }

    // Validate and set a style rule on the target element:
    setStyleProperty({ name, value }: IAttributeDescriptor) {
        if (ignoredAttributes.indexOf(name) !== -1) return;

        const ruleModifiers = name.split(":");
        const rule = ruleModifiers.pop();

        const valueModifiers = (value || "").split(":");
        const parsedValue = valueModifiers.pop()?.trim();

        if (!(rule && parsedValue)) return;

        const { rule: ruleModifiedRule, value: ruleModifiedValue } =
            ruleModifiers.reduce(
                (current, modifier) =>
                    modifierMap.name[modifier]?.(current) || current,
                { rule, value: parsedValue }
            );

        const { rule: valueModifiedRule, value: valueModifiedValue } =
            valueModifiers.reduce(
                (current, modifier) =>
                    modifierMap.value[modifier]?.(current) || current,
                { rule: ruleModifiedRule, value: ruleModifiedValue }
            );

        this.targetElement?.style.setProperty(
            valueModifiedRule,
            valueModifiedValue
        );
    }

    // Set every style property from the attributes at once:
    setAllStyleProperties() {
        this.attributeMap.forEach((a) => this.setStyleProperty(a));
    }

    // Setup change watching for attributes and children:
    constructor() {
        super();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "attributes" && mutation.attributeName) {
                    this.setStyleProperty({
                        name: mutation.attributeName,
                        value: this.getAttribute(mutation.attributeName),
                    });
                } else if (mutation.type === "childList") {
                    this.setAllStyleProperties();
                }
            });
        });

        observer.observe(this, { attributes: true, childList: true });
    }

    // Style the child node when added to DOM:
    connectedCallback() {
        this.setAllStyleProperties();
    }

    // Registers the custom element globally:
    static register(variables?: Record<string, string>) {
        if (variables) {
            Object.entries(variables).forEach(([name, value]) =>
                StyleWrap.globalStyles.set(name, value)
            );
        }

        customElements.define("style-wrap", this);
    }
}
