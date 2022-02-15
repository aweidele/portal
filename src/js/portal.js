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

const renderBookmarks = function (bookmarks) {
  console.log(bookmarks);
  const links = `
        <ul>
            ${bookmarks
              .map(
                (link) =>
                  `<li><a href="${link.url}">${link.linkName}</a> (${link.catName})</li>`
              )
              .join("")}
        </ul>
    `;

  //   linkList.innerHTML = links;
};

const getBookmarks = async function () {
  try {
    const res = await fetch("https://angrychickens.com/portal/test/");
    renderBookmarks(await res.json());
  } catch (err) {
    console.log(err);
  }
};

getBookmarks();

const postBookmark = async function () {
  // const opts = {
  //     cheese: 'Cheddar'
  // }

  let opts = new FormData();
  opts.append("cheese", "Cheddar");

  try {
    const res = await fetch("https://angrychickens.com/portal/test/test.php", {
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
    const res = await fetch("https://angrychickens.com/portal/test/test.php");
    const bookmarks = await res.json();
    console.log("postBookmark2", bookmarks);
  } catch (err) {
    console.error(err);
  }
};

// getBookmarks();
// postBookmark();
// postBookmark2();
