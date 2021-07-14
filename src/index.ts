import GlobalStyleManager from "./global-style-manager";
import builtinModifiers, { ModifierMapT } from "./builtin-modifiers";

import "./es5-adapter";

interface IAttributeDescriptor {
    name: string;
    value: string | null;
}

export interface IStyleWrapConfig {
    globals?: Record<string, string>;
    modifiers?: Partial<ModifierMapT>;
}

// Don't update css for these attributes:
const ignoredAttributes = ["id", "class", "style"];

export default class StyleWrap extends HTMLElement {
    static globalStyles = new GlobalStyleManager();
    static modifiers = builtinModifiers;

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
                    StyleWrap.modifiers.name[modifier]?.(current) || current,
                { rule, value: parsedValue }
            );

        const { rule: valueModifiedRule, value: valueModifiedValue } =
            valueModifiers.reduce(
                (current, modifier) =>
                    StyleWrap.modifiers.value[modifier]?.(current) || current,
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
    static register(options: IStyleWrapConfig) {
        if (options.globals) {
            Object.entries(options.globals).forEach(([name, value]) =>
                StyleWrap.globalStyles.set(name, value)
            );
        }

        if (options.modifiers) {
            Object.entries(options.modifiers).forEach(([key, map]) =>
                Object.entries(map).forEach(
                    ([name, value]) =>
                        (StyleWrap.modifiers[key as "name" | "value"][name] =
                            value)
                )
            );
        }

        customElements.define("style-wrap", this);
    }
}
