// ---------------COMMON---------------
window.addEventListener('DOMContentLoaded', (event) => {
});
// ---------------SERVICES---------------
const servicesTabs = document.querySelector('.services-tabs');
services.forEach((element) => {
    servicesTabs.innerHTML +=  `<button class="services-tab-links">${element.tabName}</button>`

});
const servicesButtons = document.querySelectorAll('.services-tab-links');
const serviceContent = document.querySelector('.service-content');
servicesButtons[0].classList.add('services-active-tab');
serviceContent.innerHTML =  `
    <img src="${services[0].img}" class="service-img">
    <p class="service-text">${services[0].text}</p>`;
for (let btn of servicesButtons) {
    btn.addEventListener('click', (event) => {
        for (let btn of servicesButtons) {
            btn.classList.remove('services-active-tab');
        }
        event.target.classList.add('services-active-tab');
        const buttonValue = event.target.textContent.toLowerCase();
        for (service of services) {
            if( buttonValue === service.tabName) {
                serviceContent.innerHTML =  `
                    <img src="${service.img}" class="service-img">
                    <p class="service-text">${service.text}</p>`;
            }
        }
    });
}
// ---------------PORTFOLIO---------------
const portfolioTabs = document.querySelector('.portfolio-tabs');
portfolio.forEach((element) => {
    portfolioTabs.innerHTML +=  `<button class="portfolio-tab-links">${element.category}</button>`

});
const portfolioButtons = document.querySelectorAll('.portfolio-tab-links');
portfolioButtons[0].classList.add('portfolio-active-tab');
let loadMoreClickCount = 0;
const itemsCount = 12;
const portfolioGallery = document.querySelector('.portfolio-gallery');
const insertGallery = (projects) => {
    for( let i = 0; i < itemsCount; i++ ) {
        if (projects[itemsCount * loadMoreClickCount + i]) {
            portfolioGallery.innerHTML +=
                `<div class="portfolio-gallery-item">
                     <img src="${projects[itemsCount * loadMoreClickCount + i].image}" class="portfolio-img">
                      <div class="portfolio-hover">
                         <div class="portfolio-hover-btns-container">
                             <a href='#' class="portfolio-hover-btn"><i class='fas fa-link'></i></a>
                             <a href='#' class="portfolio-hover-btn"><i class='fas fa-search'></i></a>
                         </div>
                         <p class="portfolio-project-title">${projects[itemsCount * loadMoreClickCount + i].title}</p>
                         <p class="portfolio-project-subtitle">${projects[itemsCount * loadMoreClickCount + i].subtitle}</p>
                     </div>
                 </div>`;
        }
    }
    if(document.querySelector('.portfolio-load-more-btn')) {
        document.querySelector('.portfolio-load-more-btn').remove();
    }
    if( projects.length > itemsCount * (loadMoreClickCount + 1) ) {
        if(!document.querySelector('.portfolio-load-more-btn')) {

        }
        const loadMoreButton = document.createElement('button');
        loadMoreButton.classList.add('portfolio-load-more-btn');
        loadMoreButton.innerHTML = '<i class="fas fa-plus portfolio-load-more-icon"></i>Load More';
        portfolioGallery.after(loadMoreButton);
        loadMoreButton.addEventListener( 'click', event => {
            loadMoreClickCount++;
            insertGallery(projects);
        });
    }
};
const showAllProjects = () => {
    let index = 0;
    const lengths = [];
    const allProjectsAsOneArray = [];
    for( let i=0; i< portfolio.length; i++) {
        lengths[i] = portfolio[i].projects.length;
    }
    const maxLength = Math.max(...lengths);
    portfolioGallery.innerHTML = "";
    for( let j=0; j < maxLength; j++ ) {
        for (let i = 0; i < portfolio.length; i++) {
            if(portfolio[i].projects[j]) {
                allProjectsAsOneArray[index] = portfolio[i].projects[j];
                index++;
            }
        }
    }
    insertGallery(allProjectsAsOneArray);
};
showAllProjects();
for (let btn of portfolioButtons) {
    btn.addEventListener('click', (event) => {
        for (let btn of portfolioButtons) {
            btn.classList.remove('portfolio-active-tab');
        }
        event.target.classList.add('portfolio-active-tab');
        const buttonValue = event.target.textContent.toLowerCase();
        if(buttonValue === portfolio[0].category) {
            loadMoreClickCount = 0;
            showAllProjects();
        }
        else {
            loadMoreClickCount = 0;
            portfolioGallery.innerHTML = "";
            const filteredPortfolio = portfolio.find( ({category}) => category === buttonValue );
            insertGallery(filteredPortfolio.projects);
        }
    });
    btn.addEventListener('dblclick', (event) => {
        let buttonValue = event.target.textContent.toLowerCase();
        const filteredPortfolio = portfolio.find( ({category}) => category === buttonValue );
        filteredPortfolio.category = prompt(`Change '${filteredPortfolio.category}' category name: `).toLowerCase();
        event.target.textContent = filteredPortfolio.category;
        console.log(portfolio);
    });
}
/*---------------NEWS---------------*/
const now = new Date();
const newsContainer = document.querySelector('.news-container');
news.forEach((element) => {
    newsContainer.innerHTML += `
        <a href="#" class="news-item">
            <div class="news-image-container"><img src="${element.image}" class="news-image"></div>
            <h3 class="news-title">${element.title}</h3>
            <span class="news-author">${element.author}</span>
            <span class="news-comment-count">${element.commentCount}</span>
            <p class="news-date">
                <span class="news-day">${now.getDate()}</span>
                <span class="news-month">${monthArray[now.getMonth()]}</span>
            </p>
        </a>`;
});
/*---------------SLIDER---------------*/
let indexFeedback = 0;
const feedback = document.querySelector('.slider-feedback-data');
const previousButton = document.querySelector('.slider-nav-prev');
const nextButton = document.querySelector('.slider-nav-next');
const sliderNav = document.querySelector('.slider-nav-items');
for ( let i = 0; i < feedbacks.length; i++){
    sliderNav.innerHTML += `
        <img src="${feedbacks[i].image}" class="slider-nav-img">`;
}
const sliderNavImage = document.querySelectorAll('.slider-nav-img');
const showFeedback = (i) => {
    feedback.innerHTML = `
        <p class="feedback-content">${feedbacks[i].content}</p>
        <p class="user-name">${feedbacks[i].name}</p>
        <p class="user-profession">${feedbacks[i].profession}</p>
        <img src="${feedbacks[i].image}" class="user-image">`;
    sliderNavImage.forEach((element) => {
        element.classList.remove('slider-nav-active');
    });
    sliderNavImage[i].classList.add('slider-nav-active');
};
showFeedback(indexFeedback);
previousButton.addEventListener('click', (event) => {
    indexFeedback--;
    if(indexFeedback < 0) indexFeedback = feedbacks.length - 1;
    showFeedback(indexFeedback);
});
nextButton.addEventListener('click', (event) => {
    indexFeedback++;
    if(indexFeedback === feedbacks.length) indexFeedback = 0;
    showFeedback(indexFeedback);
});
sliderNavImage.forEach((element) => {
    element.addEventListener('click', (event) => {
        for(let i = 0; i < sliderNavImage.length; i++) {
            if(event.target === sliderNavImage[i] ) {
                showFeedback(indexFeedback = i);
            }
        }
    });
});

