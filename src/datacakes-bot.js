import '@speechly/browser-ui/core/push-to-talk-button';

const createStyle = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    main {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0;
    }

    #bot {
      border: 1px solid #ccc;
      width: 36rem;
      background-color: rgb(30,121,141);
      border-radius: 2rem;
    }

    #questionContainer {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: 0 0 0 0;
      position: relative;
    }

    #question {
      width: 100%;
      font-family: Verdana;
      font-size: 1.5rem;
      border: 1px solid #ccc;
      padding: 0.5rem 0.5rem 0.5rem 3rem;
      border-radius: 4em;
      background-color: #fff;
    }

    #question:focus {
      outline: none !important;
      box-shadow: 0 0 10px #fff;
    }

    ::placeholder {
      color: #aaa;
      opacity: 1;
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
      right: 0.1rem;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #aaa;
      padding: 0rem;
    }

    #answer {
      display: block;
      padding: 5px 32px;
      font-size: 18px;
      font-family: Verdana;
      font-weight: normal;
      font-style: normal;
      color: #fff;
      line-height: 1.5;
    }

    #error {
      display: block;
      padding: 5px 32px;
      font-size: 18px;
      font-family: Verdana
      font-weight: normal;
      font-style: normal;
      color: #f08989;
      line-height: 1.5;
    }
    .QCzoEc {
      display: inline-block;
      margin-top: 3px;
      color: #9aa0a6;
      position: relative;
    }

    #loader {
      display: none;
      margin: auto;
    }
  `;

  return styleElement;
};

const createBot = () => {
  const div = document.createElement('main');
  const html = `<div id="bot">
    <div id="questionContainer">
      <input id="question" type="text" placeholder="Ask the bot..." autofocus>
      <div class="startAdornment">
      <span class="QCzoEc" style="height:2rem;line-height:20px;width:2rem"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></span>
      </div>
      <push-to-talk-button id="microphoneButton" size="2.8rem" class="endAdornment" fontsize="0.90rem" backgroundcolor="#104864" intro="Tap or hold for voice search" showtime="30000" appid="f6682864-81dd-4e5c-baf6-b4ef92cd89f5"/>
    </div>
    <div id="answerContainer">
      <div id="div-error">
        <p>
          <span id="error"></span>
        </p>
      </div>
      <div id="div-answer">
        <p>
          <span id="answer"></span>
        </p>
      </div>
      <svg
        id="loader"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="150px"
        height="45px"
        viewBox="0 0 100 30"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(20 15)">
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
        <g transform="translate(40 15)">
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
        <g transform="translate(60 15)">
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
        <g transform="translate(80 15)">
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
    </div>
  </div>`;
  div.innerHTML = html;
  return div;
};

class Bot extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(createStyle());
    this._shadow.appendChild(createBot());

    this._chatHistory = [];
    this.question = '';
    this.answer = '';
    this.error = '';
  }

  connectedCallback() {
    this._shadow
      .getElementById('question')
      .addEventListener('focus', e => {
          this._shadow.getElementById('answerContainer').style.display = 'block';
      });

    this._shadow
      .getElementById('question')
      .addEventListener('blur', e => {
          this._shadow.getElementById('answerContainer').style.display = 'none';
      });

    this._shadow
      .getElementById('microphoneButton')
      .addEventListener('speechsegment', e => {
        const segment = e.detail.words
          .filter(w => w.value)
          .map(w => w.value.toLowerCase())
          .join(' ');
        this._shadow.getElementById('question').value = segment;

        if (e.detail.isFinal) {
          this.handleRequest(segment);
        }
      });

    this._shadow.getElementById('question').addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        this.handleRequest(e.target.value);
      }
    });
  }

  async handleRequest(q) {
    this._shadow.getElementById('loader').style.display = 'block';
    const response = await fetchAnswer(this.botId, q, this.chatHistory);
    this._shadow.getElementById('loader').style.display = 'none';
    if (response.status == 'ok') {
      this.question = response.data.question;
      this.answer = response.data.answer;
      this.error = '';
      this.chatHistory = [this.question, this.answer];
    } else if (response.status == 'error') {
      this.answer = '';
      this.error = response.message;
    }

    this.render();
  }

  static get observedAttributes() {
    return ['bot-id'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'bot-id') {
      this.question = '';
      this.answer = '';
      this.error = '';
      this.botId = newValue;
      this._chatHistory = []; // yes, the private variable.
      this.render();
    }
  }

  set chatHistory(qa) {
    this._chatHistory.push(qa);

    if (this._chatHistory.length > 10) {
      this._chatHistory.splice(0, this._chatHistory.length - 10);
    }
  }

  get chatHistory() {
    return this._chatHistory;
  }

  render() {
    this._shadow.getElementById('question').value = this.question;

    if (this.answer.trim().length) {
      this._shadow.getElementById('div-answer').style.display = 'block';
      this._shadow.getElementById('answer').innerText = this.answer;
    } else {
      this._shadow.getElementById('div-answer').style.display = 'none';
    }

    if (this.error.trim().length) {
      this._shadow.getElementById('div-error').style.display = 'block';
      this._shadow.getElementById('error').innerText = this.error;
    } else {
      this._shadow.getElementById('div-error').style.display = 'none';
    }
  }
}


async function fetchAnswer(bot_id, q, chat_history) {
  const response = await fetch(`https://bots.datacakes.ai/bot/${bot_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: q, chat_history: chat_history }),
  });

  return response.json();
}

customElements.define('datacakes-bot', Bot);
