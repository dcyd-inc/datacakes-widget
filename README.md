
## Installation

<details>
<summary>1. Obtain a FAQs Bot ID</summary>
Either:

If you don't have a FAQs bot, create one [here](https://www.datacakes.ai/autofaqs) or by running 
```
curl -H "Content-Type: application/json" -X POST 'https://bots.datacakes.ai/create-faqs-bot' -d '{"url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0141694"}
```
</details>

<details>
<summary>2. Add custom element to your source code.
</summary>

### production
Choose a page on your site and add
```
<script type="module" src="https://cdn.jsdelivr.net/gh/dcyd-inc/datacakes-widget/dist/faqs-datacake.js"/>
<faqs-datacake id="datacake" botid="MY_BOT_ID"></faqs-datacake>
```
substituting your FAQs Bot ID for `MY_BOT_ID`.

Redeploy your site.
</details>
