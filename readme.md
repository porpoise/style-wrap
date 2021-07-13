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

## Quickstart (VueJS):

```html
<body>
    <div id="root">
        <css-wrap :color="color" :background="background" :padding="padding">
            <h1>{{ text }}</h1>
        </css-wrap>
    </div>

    <!-- Vue development version -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

    <!-- ES5 web-component adapter (prebundled in the future) -->
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.5.0/custom-elements-es5-adapter.js"></script>

    <!-- Browser-ready script -->
    <script src="../dist/index.min.js"></script>

    <!-- Setup Vue instance -->
    <script>
        CSSWrap.register();

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

    <!-- React/babel development version -->
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.24.0/babel.js"></script>

    <!-- ES5 web-component adapter (prebundled in the future) -->
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.5.0/custom-elements-es5-adapter.js"></script>

    <!-- Browser-ready script -->
    <script src="../dist/index.min.js"></script>

    <!-- Setup React component -->
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
