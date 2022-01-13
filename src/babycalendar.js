export class BabyCalendar extends HTMLElement {
	constructor() {
		super();

		this._header = null;
		this._bodyID = "";
		this._body = null;

		let d = new Date();

		this._month = parseInt(this.getAttribute("month")) || d.getMonth();
		this._year = parseInt(this.getAttribute("year")) || d.getFullYear();
	}

	connectedCallback() {
		this._render(this._month, this._year);
	}

	get month() {
		return this._month;
	}

	set month(value) {
		this._month = parseInt(value);
		this.setAttribute("month", value);
	}

	get year() {
		return this._year;
	}

	set year(value) {
		this._year = parseInt(value);
		this.setAttribute("year", value);
	}

	/*****************************************************************************
	 * Public methods
	 ****************************************************************************/
	redraw() {
		this._drawBody();
	}

	/*****************************************************************************
	 * Private methods
	 ****************************************************************************/
	_generateRandomID(prefix) {
		return `${prefix}-${Date.now()}`;
	}

	_getFirstDayOfMonth(month, year) {
		let d = new Date(year, month);
		let result = new Date(d.getFullYear(), d.getMonth(), 1);
		return result;
	}

	_getLastDayOfMonth(month, year) {
		let d = new Date(year, month);
		let result = new Date(d.getFullYear(), d.getMonth() + 1, 0);
		return result;
	}

	_render(month, year) {
		this.classList.add("babycalendar");
		this._header = this._renderHeader();
		this._body = this._renderBody(month, year);

		this._bodyID = this._generateRandomID("body");
		this._body.id = this._bodyID;

		this.insertAdjacentElement("beforeend", this._header);
		this.insertAdjacentElement("beforeend", this._body);
	}

	_renderHeader() {
		let div = document.createElement("div");
		div.classList.add("header-row");

		["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((dayName) => {
			this._renderHeaderDayCell(div, dayName);
		});

		return div;
	}

	_renderHeaderDayCell(parentEl, dayName) {
		let div = document.createElement("div");
		div.classList.add("header-day");
		div.innerText = dayName;

		parentEl.insertAdjacentElement("beforeend", div);
	}

	_renderBody(month, year) {
		let bodyDiv = document.createElement("div");
		let weekDiv = null;

		bodyDiv.classList.add("body");

		let firstDate = this._getFirstDayOfMonth(month, year);
		let firstDayOfWeek = firstDate.getDay();
		let lastDate = this._getLastDayOfMonth(month, year);
		let lastDay = lastDate.getDate();

		let started = false;

		const createWeekDiv = () => {
			weekDiv = document.createElement("div");
			weekDiv.classList.add("week");
		};

		/*
		 * Create the first week div
		 */
		createWeekDiv();

		for (let dayIndex = 0; dayIndex < lastDay + firstDayOfWeek; dayIndex++) {
			/*
			 * Basically we want to not render day numbers until we hit the
			 * first day of the month on the correct day of the week.
			 */
			if (!started) {
				if (dayIndex === firstDayOfWeek) {
					started = true;
				}
			}

			let dayDiv = document.createElement("div");
			dayDiv.classList.add("day");

			if (started) {
				dayDiv.innerText = `${dayIndex - firstDayOfWeek + 1}`;
			}

			weekDiv.insertAdjacentElement("beforeend", dayDiv);

			/*
			 * We DO want to render week divs every 7 days.
			 */
			if (!((dayIndex + 1) % 7)) {
				bodyDiv.insertAdjacentElement("beforeend", weekDiv);
				createWeekDiv();
			}
		}

		if (weekDiv.innerHTML !== "") {
			bodyDiv.insertAdjacentElement("beforeend", weekDiv);
		}

		return bodyDiv;
	}

	_drawBody() {
		this._body = this._renderBody(this._month, this._year);
		this._body.id = this._bodyID;
		document.getElementById(this._bodyID).replaceWith(this._body);
	}
}

customElements.define("baby-calendar", BabyCalendar);
