const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    data.data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `<button onclick ="loadVideo('${category.category_id}')" class="focus:bg-red-500 focus:text-white tab accent-blackk grey-bg">${category.category}</button>`;
        tabContainer.appendChild(div);
    });
}

const loadVideo = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';

    data.data.length === 0 ? document.getElementById('error').classList.remove('hidden') : document.getElementById('error').classList.add('hidden');

    document.getElementById('sort-button').addEventListener('click', function() {
        sort(data.data);
    })

    data.data.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML = `<div class="card cursor-pointer">
                                <div style="background: url('${video.thumbnail}'); background-position: center center; background-size: cover; background-repeat: no-repeat;" class="w-full relative rounded-xl h-52">
                                    ${video.others.posted_date ? `<div id="time" class="time">${parseInt(video.others.posted_date / 3600) + ' hours and '}${parseInt((video.others.posted_date % 3600) / 60) + ' minutes ago'}</div>` : ''}
                                </div>

                            <div class="info">
                                <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                                <div class="video-info">
                                    <h3 class="post-title">${video.title}</h3 class="post-title">
                                    <div>
                                        <p>${video.authors[0].profile_name}</p>
                                        <img class="" id="bluetick" src="${video.authors[0].verified ? `../images/bluetick.png` : ""}" alt="">
                                    </div>
                                    <p>${video.others.views} views</p>
                                </div>
                            </div>
                        </div>`
            ;
        cardContainer.appendChild(div);
    })
}

const sort = (sortedVideo) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';
    const sorted = sortedVideo.sort((x, y) => parseInt(y.others.views) - parseInt(x.others.views));

    sorted.forEach(sortedVideo => {
        const sortedDiv = document.createElement('div');
        sortedDiv.innerHTML = `<div class="card cursor-pointer">
                            <div style="background: url('${sortedVideo.thumbnail}'); background-position: center center; background-size: cover; background-repeat: no-repeat;" class="w-full relative rounded-xl h-52">
                                ${sortedVideo.others.posted_date ? `<div id="time" class="time">${parseInt(sortedVideo.others.posted_date / 3600) + ' hours and '}${parseInt((sortedVideo.others.posted_date % 3600) / 60) + ' minutes ago'}</div>` : ''}
                            </div>

                            <div class="info">
                                <img class="w-10 h-10 rounded-full" src="${sortedVideo.authors[0].profile_picture}" alt="">
                                <div class="video-info">
                                    <h3 class="post-title">${sortedVideo.title}</h3 class="post-title">
                                    <div>
                                        <p>${sortedVideo.authors[0].profile_name}</p>
                                        <img class="" id="bluetick" src="${sortedVideo.authors[0].verified ? `../images/bluetick.png` : ""}" alt="">
                                    </div>
                                    <p>${sortedVideo.others.views} views</p>
                                </div>
                            </div>
                        </div>`;
        sorted.push(sortedVideo)
        cardContainer.appendChild(sortedDiv);
    })
}

loadCategory();
loadVideo(1000);