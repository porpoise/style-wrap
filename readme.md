# `style-wrap`

Framework-agnostic element styling

```ts
import StyleWrap from "style-wrap";
StyleWrap.register();
```

## Quickstart (Vanilla JS):

```html
<body>
    <style-wrap color="white" background="cornflowerblue" padding="8px">
        <h1>padded white text with a cornflowerblue background</h1>
    </style-wrap>

    <!-- Browser-ready script -->
    <script src=".../path/to/style-wrap/dist/index.min.js"></script>

    <!-- Register the wrapper -->
    <script>
        StyleWrap.register();
    </script>
</body>
```

## Quickstart (Vue):

```html
<body>
    <div id="root">
        <style-wrap :color="color" :background="background" :padding="padding">
            <h1>{{ text }}</h1>
        </style-wrap>
    </div>

    <!-- Associated Vue script tags -->

    <!-- Browser-ready script -->
    <script src=".../path/to/style-wrap/dist/index.min.js"></script>

    <script>
        // Register the custom element and make sure vue doesn't treat it like a component.
        StyleWrap.register();
        Vue.config.ignoredElements = ["style-wrap"];

        const vm = new Vue({
            el: "#root",
            data: {
                color: "white",
                background: "cornflowerblue",
                padding: "8px",
            },
            computed: {
                text() {
                    return `${this.padding} padded ${this.color} text with a ${this.background} background`;
                },
            },
        });
    </script>
</body>
```

## Quickstart (React):

```html
<body>
    <div id="root"></div>

    <!-- Associated React script tags -->

    <!-- Browser-ready script -->
    <script src=".../path/to/style-wrap/dist/index.min.js"></script>

    <script type="text/babel">
        StyleWrap.register();

        function App() {
            const [padding, setPadding] = React.useState("8px");
            const [color, setColor] = React.useState("white");
            const [background, setBackground] =
                React.useState("cornflowerblue");

            const text = `${padding} padded ${color} text with a ${background} background`;

            return (
                <style-wrap
                    padding={padding}
                    color={color}
                    background={background}
                >
                    <h1>{text}</h1>
                </style-wrap>
            );
        }

        ReactDOM.render(<App />, document.querySelector("#root"));
    </script>
</body>
```
