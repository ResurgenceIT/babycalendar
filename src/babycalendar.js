export class BabyCalendar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this._render();
	}

	/*****************************************************************************
	 * Private methods
	 ****************************************************************************/
	_render() {
		this.classList.add("babycalendar");
		this._renderHeader();

		this.insertAdjacentHTML("beforeend", "<p>Hello!</p>");
	}

	_renderHeader() {
		let div = document.createElement("div");
		div.classList.add("header-row");

		this.insertAdjacentElement("beforeend", div);

		["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(dayName => {
			this._renderHeaderDayCell(div, dayName);
		});
	}

	_renderHeaderDayCell(parentEl, dayName) {
		let div = document.createElement("div");
		div.classList.add("header-day");
		div.innerText = dayName;

		parentEl.insertAdjacentElement("beforeend", div);
	}
}

customElements.define("baby-calendar", BabyCalendar);
