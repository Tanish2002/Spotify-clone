import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const APP_URL = import.meta.env.VITE_APP_URL;
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";


const authorizeUser =()=>{
const params = new URLSearchParams();
params.append("client_id", CLIENT_ID);
params.append("response_type", "code");
params.append("redirect_uri", REDIRECT_URI);
params.append("scope", scopes);
params.append("show_dialog", true);
// const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
console.log((url));
window.open(url,"login","width=800,height=600");
};
document.addEventListener("DOMContentLoaded",()=>{

    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click",authorizeUser);
})

window.setItemsInlocalStorage = ({accessToken,tokenType,expiresIn})=>{
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(EXPIRES_IN, expiresIn);
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
}

window.addEventListener("load",()=>{

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(accessToken){
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
    }

    if(window.opener !==null && !window.opener.closed){
        window.focus();
        if(window.location.href.includes("error")){
            window.close();
        }
        const {hash} = window.location;
        const searchParams = new URLSearchParams(hash);
        const accessToken = searchParams.get("#access_token");
        const tokenType =  searchParams.get("token_type");
        const expiresIn = searchParams.get("expires_in");

        if(accessToken){
            window.close();
            window.opener.setItemsInlocalStorage({accessToken , tokenType , expiresIn});
          
        }else{
            window.close();
        }

        // #access_token=BQB_h6WqP7tsRAOI0Z3x_kMYSw0-l-MLO-94npY13V3NYw-7Ygb3yQyYC7E0A9waQ6VhCnZrsDg433-aWw3054zm6_cXwE_nQd5EE99Hhz7Si8I9XPyuA8PXUSafKLirenxb32QSkyVZ9_APWhzePdg3PDZF5RYWNB2DOSoTgmZONUNwrKpHeA8WTTVs21lZ5TjrKft7Xyd6Uwi82MOlM8XBeURIhT3wjtpA2p4&token_type=Bearer&expires_in=3600
    }
})