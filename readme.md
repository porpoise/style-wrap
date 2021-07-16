# `style-wrap`

Framework-agnostic element styling.

`npm i style-wrap`

```js
import StyleWrap from "style-wrap";
StyleWrap.register(/* options */);
```

## How it works:

Basically the element you wanna style, you wrap in a `style-wrap` element. Next, you can add attributes to the `style-wrap` which will target the element it wraps.

```html
<style-wrap id="wrap" color="red" color.hover="blue" padding="8px">
    <p>red colored text with 8px padding</p>
</style-wrap>
```

These attributes can be changed later (possibly with `setAttribute` or reactive data binding using a framework like React or Vue):

```js
document.getElementById("wrap").setAttribute("color", "green"); // color: green; by default
document.getElementById("wrap").setAttribute("color.hover", "pink"); // color: pink; on hover
```

## Variable system:

`style-wrap` has first-class support for **reactive** CSS variables, allowing one to easily create and update structured, continuous design systems.

### Global variables:

You can declare global variables in the register function:

```js
StyleWrap.register({
    globals: {
        primary: "#003366",
        success: "forestgreen",
        link: "cornflowerblue",
    },
});
```

You can then make use of these globals in your `style-wrap` element using the **`_`** prefix (kinda like **`$`** in SASS):

```html
<style-wrap color="_primary">
    <p>this has primary text color</p>
</style-wrap>
```

If you still have access to the `StyleWrap` class, you can change the values of global variables on the fly, and the changes will reflect everywhere they're used.

```js
StyleWrap.globalStyles.set("primary", "black");
```

### Not-so-global variables:

You can declare new variables within `style-wrap` elements and use these directly within your CSS, this is useful for reusable components where only a few CSS rules are customizable.

Create an attribute on the `style-wrap` element using the **`_`** prefix (similar to above):

```html
<style-wrap _active="cornflowerblue">
    <button>hello im dynamic to the _active variable</button>
</style-wrap>
```

```css
button {
    background: white;
    color: var(--active); /* use the CSS variable syntax to access the variable. */
}

button:hover {
    color: white;
    background: var(--active);
}
```

Now I can create differently-styled buttons with minimal code in the markup itself. While I could make a custom class for each possible combination, over `style-wrap`, this approach allows for easier extensibility, while still keeping code clean and concise.

Lastly, you can use these variables exactly how you used global variables:

```html
<style-wrap>
    <a _active-color="red" background="_active-color"> hey! </a>
</style-wrap>
```

## States:

An intuitive way to style different CSS states (such as `:hover`, `:focus`, etc...):

```html
<style-wrap
    color="gray"
    color.hover="black"
    transition="color 250ms ease-in-out"
>
    <a> hover me to change the color! </a>
</style-wrap>
```

## Quirks:

Since this is a custom element, over a JavaScript component, `style-wrap`s have an effect on the outputted HTML markup. In other words, you **will see** `<style-wrap>` tags in your devtools/inspector tab. 

As a result, if you're not careful to remember this, you could ignore that they are there and break the flow of your markup.

If you directly need to style a `style-wrap`, you can add an `id`, `class`, or `style` attribute to it. These 3 attributes are ignored and won't add CSS rules to the child element.

This is similar to Svelte's [`--style-props`](https://svelte.dev/docs#style_props), but the existence of a wrapper element is explicit in our case, rather than implicitly added at build time.

## Disclaimer:

This concept of attribute-based CSS rules may seem like a budget version of TailwindCSS (lol). However, this library is in no way meant to be a Tailwind or CSS replacement. Rather, it's meant to extend regular CSS (or Tailwind) with that sprinkle of reactivity that allows for customization and extensibility.

In principle, my recommendation for this library is to continue writing CSS (or Tailwind) wherever you can, and use this wherever you need to wield the power of CSS variables or want to write dynamic components where the CSS is as customizable as the JavaScript data (which is why this library coexists beautifully with frameworks such as React and Vue).

# Enjoy!

Leave star pls. <3