const imageContainer = document.getElementById('image-container');
const imageWrapper = document.getElementById('image-wrapper')
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count = 10;
const apiKey = 'ES0nkF4GtFbydmFy3g4xV6Nmsjyx84EOKThva4QbbNc';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden=true;
    }
}

//Helper Function to set Attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }

}


//create Elements for links and photos , Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Event listener , check when each image is finished loading
        img.addEventListener('load', imageLoaded)
        
        // Put <img> inside <a>, then added both inside imageContainer elem
        item.appendChild(img);
        imageWrapper.appendChild(item);
        imageContainer.appendChild(imageWrapper);
    });
}

//Get photos from unsplash API

async function getPhotos() {
    try{
        const response = await fetch(apiUrl); //
        photosArray = await response.json();
        displayPhotos();
        

    } catch (error) {
        //Catch Error Here
    }
}

//check to see if scrolling near bottom of page , load more images
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ) {
        ready = false;
        getPhotos();
       
    }
})


//Run getPhotos function

getPhotos();