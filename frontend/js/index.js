const api_url = "https://anapioficeandfire.com/api/books";

let all_books = [];      



// Defining async function
async function getbooks(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    // if (response) {
    //     hideloader();
    // }
    all_books = data;
    show(data);
}

// Calling that async function
getbooks(api_url);

function show(arrayData) {
    let data1 = [arrayData[0], arrayData[1], arrayData[2]];
    let data2 = [arrayData[3], arrayData[4], arrayData[5]];
    let data3 = [arrayData[6], arrayData[7], arrayData[8]];

    let list1 = document.getElementById('books-category-list-1');
    let list2 = document.getElementById('books-category-list-2');
    let list3 = document.getElementById('books-category-list-3');

    for(data of data1) {
        list1.innerHTML += `<div class="card")">
        <div class="inner">
          <script>                    
            let favbuttonp = document.getElementById('favbutton');
            favbuttonp.addEventListener('click', () => { console.log('clicked'); alert('Clicked') });
          </script>
          <h2 class="title" id="book-title"><span>${data.name}</span></h2>
          <p id="book-number-of-pages">Number of pages: <span style="font-weight: bold;">${data.numberOfPages}</span></p>
          <p id="book-author">Author: <span style="font-weight: bold;">${data.authors[0]}</span></p>
          <p id="book-publisher">Publisher: <span style="font-weight: bold;">${data.publisher}</span></p>
          <p id="book-country">Country: <span style="font-weight: bold;">${data.country}</span></p>

          <time class="subtitle">Released <span style="font-weight: bold">${new Date(data.released).toDateString()}</span><time>
          <p></p>
          <i id="favbutton${arrayData.indexOf(data)}" class="fa fa-heart" style="margin-left: 12px; font-size:22px;color:gray;"></i>
        </div>
      </div>`;
    }
    for(data of data2) {
        list2.innerHTML += `<div class="card")">
        <div class="inner">
          <h2 class="title" id="book-title"><span>${data.name}</span></h2>
          <p id="book-number-of-pages">Number of pages: <span style="font-weight: bold;">${data.numberOfPages}</span></p>
          <p id="book-author">Author: <span style="font-weight: bold;">${data.authors[0]}</span></p>
          <p id="book-publisher">Publisher: <span style="font-weight: bold;">${data.publisher}</span></p>
          <p id="book-country">Country: <span style="font-weight: bold;">${data.country}</span></p>

          <time class="subtitle">Released <span style="font-weight: bold">${new Date(data.released).toDateString()}</span><time>
          <p></p>
          <i id="favbutton${arrayData.indexOf(data)}" class="fa fa-heart" style="margin-left: 12px; font-size:22px;color:gray;"></i>

        </div>
      </div>`;
    }
    for(data of data3) {
        list3.innerHTML += `<div class="card")">
        <div class="inner">
          <h2 class="title" id="book-title"><span>${data.name}</span></h2>
          <p id="book-number-of-pages">Number of pages: <span style="font-weight: bold;">${data.numberOfPages}</span></p>
          <p id="book-author">Author: <span style="font-weight: bold;">${data.authors[0]}</span></p>
          <p id="book-publisher">Publisher: <span style="font-weight: bold;">${data.publisher}</span></p>
          <p id="book-country">Country: <span style="font-weight: bold;">${data.country}</span></p>

          <time class="subtitle">Released <span style="font-weight: bold">${new Date(data.released).toDateString()}</span><time>
          <p></p>
          <i id="favbutton${arrayData.indexOf(data)}" class="fa fa-heart" style="margin-left: 12px; font-size:22px;color:gray;"></i>
        </div>
      </div>`;
    }
}



if (document.readyState !== 'loading') {
  (async () => {
    const response = await fetch('http://localhost:3000/likes');
    const data = await response.json();
  
    console.log("Get DOMContentLoaded request response is ", data);
    for(like of data) {
      console.log("like: ", like, "liked: ", like.id);
      if(like.liked == true) {
        document.getElementById(`favbutton${like.id}`).style.color = 'red';
      }
    }

  })();
} else {
  document.addEventListener('DOMContentLoaded', function () {
      
  });
}

document.addEventListener('click', async function(e){

  if(e.target && e.target.id.toString().includes('favbutton')) {
    let id = e.target && e.target.id;
    let selected = id.slice(-1);
    console.log("Id: ", id, '\n', "Selected: ", selected);

    let selectedbook = all_books[selected];

    console.log(selectedbook);

    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;
        const response = await fetch(`http://localhost:3000/likes/${selected}`);
        var data = await response.json();

        (async () => {
          const rawResponse = await fetch(`http://localhost:3000/likes/${selected}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ liked: !data.liked })
          });
          const content = await rawResponse.json();
        
          if(data.liked) { 
            document.getElementById(`favbutton${selected}`).style.color = 'gray';
            showMessage(`You have removed "${selectedbook.name}" from favorites`)
          } else { 
            document.getElementById(`favbutton${selected}`).style.color = 'red';
            showMessage(`You have successfully added "${selectedbook.name}" to favorites`)
          }

        })();

        
   }
});


document.querySelector('#subscribeForm').addEventListener('submit', function() {
  event.preventDefault()
  console.log("submitted email address: ", this.elements.email.value);
  (async () => {
    await fetch(`http://localhost:3000/subscribers?email=${this.elements.email.value}`).then(async (response) => {
      let data = await response.json();
      if(data.length) {
        showMessage("You have already subscribed.")
      } else {
        (async () => {
          await fetch('http://localhost:3000/subscribers', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.elements.email.value })
          }).then(async (response) => {
            showMessage("You have successfully subscribed to our newsletter. Thanks!")
          }).catch((error) => {
            showMessage('An error has occured while trying to subscribe your email address. Please try again later.', "error");
          })
      
        })();
      }
    })
  })();
  
});



function showMessage(message, type="message") {
  document.getElementById("message-text").innerHTML = message;
  if(type=="error") { document.getElementById("myMessageForm").style.borderColor="red"; document.getElementById("message-text").style.color = "red"; };
  document.getElementById("myMessageForm").style.display = "block";
}

function closeMessageBox() {
  document.getElementById("myMessageForm").style.display = "none";
}