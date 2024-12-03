import { Component, xml, useState } from "@odoo/owl";

export class Root extends Component {
  static template = xml`
    <div>
      Hello <t t-esc="state.text"/>
      <button t-on-click="update">Click me</button>
    </div>
  `;
  
  state = useState({ text: "Owl" });

  update() {
    this.state.text = this.state.text === "Owl" ? "World" : "Owl";
  }
}
