'use strict';

//storing all the stuff from Photo constructor
let keyWords = [];

let hornAmount = [];

// Drop down menu selector
let $title = $('#title');
let $horns = $('#horns');
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

// This function will render our info to the mustache.
function render(obj) {
  let templateObj = {
    name: obj.title,
    src: obj.image_url,
    keyword: obj.keyword,
    description: obj.description,
    horns: obj.horns,
  };
  let $template = $('#template').html();
  // Populate with data
  let rendered = Mustache.render($template, templateObj);
  $photoContainer.append(rendered);
}
