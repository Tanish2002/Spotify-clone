import { fetchRequest } from "../api";
import { ENDPOINT } from "../common";

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
    displayNameElement.textContent= displayName;

}

document.addEventListener("DOMContentLoaded",()=>{
       loaduserProfile();
})

