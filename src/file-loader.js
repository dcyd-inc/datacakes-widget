// Create template
const template = document.createElement('template');
template.innerHTML = /*html*/`
  <style>
      label {
        display: flex;
        align-items: center;
        width: 150px;
        height: 150px;
        color: white;
        background-color: rgb(30,121,141);
        border: 1px solid #ccc;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 10px #fff;
        margin: 10px;
      }

      label:hover {
        background-color: rgb(50,141,161);
      }

      label.default #file-icon {
        animation = none;
      }
      label.learning #file-icon {
        animation-play-state: running;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        25% { transform: scale(.9); }
        50% { transform: scale(1); }
        75% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }

      #file-icon {
        margin: 0 auto;
        display: block;
        width: 100px;
        height: 100px;
        fill: currentColor;
        overflow: hidden;
        animation-name: pulse;
        animation-duration: 500ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        transform-origin: 50% 50%;
        animation-play-state: paused;
      }
  </style>
  <label part="upload-button" for="fileUpload">
    <svg class="default" id="file-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326z m1.8 562H232V136h302v216c0 23.2 18.8 42 42 42h216v494z"  /><path d="M544 472c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V472z"  />
    </svg>
  </label>
  <input hidden id="fileUpload" type="file" accept=".doc,.pdf,.docx,.txt" />
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
      this.select('label').className = 'learning';
      const file = e.target.files[0];
      const response = await createBot(file);
      this.select('input').value = '';
      this.select('label').className = 'default';
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
