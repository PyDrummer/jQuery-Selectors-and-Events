'use strict';

//storing all the stuff from Photo constructor
let photoArray = [];

// Constructor to build our instances from .ajax
function Photo(image_url, title, description, keyword, horns) {
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  photoArray.push(this);
}

// Drop down menu selector
let $selectEl = $('select');
let $optionEl = $('option');

// Grabbing the id photo-template from HTML section. We will append here.
let $photoTemplate = $('#photo-template');
let $h2El = $('h2');
let $imgEl = $('img');
let $pEl = $('p');

// Calling all our data from page-1.json
$.ajax('./data/page-1.json').then(data => {
  //console.log(data);
  data.forEach(photoInfo => {
    //console.log(`Photo info is = ${photoInfo}`);
    new Photo(photoInfo.image_url, photoInfo.title, photoInfo.description, photoInfo.keyword, photoInfo.horns);
  });
  //console.log(photoArray);

  photoArray.forEach(photoIndex => {
    let $newOption = $optionEl.clone();
    let $photoH2 = $h2El.clone();
    let $photoImg = $imgEl.clone();
    let $photoP = $pEl.clone();

    // h2 stuff here
    $photoH2.text(photoIndex.title);
    $photoH2.attr('id', photoIndex.horns);
    $photoTemplate.append($photoH2);

    // img stuff here
    $photoImg.attr({ 'src': photoIndex.image_url, 'alt': photoIndex.keyword });
    $photoTemplate.append($photoImg);

    // paragraph stuff here
    $photoP.text(photoIndex.description);
    $photoTemplate.append($photoP);

    // option stuff here
    $newOption.text(photoIndex.keyword);
    $newOption.attr('value', photoIndex.keyword);
    $selectEl.append($newOption);

  });
});

$('select').on('change', function(event) {
  console.log(event.target.value);
  $photoTemplate.hide(); // this works
  photoArray.forEach(index => {
    //console.log(index);
    if(event.target.value === index.keyword){
      console.log('Found ', index.keyword);
      //add a class to the index.keyword
      $imgEl.addClass('clicked');
      $('.clicked').fadeIn(1000);
    }
  });
});
