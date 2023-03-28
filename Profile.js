import { Component } from "react";
export default class Profile extends Component{
    constructor(){

    }
    // add user prop
    constructor(bioText, username, posts){
        this.bioText = bioText;
        this.username = username;
        this.posts = posts;
    }

    GetUserPosts(){
        
    }
}