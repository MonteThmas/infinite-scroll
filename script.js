// Unsplash API
const count = 10;
const apiKey = 'F_3q1iofdEWOn4z2iewPhUR11OYTghaJUmEQBngyX7Y';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from unsplash API

async function getPhotos() {
    try{
        const response = await fetch(apiUrl); //
        const data = await response.json();
        console.log(data);

    } catch (error) {
        //Catch Error Here
    }
}

//Run getPhotos function

getPhotos();