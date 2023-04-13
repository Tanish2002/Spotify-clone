import { fetchRequest } from "../api";
import { ENDPOINT, logout } from "../common";


const onProfileClick =(event)=>{
  event.stopPropagation();
  const profileMenu = document.querySelector("#profile-menu");
  profileMenu.classList.toggle("hidden");
  if(!profileMenu.classList.contains("hidden")){
    profileMenu.querySelector("li#logout").addEventListener("click",logout);
  }
}
const loaduserProfile =async()=>{
    const defaultImage = document.querySelector("#default-image");
    const profileButton = document.querySelector("#user-profile-btn");
    const displayNameElement = document.querySelector("#display-name");

    const {display_name: displayName,images} = await fetchRequest(ENDPOINT.userInfo);
   

    if(images?.length){
      defaultImage.classList.add("hidden");
    }else{
        defaultImage.classList.remove("hidden");
    }

    profileButton.addEventListener("click",onProfileClick);
    displayNameElement.textContent= displayName;

}

const loadfeaturedPlaylist = async ()=>{
  const {playlists:{items,}} = await fetchRequest(ENDPOINT.featuredPlaylist);
  const playlistItemsSection = document.querySelector("#featured-playlist-items");
  let playlistItems = ``;
  for(let {name ,description,images}of items){
    const [{url:imageUrl}] = images;
    playlistItems  +=`<section class="rounded p-4 border-solid border-2">
    <img src="${imageUrl}" alt="${name}"/>
    <h2 class="text-sm">${name}</h2>
    <h3 class="text-xs">${description}</h3>
  </section>`
  }
  playlistItemsSection.innerHTML = playlistItems;
}

document.addEventListener("DOMContentLoaded",()=>{
       loaduserProfile();
       loadfeaturedPlaylist();
       document.addEventListener("click",()=>{
        const profileMenu = document.querySelector("#profile-menu")
        if(!profileMenu.classList.contains("hidden")){
            profileMenu.classList.add("hidden")
        }
       })
})

