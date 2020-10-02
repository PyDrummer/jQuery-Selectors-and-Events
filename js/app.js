'use strict';

//storing all the stuff from Photo constructor
let keyWords = [];

// Drop down menu selector
let $selectEl = $('select');
// Grabbing the id photo-template from HTML section. We will append here.
let $photoTemplate = $('#photo-template');
let $photoContainer = $('#photo-container');

// Constructor to build our instances from .ajax
function Photo(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

// Calling all our data from page-1.json
$.ajax('./data/page-1.json').then(data => {

  data.forEach(photoInfo => {

    let photoObject = new Photo(photoInfo.image_url, photoInfo.title, photoInfo.description, photoInfo.keyword, photoInfo.horns);
    let $newTemplate = $photoTemplate.clone();

    $newTemplate.addClass(photoObject.keyword);
    $newTemplate.find('h2').text(photoObject.title);
    $newTemplate.find('p').text(photoObject.description);
    $newTemplate.find('img').attr({ 'src': photoObject.image_url, 'alt': photoObject.keyword});
    $photoContainer.append($newTemplate);

    if (keyWords.indexOf(photoObject.keyword) == -1) {
      keyWords.push(photoObject.keyword);
      $selectEl.append($('<option></option>').text(photoObject.keyword));
    }
  });
});


$('select').on('change', function(event) {
  //console.log('event target is ', event.target.value);
  let selected = event.target.value;
  //
  $photoContainer.children('#photo-template').hide(); // this works

  keyWords.forEach(index => {
    if(selected === index){
      let $bringBack = $(`.${index}`);
      $bringBack.show();
    }
  });
});
