import { fetchRequest } from "../api";
import { ENDPOINT, logout } from "../common";


const onProfileClick =(event)=>{
  event.stopPropogation();
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

    profileButton.addEventListener("click",onProfileClick)
    displayNameElement.textContent= displayName;

}

const loadfeaturedPlaylist = async ()=>{
  const featuredPlaylist = await fetchRequest(ENDPOINT.userInfo);
  console.log(featuredPlaylist);
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

