import { Component } from "react";

export default class Post extends Component{
    constructor(){

    }

    constructor(userID, imageSource, postText, comments, timeStamp){
        this.userID = userID;
        this.imageSource = imageSource;
        this.postText = postText;
        this.comments = comments;
        this.timeStamp = timeStamp;
    }

    CreatePost(params) {
        
    }

    Delete(params) {

    }

    Edit(params) {

    }

    GoToProfile(params) {

    }
}