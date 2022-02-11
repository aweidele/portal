const linkList = document.querySelector('.link-list');
console.log(linkList);

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