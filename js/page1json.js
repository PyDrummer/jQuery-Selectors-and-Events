'use strict';

// Calling all our data from page-1.json
$.ajax('./data/page-1.json').then((data) => {
  data.forEach((photoInfo) => {
    let photoObject = new Photo(
      photoInfo.image_url,
      photoInfo.title,
      photoInfo.description,
      photoInfo.keyword,
      photoInfo.horns
    );

    render(photoObject);

    if (hornAmount.indexOf(photoObject.horns) === -1) {
      hornAmount.push(photoObject.horns);

      // SET UP A BUTTON For the sorting
      // $horns.append($('<option></option>').text(photoObject.horns));
    }
    //This will fill up the keyWords let global variable
    if (keyWords.indexOf(photoObject.keyword) === -1) {
      keyWords.push(photoObject.keyword);
      $title.append($('<option></option>').text(photoObject.keyword));
    }
  });

  // When the user selects from the dropdown it will remove all imgs then only show the ones with our class.
  $('#title').on('change', function (event) {
    let selected = event.target.value;
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
  });

  // We left off here. STOP FILTERING HORNS- Start sorting them ;)

  // $('#horns').on('change', function (event) {
  //   let selected = event.target.value;
  //   console.log(selected);
  //   let takeAway = $('.photo');
  //   takeAway.hide();
  //   hornAmount.forEach((index) => {
  //     if (selected === index) {
  //       // console.log('index is -', index);
  //       let $bringBack = $(`.${index}`);
  //       console.log($bringBack);
  //       $bringBack.show();
  //     }
  //     if (selected === 'default') {
  //       takeAway.show();
  //     }
  //   });
  // });
});
