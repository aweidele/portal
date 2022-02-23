"use strict";const linkList=document.querySelector(".link-list"),calendar=document.querySelector(".header-calendar"),weatherContainer=document.querySelector(".header-weather"),controls=document.querySelector(".controls"),icons={"01d":"icon-sun","01n":"icon-moon","02d":"icon-cloudy","02n":"icon-cloud","03d":"icon-cloud1","03n":"icon-cloud1","04d":"icon-cloudy1","04n":"icon-cloudy1","09d":"icon-rainy","09n":"icon-rainy","10d":"icon-rainy","10n":"icon-rainy","11d":"icon-lightning","11n":"icon-lightning","13d":"icon-snowy","13n":"icon-snowy","50d":"icon-lines","50n":"icon-lines"},renderCalendar=function(){const n=new Date,e=n.getMonth(),t=n.getDate(),o=n.getFullYear(),a=new Date(o,e,1,0,0,0).getDay()+1,c=new Date(o,e+1,0,0,0,0).getDate();return`\n        <div class="calendar">\n            <div class="calendar__today">\n                <span>${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e]}</span>\n                <span>${t}</span>\n            </div>\n            <div class="calendar__grid">\n                <span class="dow">S</span>\n                <span class="dow">M</span>\n                <span class="dow">T</span>\n                <span class="dow">W</span>\n                <span class="dow">T</span>\n                <span class="dow">F</span>\n                <span class="dow">S</span>\n                ${Array.from(Array(c)).map(((n,e)=>`<span${e+1===t?' class="today"':""}${0===e?` style="grid-column-start: ${a}"`:""}>${e+1}</span>`)).join("")}\n            </div>\n        </div>\n    `};calendar.innerHTML=renderCalendar();const masonry=function(){document.querySelectorAll(".category-group").forEach((n=>{const e=n.firstElementChild,t=Math.round((e.offsetHeight+2*parseFloat(window.getComputedStyle(n,null).getPropertyValue("padding-top")))/60);n.style.gridRowEnd=`span ${t}`}))},renderBookmarks=function(n){const e=[...n].sort(((n,e)=>e.clicks-n.clicks)).splice(0,24),t=[...n].reduce(((n,e)=>(n[e.cat]||(n[e.cat]=[]),n[e.cat].push(e),n)),[]).sort(((n,e)=>n[0].rank-e[0].rank)),o=`\n  <div class="most-clicked">\n    <div>\n      <h2>Most Clicked</h2>\n      <ul>\n        ${e.map((n=>`<li><a href="http://angrychickens.com/portal/api/click.php?link=${n.linkID}" title="${n.clicks}">${n.linkName}</a></li>`)).join("")}\n      </ul>\n    </div>\n  </div>\n  ${t.map((n=>`\n    <div class="category-group">\n      <div>\n        <h2>${n[0].catName}</h2>\n        <ul>\n          ${n.map((n=>`<li><a href="http://angrychickens.com/portal/api/click.php?link=${n.linkID}" title="${n.clicks}">${n.linkName}</a></li>`)).join("")}\n        </ul>\n      </div>\n    </div>`)).join("")}\n  `;linkList.innerHTML=o,document.querySelectorAll(".category-group").forEach((n=>{const e=n.firstElementChild,t=Math.round((e.offsetHeight+2*parseFloat(window.getComputedStyle(n,null).getPropertyValue("padding-top")))/60);n.style.gridRowEnd=`span ${t}`}))},getBookmarks=async function(){try{const n=await fetch("https://angrychickens.com/portal/api/");renderBookmarks(await n.json())}catch(n){console.log(n)}};getBookmarks();const renderWeather=function(n){console.log(n);const e=["S","M","T","W","T","F","S"],t=`\n  <div class="current-conditions">\n    <div class="current-conditions__temp${"01d"===n.current.weather[0].icon?" sunny":"13d"===n.current.weather[0].icon||"01n"===n.current.weather[0].icon?" snow":""}">\n      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">\n        <use href="#${icons[n.current.weather[0].icon]}" x="0">\n      </svg>\n      <span>${Math.round(n.current.temp)}°</span>\n    </div>\n    <div class="current-conditions__description">\n      ${n.current.weather[0].description[0].toUpperCase()}${n.current.weather[0].description.substring(1)} <strong>Feels Like:</strong> ${Math.round(n.current.feels_like)}˚\n      <strong>Low:</strong> ${Math.round(n.daily[0].temp.min)}˚ <strong>High:</strong> ${Math.round(n.daily[0].temp.max)}°\n    </div>\n  </div>\n  <div class="forecast">\n    ${n.daily.slice(1,6).map((n=>`\n      <div class="forecast__day">${e[new Date(1e3*n.dt).getDay()]}</div>\n      <div class="forecast__icon${"01d"===n.weather[0].icon?" sunny":"13d"===n.weather[0].icon?" snow":""}">\n        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">\n          <use href="#${icons[n.weather[0].icon]}" x="0">\n        </svg>\n      </div>\n      <div class="forecast__high">${Math.round(n.temp.max)}°</div>\n      <div class="forecast__low">${Math.round(n.temp.min)}°</div>\n      `)).join("")}\n    </div>\n  `;weatherContainer.innerHTML=t},getWeather=async function(){try{const n=await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=39.2782&lon=-76.7401&units=imperial&exclude=minutely,hourly,alerts&appid=1c58086a0dd586e3fd26953775313809"),e=await n.json();renderWeather(e)}catch(n){console.log(n)}};getWeather();const postBookmark=async function(){let n=new FormData;n.append("cheese","Cheddar");try{const e=await fetch("https://angrychickens.com/portal/api/test.php",{method:"POST",body:n}),t=await e.json();console.log("postBookmark",t)}catch(n){console.error(n)}},postBookmark2=async function(){try{const n=await fetch("https://angrychickens.com/portal/api/test.php"),e=await n.json();console.log("postBookmark2",e)}catch(n){console.error(n)}};controls.addEventListener("click",(n=>{n.target.closest(".controls__expand")&&controls.classList.toggle("open")}));