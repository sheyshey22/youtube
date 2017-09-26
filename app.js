"use strict";
const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

let app = {
   result: {
      videos: [],
      selectedVideo: null,
      searchTerm: "iPhone X"
   },
   init: function() {
      app.youtubeSearch("iPhone X");
      app.search();
   },
   search: function () {
      $('#search').keyup(function(e) {
         if(e.which == 13) {
            $("#root").empty();
            $('#videoPlay').empty();
            app.youtubeSearch($('#search').val());
         }
      });
      },
   getVideoList: function(videos) {
      return videos.map((video, index) => {
         const imageUrl = video.snippet.thumbnails.default.url;
         const url = `https://www.youtube.com/embed/${video.id.videoId}`;
         return `
         <li>
            <div class="media">
              <div class="media-left">
                <a href="#">
                  <img class="media-object" src=${imageUrl} />
                </a>
              </div>
                  <div class="media-body">
                  <p class="media-heading">${video.snippet.title}</p>
                  <span>${video.snippet.channelId}</span>
                  <span>123.343.56 visualizaciones</span>
               </div>
            </div>
         </li>`;
      });
   },
   showVideo: function (video){
            const url = `http://www.youtube.com/embed/${video.id.videoId}`;
            return `<iframe class="embed-responsive-item" src=${url}> </iframe>`;
      },
   youtubeSearch: function(searchTerm) {
      console.log(searchTerm);

      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         app.result = {
            videos: data,
            selectedVideo: data[0],
            searchTerm: searchTerm
         };
         var list = app.getVideoList(app.result.videos);
         var contenedor = app.showVideo(app.result.selectedVideo);
         console.log("lis: ", list);
         $("#root").append(list);
         $('#videoPlay').append(contenedor)
      });
   },
   videoSearch: function(searchTerm) {
      jQuery.getJSON("list.json", data => {
         console.log("result", data.items);
         app.result = {
            videos: data.items,
            selectedVideo: data.items[0],
            searchTerm: searchTerm
         };
         var list = app.getVideoList(app.result.videos);
         console.log("lis: ", list);
         $("#root").append(list);
      });
   }
};
$(document).ready(app.init());