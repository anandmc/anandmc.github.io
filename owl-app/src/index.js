import { Component, useState } from "@odoo/owl";
import { mount } from "@odoo/owl";

class App extends Component {
    setup() {
        this.state = useState({ message: "Hello, Owl on GitHub Pages!" });
    }

    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
            </div>
        );
    }
}

mount(App, { target: document.getElementById("app") });
