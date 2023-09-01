const loadCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    data.data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `<a onclick ="loadVideo('${category.category_id}')" class="tab accent-blackk grey-bg">${category.category}</a>`;
        tabContainer.appendChild(div);
    });
}

const loadVideo = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();


    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';

    data.data.length === 0 ? document.getElementById('error').classList.remove('hidden') : document.getElementById('error').classList.add('hidden');

    data.data.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML = `<div class="card cursor-pointer">
                                <div style="background: url('${video.thumbnail}'); background-position: center center; background-size: cover; background-repeat: no-repeat;" class="w-full relative rounded-xl h-52">
                                    ${video.others.posted_date ? `<div id="time" class="time">${parseInt(video.others.posted_date / 3600)+' hours and '}${parseInt((video.others.posted_date % 3600) / 60)+' minutes ago'}</div>` : ''}
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
        console.log(data.data)

    })
}

loadCategory();
loadVideo(1000);