'use strict'

// 
// cardlarni joylash uchun funksiya
// 
const funcmovie=(array,box)=>{
  array.forEach((e,i) => {
    var div=document.createElement("div");
    div.className="col-sm-6 col-md-5";
    div.innerHTML=`
      <div class="card" style="width:286px">
        <div class="card-body">
          <div class="card_pic d-flex align-items-center">
            <img srcset="${e.smallThumbnail} 1x, ${e.bigThumbnail} 2x" class="card-img-top" alt="${e.title}">
          </div>
          <h3 class="card-title height">${e.title}</h3>
          <p class=""><img src="/img/calendar.png" alt="" class="icon_cale"> ${e.year}</p>
          <p><img src="/img/star.jpg" alt="star" class="icon_star"> ${e.imdbRating}</p>
          <p>${e.language}</p>
          <div class="row gap-2 px-3 justify-content-around">
            <a href="https://www.youtube.com/watch?v=${e.youtubeId}" class="col-6 btn btn-outline-primary" target="_blank">Watch trailer</a>
            <button class="col-5 btn btn-outline-success" id="bookmark">Bookmark</button>
            <button class="col-5 btn btn-outline-info" id="info">More info</button>
          </div>
        </div>
      </div>`;
  box.appendChild(div);
  });
  
}


// 
// BARCHA CARDLARNI JOYLASH
// 
var frame=document.querySelector(".frame");
funcmovie(movies,frame);


// 
// MORE INFO BUTTONS
// 
const info=document.querySelectorAll("#info");
info.forEach((e,i,m)=>{
  e.addEventListener("click",()=>{
    alert(`${movies[i].summary}`);
  })
})


// 





const count=document.querySelector(".searchCont");

const movietitle=document.querySelector(".movies-title");
movietitle.addEventListener("input",()=>{
  if(movietitle.value==""){
    frame.innerHTML="";
    funcmovie(movies,frame);
    count.textContent=`${movies.length}`;
  }
  else{
  let mass=movies.filter(item=>(item.title.toLowerCase().search(`${movietitle.value.toLowerCase()}`))>=0);
  frame.innerHTML="";
  funcmovie(mass,frame);
  count.textContent=`${mass.length}`;
  }
})


const movierating=document.querySelector("#movies-reting");
movierating.addEventListener("input",()=>{
  if(movierating.value==""){
    frame.innerHTML="";
    funcmovie(movies,frame);
    count.textContent=`${movies.length}`;
  }
  else{
  let mass=movies.filter(item=> Math.floor(item.imdbRating)==movierating.value);
  frame.innerHTML="";
  funcmovie(mass,frame);
  count.textContent=`${mass.length}`;
  }
})

const moviecatigorie=document.querySelector("#movies-catigories");
moviecatigorie.addEventListener("input",()=>{
  if(moviecatigorie.value!="All"){
    let mass=movies.filter(item=>{
      let n=0;
      item.categories.forEach( e => (e==moviecatigorie.value) ? n=1:0)
      if(n==1)return item;
    });
    frame.innerHTML="";
    funcmovie(mass,frame);
    count.textContent=`${mass.length}`;
  }
  else{
    frame.innerHTML="";
    funcmovie(movies,frame);
    count.textContent=`${movies.length}`;
  }
})


const btn=document.querySelector("#btn_search");
btn.addEventListener("click",()=>{
  if(movierating.value=="" && moviecatigorie.value=="All" && movietitle.value==""){
    frame.innerHTML="";
    funcmovie(movies,frame);
    count.textContent=`${movies.length}`;
  }
  else{
  let mass=movies.filter((item)=>{
    let n=0;
    item.categories.forEach( e => (e==moviecatigorie.value) ? n=1:0);
    if((item.title.toLowerCase().search(`${movietitle.value.toLowerCase()}`))>=0 && Math.floor(item.imdbRating)==movierating.value && n==1){
      console.log(item);
      return item;
    }
  })
  frame.innerHTML="";
  funcmovie(mass,frame);
  count.textContent=`${mass.length}`;
}
})

// 
// BOOKMARK CREATE QILISH
// 
const bookmark=document.querySelectorAll("#bookmark");
const frameB=document.querySelector(".frame_bookmark");
bookmark.forEach((e,i,m)=>{
  e.addEventListener("click",()=>{
    let frameDiv=document.createElement("div");
    frameDiv.setAttribute("class","p-2 border-bottom");
    frameDiv.innerHTML=`<p>${movies[i].title}</p>
    <button class="btn btn-danger">Ramove</button>`
    frameB.appendChild(frameDiv)
  })
})