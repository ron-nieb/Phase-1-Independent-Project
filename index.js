
// replace with your own Unsplash API access key
const ACCESS_KEY = 'LbC4DJI24jq3xMS0uJagmQX_b_7apVmKxJNLIzqSM8Q';

// search term for photos
const query = 'wallpaper';

// number of photos to fetch
const count = 12;

// API endpoint for searching photos
const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&orientation=portrait&client_id=${ACCESS_KEY}`;

const url2 = `https://api.unsplash.com/search/photos?query=${query}&per_page=${count}&orientation=landscape&client_id=${ACCESS_KEY}`;




const photogrid = document.querySelector('.photogrid');
const landscapephotogrid = document.querySelector('.landscapephotogrid')

async function getPhotos() {
  try {
    const response = await fetch(url);
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    const data = await response.json();
    //from json to an array
    const photos = data.results;
    const landscapephotos = data2.results

    // iterate over each photo and create an image element to display 
    photos.forEach(photo => {
      const div = document.createElement('div');
      div.className = 'col-md-3 card';

      const img = document.createElement('img');
      img.src = photo.urls.regular;
      img.alt = photo.alt_description;
      img.id ='gridimg';
      img.className ='img-fluid ';
     
       
      div.appendChild(img)
      photogrid.appendChild(div);
    });
    if (landscapephotos){
        landscapephotos.forEach(photo => {
            const div = document.createElement('div');
            div.className = 'col-md-4';
    
            const img = document.createElement('img');
            img.src = photo.urls.regular;
            img.alt = photo.alt_description;
            img.id ='gridimg';
            img.className ='img-fluid';
        
            
            div.appendChild(img)
            landscapephotogrid.appendChild(div);
        });
    }
        

    else{
        console.error(error)
    }


  } catch (error) {
    console.error(error);
  }
}
//function call 
getPhotos();

// navigation bar search form 

const container = document.querySelector('.searchresults');
const form = document.getElementById('search-form');

async function getSearchPhotos(query, count) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${7}&client_id=${ACCESS_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const photos = data.results;
    container.innerHTML = ''; // clear the previous search results
    // create a div for each photo and add it to the container
    photos.forEach(photo => {
      const div = document.createElement('div');
      div.className = 'searchphoto col-md-3';
      const img = document.createElement('img');
      img.src = photo.urls.regular;
      img.alt = photo.alt_description;
      img.className='img-fluid'
      div.appendChild(img);
      container.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener('submit', event => {
    event.preventDefault(); // prevent form submission
    const query = form.elements['search-input'].value;
    const count = 10;
    getSearchPhotos(query, count);
  });