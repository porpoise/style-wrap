# `css-wrap`

## Quickstart (Vanilla JS):

```html
<body>
    <css-wrap color="white" background="cornflowerblue" padding="8px">
        <h1>padded white text with a cornflowerblue background</h1>
    </css-wrap>

    <!-- ES5 web-component adapter (prebundled in the future) -->
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.5.0/custom-elements-es5-adapter.js"></script>

    <!-- Browser-ready script -->
    <script src=".../path/to/css-wrap/dist/index.min.js"></script>

    <!-- Register the wrapper -->
    <script>
        CSSWrap.register();
    </script>
</body>
```

## Quickstart (Vue):

```html
<body>
    <div id="root">
        <css-wrap :color="color" :background="background" :padding="padding">
            <h1>{{ text }}</h1>
        </css-wrap>
    </div>

    <!-- Associated script tags -->

    <script>
        // Register the custom element and make sure vue doesn't treat it like a component.
        CSSWrap.register();
        Vue.config.ignoredElements = ["css-wrap"];

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

    <!-- Associated script tags -->

    <script type="text/babel">
        CSSWrap.register();

        function App() {
            const [padding, setPadding] = React.useState("8px");
            const [color, setColor] = React.useState("white");
            const [background, setBackground] =
                React.useState("cornflowerblue");

            const text = `${padding} padded ${color} text with a ${background} background`;

            return (
                <css-wrap
                    padding={padding}
                    color={color}
                    background={background}
                >
                    <h1>{text}</h1>
                </css-wrap>
            );
        }

        ReactDOM.render(<App />, document.querySelector("#root"));
    </script>
</body>
```
