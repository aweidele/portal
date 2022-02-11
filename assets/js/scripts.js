const linkList = document.querySelector('.link-list');
const calendar = document.querySelector('.header-calendar');

const renderCalendar = function() {
    const months = [
        'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
    ]
    const today = new Date();
    const m = today.getMonth();
    const d = today.getDate();
    const y = today.getFullYear();
    alert(y);

    const month = months[m];
    
    return `
        <div class="calendar">
            <div class="calendar__today">
                <span>${month}</span>
                <span>${d}</span>
            </div>
            <div class="calendar__grid">
                <span class="dow">S</span>
                <span class="dow">M</span>
                <span class="dow">T</span>
                <span class="dow">W</span>
                <span class="dow">T</span>
                <span class="dow">F</span>
                <span class="dow">S</span>
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