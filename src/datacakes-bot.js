import '@speechly/browser-ui/core/push-to-talk-button';

const createStyle = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    main {
      align-items: center;
      margin: 0;
      position: relative;
      width: 38rem;
    }

    #containerQuestion {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: 0 0 0 0;
      position: relative;
    }

    #input {
      width: 100%;
      font-family: Verdana;
      font-size: 1.5rem;
      border: 1px solid #ccc;
      padding: 0.5rem 3rem 0.5rem 3rem;
      border-radius: 100px; //sufficiently large so it's circlular
      box-shadow: 0 0 5px #fff;
      background-color: #fff;
    }

    #input:focus {
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

    #containerAnswer {
      display: none;
      border: 1px solid #ccc;
      background-color: rgb(30,121,141);
      border-radius: 2rem;
      width: 100%;
      text-align: left;
      padding: 5px 24px;
      margin: 5px 0 0 0;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: absolute;
      z-index: 10;
    }

    #question {
      display: block;
      font-size: 18px;
      font-family: Verdana;
      font-weight: normal;
      font-style: normal;
      color: #fff;
      line-height: 1.5;
    }

    #answer {
      display: block;
      font-size: 18px;
      font-family: Verdana;
      font-weight: normal;
      font-style: normal;
      color: #fff;
      line-height: 1.5;
    }

    #error {
      display: block;
      font-size: 18px;
      font-family: Verdana;
      font-weight: normal;
      font-style: normal;
      color: #eed45d;
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
  const html = `
    <div id="containerQuestion">
      <input id="input" type="text" placeholder="Ask the bot..." autofocus>
      <div class="startAdornment">
      <span class="QCzoEc" style="height:2rem;line-height:20px;width:2rem"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></span>
      </div>
      <push-to-talk-button id="microphoneButton" size="2.8rem" class="endAdornment" fontsize="0.90rem" backgroundcolor="#104864" intro="Tap or hold for voice search" showtime="30000" appid="f6682864-81dd-4e5c-baf6-b4ef92cd89f5"/>
    </div>
    <div id="containerAnswer">
      <div id="div-error">
        <p>
          <span id="error"></span>
        </p>
      </div>
      <div id="div-question">
        <p>
          <span id="question"></span>
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
  `;
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
      .getElementById('input')
      .addEventListener('focus', e => {
          this._focused = true;
          this.render();
      });

    this._shadow
      .getElementById('input')
      .addEventListener('blur', e => {
          this._focused = false;
          this.render();
      });

    this._shadow
      .getElementById('microphoneButton')
      .addEventListener('speechsegment', e => {
        this.input = e.detail.words
          .filter(w => w.value)
          .map(w => w.value.toLowerCase())
          .join(' ')
          .trim();

        if (e.detail.isFinal) {
          this.handleRequest();
        }
      });

    this._shadow.getElementById('input').addEventListener('keyup', e => {
      this.input = this._shadow.getElementById('input').value.trim();
      if (e.key === 'Enter' && this.input.length) {
        this.handleRequest();
      }
    });
  }

  async checkBotExists(botId) {
    if (botId.trim() === '') {
      this._botExists = false;
    } else {
      this._botExists = (await checkBotExists(this.botId)).status === 'ok'? true: false;
    }
  }

  async handleRequest() {
    if (this._botExists) {
      this._loading = true;
      this.render();
      const response = await fetchAnswer(this.botId, this.input, this.chatHistory);
      this._loading = false;
      this._focused = true;
      this.render();

      if (response.status == 'ok') {

        this.input = '';
        this.question = response.data.question;
        this.answer = response.data.answer;
        this.error = '';
        this.chatHistory = [this.question, this.answer];
      } else if (response.status == 'error') {
        this.input = '';
        this.question = '';
        this.answer = '';
        this.error = response.message;
      }
    } else {
      this.input = '';
      this.question = '';
      this.answer = '';
      this.error = `Bot ${this.botId} not found.`;
    }

    this.render();
  }

  static get observedAttributes() {
    return ['bot-id', 'question'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'bot-id') {
      if (oldValue != newValue) {
        this.botId = newValue;
        this.input = '';
        this.question = '';
        this.answer = '';
        this.error = '';
        this._chatHistory = []; // yes, the private variable.
        this.render();
      }
    } else if (name === 'question') {
      this.input = newValue;
      this.handleRequest(newValue);
    }
  }

  set botId(value) {
    this._botId = value;
    this.checkBotExists(this._botId);
  }

  get botId() {
      return this._botId;
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
    this._shadow.getElementById('loader').style.display = this._loading?'block':'none';

    this._shadow.getElementById('input').value = this.input;

    if (
        this._loading ||
        (this._focused &&
            (this.question.trim().length || this.answer.trim().length || this.error.trim().length)
        )
    ) {
      this._shadow.getElementById('containerAnswer').style.display = 'block';
    } else {
      this._shadow.getElementById('containerAnswer').style.display = 'none';
    }

    if (this.question.trim().length) {
      this._shadow.getElementById('div-question').style.display = 'block';
      this._shadow.getElementById('question').innerText = 'Q: ' + this.question;
    } else {
      this._shadow.getElementById('div-question').style.display = 'none';
    }

    if (this.answer.trim().length) {
      this._shadow.getElementById('div-answer').style.display = 'block';
      this._shadow.getElementById('answer').innerText = 'A: ' + this.answer;
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


async function checkBotExists(bot_id) {
  const response = await fetch(`https://bots.datacakes.ai/bot/${bot_id}`, {
    method: 'GET'
  });

  return response.json()
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
