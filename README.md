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
    <baby-calendar
      id="calendar"
      month="0"
      year="2022"
      shownavigation="true"
    ></baby-calendar>

    <button id="today">Today</button>
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

