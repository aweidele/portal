"use strict";

const linkList = document.querySelector(".link-list");
const calendar = document.querySelector(".header-calendar");
const weatherContainer = document.querySelector(".header-weather");

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
    const height = Math.round(
      (innerContainer.offsetHeight +
        parseFloat(
          window.getComputedStyle(group, null).getPropertyValue("padding-top")
        )) /
        60
    );
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
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const output = `
  <div class="current-conditions">
    <div class="current-conditions__temp">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.24 21.26">
        <path
          d="M0,10.62A.84.84,0,0,1,.25,10a.86.86,0,0,1,.6-.24h2a.76.76,0,0,1,.58.25.94.94,0,0,1,0,1.22.74.74,0,0,1-.58.25h-2a.82.82,0,0,1-.6-.25A.83.83,0,0,1,0,10.62Zm2.86,6.93a.93.93,0,0,1,.23-.61l1.47-1.43a.77.77,0,0,1,.59-.23.85.85,0,0,1,.6.23.75.75,0,0,1,.24.57.94.94,0,0,1-.24.64L4.33,18.14a.91.91,0,0,1-1.23,0A.81.81,0,0,1,2.86,17.55Zm0-13.84a.93.93,0,0,1,.23-.61,1,1,0,0,1,.64-.25.84.84,0,0,1,.59.24L5.75,4.56A.78.78,0,0,1,6,5.15.82.82,0,0,1,5.15,6a.78.78,0,0,1-.59-.24L3.1,4.32A.84.84,0,0,1,2.86,3.71Zm2.55,6.91A5,5,0,0,1,6.11,8,5.22,5.22,0,0,1,8,6.11a5.13,5.13,0,0,1,4.62-.28A5.22,5.22,0,0,1,14.3,7a5.25,5.25,0,0,1,1.52,3.68,5.06,5.06,0,0,1-.7,2.61,5.24,5.24,0,0,1-1.9,1.9,5.22,5.22,0,0,1-5.22,0,5.24,5.24,0,0,1-1.9-1.9A5.31,5.31,0,0,1,5.41,10.62Zm1.7,0a3.4,3.4,0,0,0,1,2.5,3.37,3.37,0,0,0,2.49,1,3.55,3.55,0,0,0,3.54-3.54,3.37,3.37,0,0,0-1-2.47,3.43,3.43,0,0,0-2.5-1,3.38,3.38,0,0,0-2.48,1A3.33,3.33,0,0,0,7.11,10.62ZM9.77,18.4a.79.79,0,0,1,.25-.6.85.85,0,0,1,.6-.24.84.84,0,0,1,.61.24.81.81,0,0,1,.24.6v2a.84.84,0,0,1-.25.62.82.82,0,0,1-.6.25A.8.8,0,0,1,10,21a.84.84,0,0,1-.25-.62Zm0-15.5v-2A.82.82,0,0,1,10,.26.83.83,0,0,1,10.63,0a.8.8,0,0,1,.6.25.82.82,0,0,1,.25.6V2.9a.76.76,0,0,1-.25.58.84.84,0,0,1-.6.23.86.86,0,0,1-.6-.23A.79.79,0,0,1,9.77,2.9Zm5.52,13.18a.79.79,0,0,1,.79-.79.85.85,0,0,1,.6.23L18.14,17a.87.87,0,0,1,.24.61.81.81,0,0,1-.24.59.89.89,0,0,1-1.2,0l-1.42-1.42A1,1,0,0,1,15.29,16.08Zm0-10.92a.78.78,0,0,1,.23-.59L16.94,3.1a.84.84,0,0,1,.59-.24.79.79,0,0,1,.6.25.82.82,0,0,1,.25.6.84.84,0,0,1-.24.62L16.68,5.76a.88.88,0,0,1-.6.24.73.73,0,0,1-.56-.24A.85.85,0,0,1,15.29,5.16Zm2.26,5.46a.89.89,0,0,1,.24-.62.78.78,0,0,1,.57-.24h2a.85.85,0,0,1,.6,1.46.82.82,0,0,1-.6.25h-2a.74.74,0,0,1-.58-.25A.86.86,0,0,1,17.55,10.62Z"
        />
      </svg>
      <span>${Math.round(weather.current.temp)}°</span>
    </div>
    <div class="current-conditions__description">
      ${weather.current.weather[0].description[0].toUpperCase()}${weather.current.weather[0].description.substring(
    1
  )} <strong>Feels Like:</strong> ${Math.round(weather.current.feels_like)}˚
      <strong>Low:</strong> ${Math.round(
        weather.daily[0].temp.min
      )}˚ <strong>High:</strong> ${Math.round(weather.daily[0].temp.max)}°
    </div>
  </div>
  <div class="forecast">
    ${weather.daily
      .slice(1, 6)
      .map(
        (day) => `
      <div class="forecast__day">${
        daysOfWeek[new Date(day.dt * 1000).getDay()]
      }</div>
      <div class="forecast__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.24 21.26">
          <path
            d="M0,10.62A.84.84,0,0,1,.25,10a.86.86,0,0,1,.6-.24h2a.76.76,0,0,1,.58.25.94.94,0,0,1,0,1.22.74.74,0,0,1-.58.25h-2a.82.82,0,0,1-.6-.25A.83.83,0,0,1,0,10.62Zm2.86,6.93a.93.93,0,0,1,.23-.61l1.47-1.43a.77.77,0,0,1,.59-.23.85.85,0,0,1,.6.23.75.75,0,0,1,.24.57.94.94,0,0,1-.24.64L4.33,18.14a.91.91,0,0,1-1.23,0A.81.81,0,0,1,2.86,17.55Zm0-13.84a.93.93,0,0,1,.23-.61,1,1,0,0,1,.64-.25.84.84,0,0,1,.59.24L5.75,4.56A.78.78,0,0,1,6,5.15.82.82,0,0,1,5.15,6a.78.78,0,0,1-.59-.24L3.1,4.32A.84.84,0,0,1,2.86,3.71Zm2.55,6.91A5,5,0,0,1,6.11,8,5.22,5.22,0,0,1,8,6.11a5.13,5.13,0,0,1,4.62-.28A5.22,5.22,0,0,1,14.3,7a5.25,5.25,0,0,1,1.52,3.68,5.06,5.06,0,0,1-.7,2.61,5.24,5.24,0,0,1-1.9,1.9,5.22,5.22,0,0,1-5.22,0,5.24,5.24,0,0,1-1.9-1.9A5.31,5.31,0,0,1,5.41,10.62Zm1.7,0a3.4,3.4,0,0,0,1,2.5,3.37,3.37,0,0,0,2.49,1,3.55,3.55,0,0,0,3.54-3.54,3.37,3.37,0,0,0-1-2.47,3.43,3.43,0,0,0-2.5-1,3.38,3.38,0,0,0-2.48,1A3.33,3.33,0,0,0,7.11,10.62ZM9.77,18.4a.79.79,0,0,1,.25-.6.85.85,0,0,1,.6-.24.84.84,0,0,1,.61.24.81.81,0,0,1,.24.6v2a.84.84,0,0,1-.25.62.82.82,0,0,1-.6.25A.8.8,0,0,1,10,21a.84.84,0,0,1-.25-.62Zm0-15.5v-2A.82.82,0,0,1,10,.26.83.83,0,0,1,10.63,0a.8.8,0,0,1,.6.25.82.82,0,0,1,.25.6V2.9a.76.76,0,0,1-.25.58.84.84,0,0,1-.6.23.86.86,0,0,1-.6-.23A.79.79,0,0,1,9.77,2.9Zm5.52,13.18a.79.79,0,0,1,.79-.79.85.85,0,0,1,.6.23L18.14,17a.87.87,0,0,1,.24.61.81.81,0,0,1-.24.59.89.89,0,0,1-1.2,0l-1.42-1.42A1,1,0,0,1,15.29,16.08Zm0-10.92a.78.78,0,0,1,.23-.59L16.94,3.1a.84.84,0,0,1,.59-.24.79.79,0,0,1,.6.25.82.82,0,0,1,.25.6.84.84,0,0,1-.24.62L16.68,5.76a.88.88,0,0,1-.6.24.73.73,0,0,1-.56-.24A.85.85,0,0,1,15.29,5.16Zm2.26,5.46a.89.89,0,0,1,.24-.62.78.78,0,0,1,.57-.24h2a.85.85,0,0,1,.6,1.46.82.82,0,0,1-.6.25h-2a.74.74,0,0,1-.58-.25A.86.86,0,0,1,17.55,10.62Z"
          />
        </svg>
      </div>
      <div class="forecast__high">${Math.round(day.temp.max)}°</div>
      <div class="forecast__low">${Math.round(day.temp.min)}°</div>
      `
      )
      .join("")}
    </div>
  `;

  weatherContainer.innerHTML = output;
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
