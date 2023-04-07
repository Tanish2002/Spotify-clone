const CLIENT_ID = "0867525dd3864dceb604b5ad34c2ff02";
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";
const REDIRECT_URI = "http://localhost:3000/login/login.html";
const ACCESS_TOKEN_KEY = "accessToken";
const APP_URL = "http://localhost:3000";


const authorizeUser =()=>{
const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
window.open(url,"login","width=800,height=600");
};
document.addEventListener("DOMContentLoaded",()=>{

    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click",authorizeUser);
})

window.setItemsInlocalStorage = ({accessToken,tokenType,expiresIn})=>{
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("tokenType", tokenType);
    localStorage.setItem("expiresIn", expiresIn);
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
}

window.addEventListener("load",()=>{

    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
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