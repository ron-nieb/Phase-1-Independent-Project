
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

async function getSearchPhotos(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${7}&client_id=${ACCESS_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const photos = data.results;
    container.innerHTML = ''; // clear the previous search results
    container.style.display = 'flex';
    

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

    // create a cancel button to close the container
    const cancelButton = document.createElement('span');
    cancelButton.id = 'cancel-button';
    const img = document.createElement('img');
    img.src = "https://img.icons8.com/ios/50/000000/xbox-x.png";
    img.alt = 'Cancel';
    img.className='img-fluid'
    cancelButton.appendChild(img);
    container.appendChild(cancelButton)


    // Event listener
    cancelButton.addEventListener('click', () => {
      container.style.display = 'none';
    });
  } catch (error) {
    console.error(error);
  }
}

const contactform = document.querySelector('contactform')

contactform.addEventListener('submit', event => {
    event.preventDefault(); // prevent form submission
    const query = form.elements['search-input'].value;
    const count = 10;
    getSearchPhotos(query, count);
  });



  form.addEventListener('submit', event => {
    // Get the form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Create a new contact object
    const contact = {
      name: name,
      email: email,
      message: message
    };
    
    // Send the contact object to the server using the Fetch API
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Clear the form fields on successful submission
      document.getElementById("name").value = '';
      document.getElementById("email").value = '';
      document.getElementById("message").value = '';
      // Show a success message to the user
      alert('Your message has been sent!');
    })
    .catch(error => {
      console.error('There was a problem submitting the form:', error);
      alert('There was a problem submitting your message. Please try again later.');
    });
  })
  