
## Installation

<details>
<summary>1. Obtain a FAQs Bot ID</summary>
Either:

* create a new FAQs bot [here](https://www.datacakes.ai/autofaqs)
* or grab the ID of an existing one [here](https://bots.datacakes.ai/list-bots)

Record the bot's ID, and substitute it for `MY_BOT_ID` in the next step.
</details>

<details>
<summary>2. Add bot element to your source code.
</summary>

### local
* Store `faqs-datacake.js` locally.
* In the same directory, create `index.html` with this content:
```
<script type="module" src="faqs-datacake.js"></script>
<faqs-datacake id="datacake" botid="MY_BOT_ID"></faqs-datacake>
```

### production
Choose a page on your site and add
```
<script type="module" src="https://storage.googleapis.com/datacakes-static/faqs-datacake.js"></script>
<faqs-datacake id="datacake" botid="MY_BOT_ID"></faqs-datacake>
```
</details>

<details>
<summary>3. Deploy.</summary>

### local
In the same directory, run `python3 -m http.server` at the command line and navigate to [http://0.0.0.0:8000/](http://0.0.0.0:8000/) in a browser.

### production
Follow your usual deployment steps.
</details>
