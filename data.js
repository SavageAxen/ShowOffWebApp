  headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer yZN88feF-xNfFtPdyg33'
  }

async function getData(){
  await fetch('https://the-one-api.dev/v2/book')
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      return response.json();
    }).then(data => {
      console.log(data.docs);
      const books = data.docs
      .map(book => {
        return `
          <div class="item">
            <div>
                <img class="bcover" src="" height="200px">
            </div>
            <div id="bdetails"> 
              <h3 id="bookname">
                <p>${book.name}</p>
              </h3>
            </div>
            </div>`;
      }).join("");
      document.querySelector("#booklist").innerHTML = books;
    }).catch(error => {
      console.log(error);
    });
  
    await fetch('https://the-one-api.dev/v2/movie',{headers: headers})
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
      return response.json();
    }).then(data => {
      console.log(data.docs);
      const movies = data.docs
      .map(movie => {
        return `
          <div class="item">
            <div>
                <img class="mcover" src="" height="200px">
            </div>
            <div id="mdetails"> 
              <h3 id="moviename">
                <p>${movie.name}</p>
              </h3>
            </div>
            </div>`;
      }).join("");
      document.querySelector("#movielist").insertAdjacentHTML("afterbegin", movies);
    }).catch(error => {
      console.log(error);
    });
  
  }

getData();

async function quotes (){
    const rawQuotes=await fetch('https://the-one-api.dev/v2/quote',{headers: headers})
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok')
      }
        return response.json();
      }).catch(error => {
      console.log(error);
    });
    const quote = rawQuotes.docs[Math.floor(Math.random() * rawQuotes.docs.length)];
    const rawCharacters=await fetch('https://the-one-api.dev/v2/character?_id=' + quote.character, { headers: headers })
    const characters = await rawCharacters.json();
    const character = characters.docs[0];
    const rawMovies=await fetch('https://the-one-api.dev/v2/movie?_id=' + quote.movie, { headers: headers })
    const movies = await rawMovies.json();
    const movie = movies.docs[0];
    document.querySelector("#blockq").innerHTML= 
      `<div class="quotes">
        <blockquote>${quote.dialog}</blockquote>
        <cite>- ${character.name}</cite>
        <cite>- ${movie.name}</cite>
      </div>`;
}
quotes();

 function loadBookCovers(){
   console.log("loadBookCovers");
  let books= document.getElementsByClassName("bcover")
    if (books.length){
    for(let i=0;i<=books.length;i++){
      console.log(books.length);
      books.item(i).src="images/book_"+i.toString(10)+"_1.jpg";
    };
  } else
  {
    setTimeout(loadBookCovers, 3000);
  }
}
loadBookCovers();
function loadMovieCovers(){
  console.log("loadMovieCovers");
  let movies=document.getElementsByClassName("mcover")
  if (movies.length){
    for(let i=0;i<=movies.length;i++){
      console.log(movies.length);
      movies.item(i).src="images/movie_"+i.toString(10)+"_1.jpg";
    };
  } else
  {
    setTimeout(loadMovieCovers, 3000);
  }
  
}
loadMovieCovers();