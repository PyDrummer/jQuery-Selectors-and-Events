'use strict';

console.log('hello world!');
//storing all the stuff from Photo constructor
let keyWords = [];

// Drop down menu selector
let $selectEl = $('select');
// Grabbing the id photo-template from HTML section. We will append here.

// let $photoTemplate = $('#photo-template'); // no longer needed with new mustache template - I think... tbd
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
$.ajax('../data/page-2.json').then((data) => {
  data.forEach((photoInfo) => {
    let photoObject = new Photo(
      photoInfo.image_url,
      photoInfo.title,
      photoInfo.description,
      photoInfo.keyword,
      photoInfo.horns
    );

    render(photoObject);

    //This will fill up the keyWords let global variable
    if (keyWords.indexOf(photoObject.keyword) === -1) {
      keyWords.push(photoObject.keyword);
      $selectEl.append($('<option></option>').text(photoObject.keyword));
    }
  });

  // When the user selects from the dropdown it will remove all imgs then only show the ones with our class.
  $('select').on('change', function (event) {
    let selected = event.target.value;
    let takeAway = $('.photo');
    takeAway.hide();
    keyWords.forEach((index) => {
      if (selected === index) {
        let $bringBack = $(`.${index}`);
        $bringBack.show();
      }
    });
  });
});

// This function will render our info to the mustache.
function render(obj) {
  let templateObj = {
    name: obj.title,
    src: obj.image_url,
    keyword: obj.keyword,
    description: obj.description,
  };
  let $template = $('#template').html();
  // Populate with data
  let rendered = Mustache.render($template, templateObj);
  $photoContainer.append(rendered);
}