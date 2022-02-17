"use strict";

const linkList = document.querySelector(".link-list");
const calendar = document.querySelector(".header-calendar");

const renderCalendar = function () {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();
  const year = today.getFullYear();

  const firstOfMonth = new Date(year, month, 1, 0, 0, 0).getDay() + 1;
  const daysInMonth = new Date(year, month + 1, 0, 0, 0, 0).getDate();

  return `
        <div class="calendar">
            <div class="calendar__today">
                <span>${months[month]}</span>
                <span>${day}</span>
            </div>
            <div class="calendar__grid">
                <span class="dow">S</span>
                <span class="dow">M</span>
                <span class="dow">T</span>
                <span class="dow">W</span>
                <span class="dow">T</span>
                <span class="dow">F</span>
                <span class="dow">S</span>
                ${Array.from(Array(daysInMonth))
                  .map(
                    (_, i) =>
                      `<span${i + 1 === day ? ' class="today"' : ""}${
                        i === 0
                          ? ` style="grid-column-start: ${firstOfMonth}"`
                          : ""
                      }>${i + 1}</span>`
                  )
                  .join("")}
            </div>
        </div>
    `;
};

calendar.innerHTML = renderCalendar();

// 1c58086a0dd586e3fd26953775313809

// async function getCurrentPosition() {
//     return new Promise( (resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(
//             position => resolve(position),
//             error => reject(error)
//         )
//     })
// }

// try {
//     const position = await getCurrentPosition()
//     console.log(position)
//     const lat = position.coords.latitude
//     const lon = position.coords.longitude
//     console.log(lat,lon);
// } catch(err) {
//     console.log(err)
//     document.querySelector('p:nth-of-type(1)').innerText = err.message
// }

const masonry = function () {
  const categoryGroups = document.querySelectorAll(".category-group");
  categoryGroups.forEach((group) => {
    const innerContainer = group.firstElementChild;
    const height = Math.round(innerContainer.offsetHeight / 60);
    group.style.gridRowEnd = `span ${height}`;
  });
};

const renderBookmarks = function (bookmarks) {
  const mostClicked = [...bookmarks]
    .sort((a, b) => b.clicks - a.clicks)
    .splice(0, 24);

  // bookmarks.forEach((l) => console.log(l["cat"]));

  const linkCategories = [...bookmarks]
    .reduce((previous, next) => {
      if (!previous[next.cat]) previous[next.cat] = [];
      previous[next.cat].push(next);
      return previous;
    }, [])
    .sort((a, b) => a[0].rank - b[0].rank);

  const output = `
  <div class="most-clicked">
    <div>
      <h2>Most Clicked</h2>
      <ul>
        ${mostClicked
          .map(
            (link) =>
              `<li><a href="http://angrychickens.com/portal/api/click.php?link=${link.linkID}" title="${link.clicks}">${link.linkName}</a></li>`
          )
          .join("")}
      </ul>
    </div>
  </div>
  ${linkCategories
    .map(
      (catLinks) => `
    <div class="category-group">
      <div>
        <h2>${catLinks[0].catName}</h2>
        <ul>
          ${catLinks
            .map(
              (link) =>
                `<li><a href="http://angrychickens.com/portal/api/click.php?link=${link.linkID}" title="${link.clicks}">${link.linkName}</a></li>`
            )
            .join("")}
        </ul>
      </div>
    </div>`
    )
    .join("")}
  `;

  linkList.innerHTML = output;
  masonry();
};

const getBookmarks = async function () {
  try {
    const res = await fetch("https://angrychickens.com/portal/api/");
    renderBookmarks(await res.json());
  } catch (err) {
    console.log(err);
  }
};

getBookmarks();

const renderWeather = function (weather) {
  console.log(weather);
  // const d = new Date(weather.current.daily[0]dt * 1000);
  weather.daily.forEach((day) => {
    const d = new Date(day.dt * 1000);
    console.log(d, day.temp.max);
  });
};

const getWeather = async function () {
  try {
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=39.2782&lon=-76.7401&units=imperial&exclude=minutely,hourly,alerts&appid=1c58086a0dd586e3fd26953775313809"
    );
    const weather = await res.json();
    renderWeather(weather);
  } catch (err) {
    console.log(err);
  }
};

getWeather();

// https://api.openweathermap.org/data/2.5/onecall?lat=39.2782&lon=-76.7401&units=imperial&exclude=minutely,hourly,alerts&appid=1c58086a0dd586e3fd26953775313809

const postBookmark = async function () {
  // const opts = {
  //     cheese: 'Cheddar'
  // }

  let opts = new FormData();
  opts.append("cheese", "Cheddar");

  try {
    const res = await fetch("https://angrychickens.com/portal/api/test.php", {
      method: "POST",
      body: opts,
    });
    const bookmarks = await res.json();
    console.log("postBookmark", bookmarks);
  } catch (err) {
    console.error(err);
  }
};

const postBookmark2 = async function () {
  try {
    const res = await fetch("https://angrychickens.com/portal/api/test.php");
    const bookmarks = await res.json();
    console.log("postBookmark2", bookmarks);
  } catch (err) {
    console.error(err);
  }
};
