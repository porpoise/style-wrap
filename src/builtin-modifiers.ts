export interface IStylePropertyDescriptor {
    rule: string;
    value: string;
}

type ModifierT = (i: IStylePropertyDescriptor) => IStylePropertyDescriptor;

export type ModifierMapT = Record<
    "name" | "value",
    Partial<Record<string, ModifierT>>
>;

const builtinModifiers: ModifierMapT = {
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
};

export default builtinModifiers;
