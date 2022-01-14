export class BabyCalendar extends HTMLElement {
	constructor() {
		super();

		this._daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		this._months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		this._navigationMonthID = "";
		this._navigationMonthEl = null;
		this._headerEl = null;
		this._bodyElID = "";
		this._bodyEl = null;
		this._doneDrawing = false;

		let d = new Date();

		let navigationAttr = this.getAttribute("shownavigation");
		this._showNavigation =
			navigationAttr === "true" ||
			navigationAttr === "1" ||
			navigationAttr === "yes"
				? true
				: false;
		this._month = parseInt(this.getAttribute("month")) || d.getMonth();
		this._year = parseInt(this.getAttribute("year")) || d.getFullYear();
		this._eventDates = this.getAttribute("eventdates") || [];
	}

	connectedCallback() {
		this._render();
		this._doneDrawing = true;
	}

	get eventDates() {
		return this._eventDates;
	}

	set eventDates(value) {
		this._eventDates = value;

		if (this._doneDrawing) {
			this.redraw();
		}
	}

	get showNavigation() {
		return this._showNavigation;
	}

	set showNavigation(value) {
		this._showNavigation = value;
		this.setAttribute("shownavigation", value);

		if (this._doneDrawing) {
			this.redraw();
		}
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
	nextMonth() {
		this._onRightClick();
	}

	previousMonth() {
		this._onLeftClick();
	}

	redraw() {
		if (this._showNavigation) {
			this._updateNavigation();
		}

		this._updateBody();
	}

	today() {
		let d = new Date();
		this._month = d.getMonth();
		this._year = d.getFullYear();

		this.redraw();
		this._dispatchChangeMonth();
	}

	/*****************************************************************************
	 * Private methods
	 ****************************************************************************/
	_dispatchChangeMonth() {
		this.dispatchEvent(
			new CustomEvent("babycalendar-changemonth", {
				detail: {
					month: this._month,
					year: this._year,
				},
			})
		);
	}

	_dispatchDaySelected(day) {
		this.dispatchEvent(
			new CustomEvent("babycalendar-dayselected", {
				detail: {
					month: this._month,
					year: this._year,
					day: day,
				},
			})
		);
	}

	_generateRandomID(prefix) {
		return `${prefix}-${Date.now()}`;
	}

	_getFirstDayOfMonth() {
		let d = new Date(this._year, this._month);
		let result = new Date(d.getFullYear(), d.getMonth(), 1);
		return result;
	}

	_getLastDayOfMonth() {
		let d = new Date(this._year, this._month);
		let result = new Date(d.getFullYear(), d.getMonth() + 1, 0);
		return result;
	}

	_onDayClick(e) {
		e.preventDefault();
		e.stopPropagation();

		let day = 0;

		if (e.target.tagName === "A") {
			day = parseInt(e.target.innerText);
		} else {
			let el = e.target.children[0];
			day = parseInt(el.innerText);
		}

		this._dispatchDaySelected(day);
	}

	_onLeftClick() {
		this._month--;

		if (this._month < 0) {
			this._month = 11;
			this._year--;
		}

		this.redraw();
		this._dispatchChangeMonth();
	}

	_onRightClick() {
		this._month++;

		if (this._month > 11) {
			this._month = 0;
			this._year++;
		}

		this.redraw();
		this._dispatchChangeMonth();
	}

	_render() {
		this.classList.add("babycalendar");

		if (this._showNavigation) {
			this._renderNavigation();
		}

		this._renderHeader();
		this._renderBody();
	}

	_renderNavigation() {
		let div = this._drawNavigation();
		this.insertAdjacentElement("beforeend", div);
	}

	_renderHeader() {
		let div = document.createElement("div");
		div.classList.add("header-row");

		this._daysOfTheWeek.forEach((dayName) => {
			this._renderHeaderDayCell(div, dayName);
		});

		this._headerEl = div;
		this.insertAdjacentElement("beforeend", this._headerEl);
	}

	_renderHeaderDayCell(parentEl, dayName) {
		let div = document.createElement("div");
		div.classList.add("header-day");
		div.innerText = dayName;

		parentEl.insertAdjacentElement("beforeend", div);
	}

	_renderBody() {
		this._bodyEl = this._drawBody();
		this._bodyElID = this._generateRandomID("body");
		this._bodyEl.id = this._bodyElID;
		this.insertAdjacentElement("beforeend", this._bodyEl);
	}

	_drawNavigation() {
		let div = document.createElement("div");
		div.classList.add("navigation");

		let left = document.createElement("button");
		left.classList.add("navigation-button", "left");
		left.addEventListener("click", this._onLeftClick.bind(this));

		let right = document.createElement("button");
		right.classList.add("navigation-button", "right");
		right.addEventListener("click", this._onRightClick.bind(this));

		this._navigationMonthID = this._generateRandomID("navigationlabel");
		this._navigationMonthEl = document.createElement("span");
		this._navigationMonthEl.id = this._navigationMonthID;
		this._navigationMonthEl.innerText = this._getNavigationText();
		this._navigationMonthEl.classList.add("navigation-label");

		div.insertAdjacentElement("beforeend", left);
		div.insertAdjacentElement("beforeend", this._navigationMonthEl);
		div.insertAdjacentElement("beforeend", right);

		return div;
	}

	_drawBody() {
		let bodyDiv = document.createElement("div");
		let weekDiv = null;

		bodyDiv.classList.add("body");

		let firstDate = this._getFirstDayOfMonth();
		let firstDayOfWeek = firstDate.getDay();
		let lastDate = this._getLastDayOfMonth();
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
				let a = document.createElement("a");
				let d = dayIndex - firstDayOfWeek + 1;
				a.href = "javascript:void";
				a.innerText = `${d}`;
				a.addEventListener("click", this._onDayClick.bind(this));

				dayDiv.insertAdjacentElement("beforeend", a);

				if (this._hasEventOnDate(d)) {
					dayDiv.classList.add("has-event");
				}

				dayDiv.addEventListener("click", this._onDayClick.bind(this));
			} else {
				dayDiv.classList.add("disabled");
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

	_updateNavigation() {
		let t = this._getNavigationText();
		let el = document.getElementById(this._navigationMonthID)

		if (el) {
			el.innerText = t;
		}
	}

	_getNavigationText() {
		let t = `${this._months[this._month]} - ${this._year}`;
		return t;
	}

	_updateBody() {
		this._bodyEl = this._drawBody();
		this._bodyEl.id = this._bodyElID;
		document.getElementById(this._bodyElID).replaceWith(this._bodyEl);
	}

	_hasEventOnDate(day) {
		let d = new Date(this._year, this._month, day);
		let s = d.toISOString().split("T")[0];

		for (let i = 0; i < this._eventDates.length; i++) {
			if (this._eventDates[i] === s) {
				return true;
			}
		}

		return false;
	}
}

customElements.define("baby-calendar", BabyCalendar);
