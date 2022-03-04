import { defineCustomElement } from "vue";
import App from "./App.ce.vue";
import { name } from '../package.json';

export const AppInstance = defineCustomElement(App);

if(customElements.get(name) === undefined) {
    customElements.define(name, AppInstance);
}