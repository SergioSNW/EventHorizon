import { LitElement, html, css } from 'lit-element';

export class MeApp extends LitElement {

    static get styles() {
        return [
            css`
        /* your styles here
         h1 { display: block;}
        */
      `,

        ];
    }

    static get properties() {
        return {
            // your props here
        };
    }

    constructor() {
        super();

        // property defaults etc here
    }

    render() {
        return html`
            <h1>Hello LitElement App!</h1>
        `;
    }
}