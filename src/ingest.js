// Create template
const template = document.createElement('template');
template.innerHTML = /*html*/`
  <style>
      :host {
        font-size: 13px;
        font-family: arial;
      }
      article {
          display: flex;
          align-items: center;
      }
      label {
        color: white;
        font-size: 14px;
        font-weight: bold;
        font-family: verdana;
        cursor: pointer;
        background-color: rgb(30,121,141);
        border: 1px solid rgb(118, 118, 118);
        padding: 9px 22px;
        border-radius: 5px;
      }
      #loader {
        display: none;
        margin: auto;
      }
  </style>
  <article>
    <label part="upload-button" for="fileUpload">Learn</label>
    <section hidden>
      <span></span>
      <svg
        id="loader"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="150px"
        height="150px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(20 50)">
          <circle cx="0" cy="0" r="6" fill="#e15b64">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.375s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(40 50)">
          <circle cx="0" cy="0" r="6" fill="#f8b26a">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.25s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(60 50)">
          <circle cx="0" cy="0" r="6" fill="#abbd81">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.125s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(80 50)">
          <circle cx="0" cy="0" r="6" fill="#81a3bd">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="0s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
      </svg>
    </section>
  </article>
  <input hidden id="fileUpload" type="file" />
`;

class FileUpload extends HTMLElement {
  constructor() {
    // Inititialize custom component
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Add event listeners
    this.select('input').onchange = (e) => this.handleChange(e);
  }

  async handleChange(e) {
      const file = e.target.files[0];
      this.select('section').style.display = "block";
      this.select('span').innerText = file.name;
      this.select('#loader').style.display = 'inline';
      const response = await createBot(file);
      this.select('#loader').style.display = 'none';
      this.select('input').value = '';
      this.dispatch('learn', response);
  }

  dispatch(event, arg) {
    this.dispatchEvent(new CustomEvent(event, {detail: arg}));
  }
  get select() {
    return this.shadowRoot.querySelector.bind(this.shadowRoot);
  }
}

async function createBot(file) {
  var data = new FormData();
  data.append('file', file);

  const response = await fetch('https://bots.datacakes.ai/create-docs-bot', {
    method: 'POST',
    body: data
  });

  return response.json();
}

window.customElements.define('datacakes-learn', FileUpload);
