'use strict';

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
    //console.log(selected);
    let takeAway = $('.photo');
    takeAway.hide();
    keyWords.forEach((index) => {
      if (selected === index) {
        let $bringBack = $(`.${index}`);
        $bringBack.show();
      }
      if (selected === 'default') {
        takeAway.show();
      }
    });
    // if (selected === all)
  });
});
