/** @jsx createVNode */

/* gets called by transpiled JSX */
function createVNode(nodeName, attributes, ...args) {
  let children = args.length ? [].concat(...args) : null;
  return { nodeName, attributes, children };
}

/* Render Virtual DOM to the real DOM */
function render(element) {
  if (typeof element === "string") {
    return document.createTextNode(element);
  }

  const n = document.createElement(element.nodeName);

  const a = element.attributes || {};

  Object.keys(a).forEach((attribute) => {
    n.setAttribute(attribute, a[attribute]);
  });

  if (element.children) {
    element.children.forEach((child) => {
      n.appendChild(render(child));
    });
  }

  return n;
}

const ITEMS = [
  "Cats sleep for around 13 to 16 hours a day",
  "The Eiffel Tower can grow over 6 inches in summer",
  "Octopuses have three hearts and blue blood",
];

// simple JSX
let uiStructure = (
  <div class="ui-structure">
    <p>This UI was rendered using custom JSX and a virtual DOM</p>
    <ul>
      {ITEMS.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  </div>
);

// render() converts our "virtual DOM" to a real DOM tree:
let dom = render(uiStructure);

// append the new nodes
document.body.appendChild(dom);
