/**
 * @param {string} name
 * @param {string} raw_html
 */
function createCustomComponent(name, raw_html) {
    customElements.define(
        name,
        class extends HTMLElement {
            constructor() {
                super();

                const shadow = this.attachShadow({
                    mode: "open",
                    delegatesFocus: true,
                });
                const root = document.createElement("div");
                root.className = "root";

                // Get component template
                let template = raw_html
                    .match(/<template>([\w\W]+?)<\/template>/gim)[0]
                    .split("<template>")[1]
                    .split("</template>")[0];

                // Eval the Prop List of Template
                const props = template.match(/"\[([\w\W]+?)\]"/gim) || [];
                props.forEach((prop) => {
                    try {
                        const name = prop.split("[")[1].split("]")[0];
                        const value =
                            this.getAttribute(name) ||
                            `Prop: "${name}" not found`;
                        template = template.replaceAll(`${prop}`, value);
                    } catch {}
                });

                // Create the Document Fragment
                const html = document
                    .createRange()
                    .createContextualFragment(template);
                html.innerHTML = template;
                root.appendChild(html);

                const script = raw_html.match(/<script>([\s\S]+?)<\/script>/);
                if (script) {
                    let raw_script = script[1];

                    // Eval the Props list of Script
                    const props = raw_script.match(/"\[([\w\W]+?)\]"/gim) || [];
                    props.forEach((prop) => {
                        const name = prop.split("[")[1].split("]")[0];
                        const value = this.getAttribute(name) || null;

                        raw_script = raw_script.replaceAll(`${prop}`, value);
                    });

                    // Eval the Script
                    eval(raw_script);
                }

                // Eval the Style
                const style = raw_html.match(/<style>([\s\S]+?)<\/style>/);
                if (style) {
                    const style_node = document.createElement("style");
                    let raw_style = style[1];

                    // Eval the Props list of Script
                    const props = raw_style.match(/"\[([\w\W]+?)\]"/gim) || [];
                    props.forEach((prop) => {
                        const name = prop.split("[")[1].split("]")[0];
                        const value = this.getAttribute(name) || null;

                        raw_style = raw_style.replaceAll(`${prop}`, value);
                    });

                    // Eval the Style
                    style_node.innerHTML = raw_style;
                    root.appendChild(style_node);
                }

                // Append to shadow
                shadow.appendChild(root);
            }
        }
    );

    console.info(`The component "${name}" has been registered`);
}

async function fetchComponentsList() {
    const response = await fetch("components/");
    const raw_html = await response.text();

    const html = document.createRange().createContextualFragment(raw_html);

    const dom = document.implementation.createHTMLDocument();
    dom.body.replaceChildren(html);

    const files_ref = Array.from(
        dom.body.querySelectorAll("span[class='name']")
    );

    // Remove the first element
    files_ref.shift();

    return files_ref.map((file) => file.innerText);
}

async function fetchComponentRaw(component) {
    const response = await fetch(`components/${component}`);
    return response.text();
}

export async function registerComponents() {
    const components = await fetchComponentsList();
    components.forEach(async (component) => {
        const raw_html = await fetchComponentRaw(component);
        createCustomComponent("cc-" + component.split(".html")[0], raw_html);
    });
}

registerComponents();
