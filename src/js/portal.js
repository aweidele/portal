const linkList = document.querySelector('.link-list');
const calendar = document.querySelector('.header-calendar');

const renderCalendar = function() {
    const months = [
        'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
    ];
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();
    
    const firstOfMonth = new Date(year, month, 1, 0, 0 ,0).getDay();
    const daysInMonth = new Date(year, month + 1, 0, 0, 0 ,0).getDate();

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
                ${Array.from(Array(daysInMonth).keys()).map(d => { 
                    d++;
                    return `<span${d === day ? ' class="today"' : ''}${d === 1 ? ` style="grid-column-start: ${firstOfMonth + 1}"` : ''}>${d}</span>`;
                }).join('')}
            </div>
        </div>
    `;
}

calendar.innerHTML = renderCalendar();

const renderBookmarks = function(bookmarks) {
    const links = `
        <ul>
            ${bookmarks.map(link => `<li><a href="${link.url}">${link.linkName}</a> (${link.catName})</li>`).join('')}
        </ul>
    `;

    linkList.innerHTML = links;
}

const getBookmarks = async function () {
    try {
        const res = await fetch('https://angrychickens.com/portal/test/');
        const bookmarks = await res.json();
        renderBookmarks(bookmarks);
    } catch(err) {
        console.log(err);
    }
}

const postBookmark = async function () {
    // const opts = {
    //     cheese: 'Cheddar'
    // }

    let opts = new FormData();
    opts.append('cheese', 'Cheddar');

    try {
        const res = await fetch('https://angrychickens.com/portal/test/test.php', {
            method: 'POST',
            body: opts
        });
        const bookmarks = await res.json();
        console.log('postBookmark',bookmarks);
    } catch(err) {
        console.error(err);
    }
}

const postBookmark2 = async function () {
    try {
        const res = await fetch('https://angrychickens.com/portal/test/test.php');
        const bookmarks = await res.json();
        console.log('postBookmark2',bookmarks);
    } catch(err) {
        console.error(err);
    }
}

getBookmarks();
postBookmark();
postBookmark2();