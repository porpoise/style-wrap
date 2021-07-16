# `style-wrap`

Framework-agnostic element styling.

```ts
import StyleWrap from "style-wrap";
StyleWrap.register(
    /* options */
);
```

## How it works:

Basically the element you wanna style, you wrap in a `style-wrap` element. Next, you can add attributes to the `style-wrap` which will target the element it wraps.

```html
<style-wrap color="red" padding="8px">
    <p>red colored text with 8px padding</p>
</style-wrap>

