(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const clientID = '7afe00c1ebac8d0be88db8d4b87799981e0745f0a98a64dda045b6033c228837';
        /*unsplash api*/
        $.ajax({
            url:`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}&client_id=${clientID}`
        }).done(addImage)
        .fail(error)
        /*NY times API*/
        $.ajax({
            url:`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f0f33f3526344777b33ab2d7eaf68fbe`
        }).done(addArticles)
        .fail(error)
    });
})();

function error() {
    const responseContainer = document.querySelector('#response-container');
    let div = document.createElement('div');
    div.innerHTML = '<p>sorry ,couldnt load the content</p>';
    responseContainer.appendChild(div);
}

function addImage(images) {
    const firstImage = images.results[0];
    let responseContainer = document.querySelector('#response-container');
    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${firstImage.description}">
            <figcaption>Photo by ${firstImage.user.name}</figcaption>
        </figure>`);
}


function addArticles(articles) {
    const responseContainer = document.querySelector('#response-container');
    let data = articles.response;
    let ul = document.createElement('ul');
    for (let item of data.docs) {
        ul.innerHTML += `<li class="article"><h2><a href="${item.web_url}">${item.headline.main}</a></h2><p>${item.snippet}<p></li>`;
    }
    responseContainer.appendChild(ul);
}
