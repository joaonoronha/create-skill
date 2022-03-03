import { defineCustomElement } from "vue";
import App from "./App.ce.vue";

export const AppInstance = defineCustomElement(App);

/*
export function register(tagName="hello-world") {
    customElements.define(tagName, AppInstance);
}
*/

if(customElements.get('hello-world') === undefined) {
    customElements.define('hello-world', AppInstance);
}