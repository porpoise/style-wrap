export interface IStylePropertyDescriptor {
    rule: string;
    value: string;
}

type ModifierMapT = Record<
    string,
    (i: IStylePropertyDescriptor) => IStylePropertyDescriptor
>;

export default {
    name: {
        var({ rule, value }) {
            return {
                rule: `--${rule}`,
                value,
            };
        },
    },
    value: {
        var({ rule, value }) {
            return {
                rule: rule,
                value: `var(--${value})`,
            };
        },
    },
} as Record<"name" | "value", ModifierMapT>;
