import Chart from 'chart.js/auto';

class ChartElem extends HTMLElement {
	constructor() {
		super();
		this._id = "myChart" + Math.floor(Math.random()*100000).toString();
		this._shadow = this.attachShadow({ mode: 'open' });
		this._root = document.createElement('canvas');
		this._root.setAttribute("id", this._id);
		this._root.setAttribute("style", "width: 100%");
		this._shadow.appendChild(this._root);

		this._chart = null;
	}

	static get observedAttributes() {
		return ['chart-data', 'chart-options'];
	}

	connectedCallback() {
		this.style.display = "block";

        this.chartOptions = {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
        //this.chartData = data;
		this._connected = true;
		if (this._chartData) {
			this.render();
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'chart-data') {
			this.chartData = newValue;
		}
		else if (name === 'chart-options') {
			this.chartOptions = newValue;
		}
	}

	get chartData() {
		return this._chartData;
	}

	set chartData(d) {
        let raw_data = JSON.parse(d);
        let formatted_data = {
          labels: raw_data["labels"],
          datasets: [{
            label: '# of Votes',
            data: raw_data["numbers"],
            borderWidth: 1
          }]
        }
		this._chartData = formatted_data;

		if (this._connected)
			this.render();
	}

	get chartOptions() {
		return this._chartOptions;
	}

	set chartOptions(o) {
		this._chartOptions = o;
	}

	render() {
		const elem = this._shadow.getElementById(this._id);
		elem.style.backgroundColor = 'rgba(242,238,231,1)'; //same as #f2eee7
		const ctx = elem.getContext('2d');
		if (this._chart != null) {
			this._chart.destroy();
		}

		this._chart = new Chart(ctx, {
			type: 'bar',
			data: this.chartData,
			options: this.chartOptions || {}
		});
	}
}

window.customElements.define('datacakes-color-count-chart', ChartElem);
