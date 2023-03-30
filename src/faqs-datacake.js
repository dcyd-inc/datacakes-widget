import '@speechly/browser-ui/core/push-to-talk-button';

const createStyle = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
        main {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            min-height: 25vh;
            margin: 0;
            padding: 0;
        }

        #datacakes-bot-response {
            display: block;
            padding: 5px 32px;
            font-size: 18px;
            font-family: Verdana;
            font-weight: normal;
            font-style: normal;
            color: #fff;
            line-height: 1.5;
        }

        #datacakes-bot-error {
          display: block;
          padding: 5px 32px;
          font-size: 18px;
          font-family: Verdana
          font-weight: normal;
          font-style: normal;
          color: #f08989;
          line-height: 1.5;
        }

        #datacakes-bot {
            background-color: rgb(30,121,141);
            border: 1px solid #ccc;
            border-radius: 3em;
            box-shadow: 0 0 10px #fff;
            min-height: 275px;
        }

        .inputGroup {
            margin: 0 0 3rem 0;
        }

        input {
            font-size: 1.5rem;
            border: 1px solid #ccc;
            padding: 0.5em;
            border-radius: 30em;
            background-color: #fff;
        }

        input:focus {
            outline: none !important;
            box-shadow: 0 0 10px #fff;
        }

        ::placeholder {
            color: #aaa;
            opacity: 1;
        }

        .inputContainer {
            position: relative;
        }

        .startAdornment {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: #aaa;
            padding: 0.5rem;
            font-size: 1.75rem;
        }

        .endAdornment {
            position: absolute;
            right: 0.3rem;
            top: 0;
            bottom: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: #aaa;
            padding: 0rem;
        }

        #loading {
          display: none;
          margin: auto;
        }

        #searchBox {
            box-sizing: border-box;
            width: 60vw;
            min-width: 16rem;
            max-width: 36rem;
            padding-left: 3rem;
            font-family: Verdana
        }
        `;

  return styleElement;
};

const createInputElement = () => {
  const div = document.createElement('main');
  const html = `<div id="datacakes-bot">
    <div class="inputGroup">
        <div class="inputContainer">
          <input id="searchBox" type="text" placeholder="Search with voice..." autofocus>
          <div class="startAdornment">🔍</div>
          <push-to-talk-button id="microphoneButton" size="2.8rem" class="endAdornment" fontsize="0.90rem" backgroundcolor="#104864" intro="Tap or hold for voice search" showtime="30000" appid="f6682864-81dd-4e5c-baf6-b4ef92cd89f5"/>
        </div>
    </div>
    <div>
      <svg
      id="loading"
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
      <div>
          <p>
              <span id="datacakes-bot-error"></span>
          </p>
      </div>
      <div>
          <p>
              <span id="datacakes-bot-response"></span>
          </p>
      </div>
    </div>
  </div>`;
  div.innerHTML = html;
  return div;
};

class FAQsDataCake extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(createStyle());
    shadow.appendChild(createInputElement());

    this.chat_history = [];

    shadow
      .getElementById('microphoneButton')
      .addEventListener('speechsegment', e => {
        const segment = e.detail.words
          .filter(w => w.value)
          .map(w => w.value.toLowerCase())
          .join(' ');
        shadow.getElementById('searchBox').value = segment;

        if (e.detail.isFinal) {
          fetchAnswer(this.bot_id, segment, this.chat_history);
        }
      });

    shadow.getElementById('searchBox').addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        fetchAnswer(this.bot_id, e.target.value, this.chat_history);
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.bot_id = newValue;
    this.chat_history = [];
  }

  static get observedAttributes() {
    return ['botid'];
  }
}

async function fetchAnswer(bot_id, q, chat_history) {
  const shadow = document.getElementById('datacake').shadowRoot;
  const loading = shadow.getElementById('loading');
  const successText = shadow.getElementById('datacakes-bot-response');
  const errorText = shadow.getElementById('datacakes-bot-error');

  successText.innerText = '';
  errorText.innerText = '';
  loading.style.display = 'block';

  const response = await fetch(`https://bots.datacakes.ai/bot/${bot_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: q, chat_history: chat_history }),
  });

  loading.style.display = 'none';

  const json = await response.json();

  if (json.status == 'ok') {
    chat_history.push([json.data.question, json.data.answer]);

    if (chat_history.length > 10) {
      chat_history.splice(0, chat_history.length - 10);
    }

    successText.innerText = json.data.answer;
  } else if (json.status == 'error') {
    errorText.innerText = json.message;
  }
}

customElements.define('faqs-datacake', FAQsDataCake);
