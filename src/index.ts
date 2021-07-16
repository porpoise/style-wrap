import ElementStyleManager from "./styling/ElementStyleManager";
import GlobalStyleManager from "./styling/GlobalStyleManager";
import generateId from "./utils/generateId";

import "./utils/es5Adapter";
import isValidAttribute from "./utils/isValidAttribute";

interface IAttributeDescriptor {
    name: string;
    value: string | null;
}

export interface IStyleWrapConfig {
    globals?: Record<string, string>;
}

export default class StyleWrap extends HTMLElement {
    static globalStyles = new GlobalStyleManager();

    stylingId = generateId().toString();
    elementStyles?: ElementStyleManager;

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

    // Initialize the ElementStyleManager to point to the target element.
    setupElementStyles() {
        if (!this.targetElement) return;

        if (!this.elementStyles) {
            this.elementStyles = new ElementStyleManager(
                this.targetElement?.nodeName.toLowerCase(),
                this.stylingId
            );
        } else {
            this.elementStyles.updatePrefix(
                this.targetElement?.nodeName.toLowerCase(),
                this.stylingId
            );
        }
    }

    // Setup the target element to be styled:
    setupTargetElement() {
        if (!this.targetElement) return;

        this.setupElementStyles();

        this.targetElement.dataset.styleWrapId = this.stylingId;

        this.setAllStyleProperties();
    }

    // Validate and set a style rule on the target element:
    setStyleProperty({ name, value }: IAttributeDescriptor) {
        if (!isValidAttribute(name) || !this.targetElement) return;

        if (!this.elementStyles) this.setupElementStyles();

        // Check for a state, like "hover", "focus", "etc"
        let [rule, state] = name.trim().split(".");

        // Trim the value:
        let finalValue = value?.trim() || "";

        // Variable setter (rule starts with "_"):
        if (rule.startsWith("_")) {
            rule = rule.replace("_", "--");
        }

        // Variable getter (value starts with "_"):
        if (finalValue.startsWith("_")) {
            finalValue = `var(${finalValue.replace("_", "--")})`;
        }

        // Set the CSS property for the specified state (or no state/default style):
        this.elementStyles?.set(state || "", rule, finalValue);
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
                    this.setupTargetElement();
                }
            });
        });

        observer.observe(this, { attributes: true, childList: true });
    }

    // Style the child node when added to DOM:
    connectedCallback() {
        this.setupTargetElement();
    }

    // Remove the element stylesheet on unmount:
    disconnectedCallback() {
        if (!this.elementStyles) return;

        document.head.removeChild(this.elementStyles?.styleElement);

        this.elementStyles = undefined;
    }

    // Registers the custom element globally:
    static register(options: IStyleWrapConfig) {
        if (options.globals) {
            Object.entries(options.globals).forEach(([name, value]) =>
                StyleWrap.globalStyles.set(name, value)
            );
        }

        customElements.define("style-wrap", this);
    }
}
