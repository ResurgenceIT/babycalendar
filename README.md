# Baby Calendar
A tiny, baby, useless (almost) calendar widget in Vanilla JS.

## Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Using Baby Calendar</title>

    <link
      type="text/css"
      rel="stylesheet"
      media="screen"
      href="babycalendar.css"
    />

    <style type="text/css">
      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.1em;
      }
    </style>
  </head>
  <body>
    <main id="example">
      <baby-calendar
        id="calendar"
        month="0"
        year="2022"
        shownavigation="true"
      ></baby-calendar>

      <button id="today">Today</button>
    </main>
  </body>

  <script src="babycalendar.js" type="module"></script>
  <script>
    today.addEventListener("click", () => {
      let el = document.getElementById("calendar");
      el.today();
    });

    calendar.addEventListener("babycalendar-changemonth", (e) => {
      let info = e.detail;
      console.log(info);
    });

    calendar.addEventListener("babycalendar-dayselected", (e) => {
      let info = e.detail;
      console.log(info);
    });
  </script>
</html>
```

## Usage

Baby Calendar is a custom web component which is supported in all current major browsers. To use it, simply include the CSS and JS files, then drop a `<baby-calendar></baby-calendar>` node into your markup. Or, if you wish, you can inject it via JavaScript like so.

```javascript
let calendar = document.createElement("baby-calendar");
calendar.setAttribute("month", 0);
calendar.setAttribute("year", 2022);
calendar.setAttribute("shownavigation", true);

document.getElementById("example").insertAdjacentElement("afterbegin", calendar);
```

### Attributes

* **month** - 0-based month. Defaults to 0 (January)
* **year** - 4-digit year
* **shownavigation** - *true* to display the month navigation. Defaults to *false*

### Methods

* **nextMonth()** - Advances the calendar to the next month
* **previousMonth()** - Move the calendar back one month
* **redraw()** - Re-draws the calendar
* **today()** - Sets the calendar to today's month and year

### Events

Baby Calendar emits several events, allowing you to take custom actions when certain things happen in the calendar.

#### Change Month

When the month in the calendar is change using the navigation, or by calling **nextMonth()** or **previousMonth()**, the event `babycalendar-changemonth` is emitted. It is a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent), so the **detail** key will contain an object with the following information.

```json
{
  month: <number>,
  year: <number>
}
```

For example:

```javascript
calendar.addEventListener("babycalendar-changemonth", (e) => {
  let info = e.detail;
  console.log(info);
});
```

#### Day Selected

When a day or day cell is clicked in the calendar, the event `babycalendar-dayselected` is emitted. It is a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent), so the **detail** key will contain an object with the following information.

```json
{
  month: <number>,
  year: <number>,
  day: <number>
}
```

For example:

```javascript
calendar.addEventListener("babycalendar-dayselected", (e) => {
  let info = e.detail;
  console.log(info);
});
```

## License

MIT License

Copyright (c) 2022 App Nerds

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

