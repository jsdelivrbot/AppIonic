/**
 * Created by duran on 01/02/2016.
 */
function checkItem(element) {
  var father = $(element).parent();
  var value = $(element).val();
  var validWord = $(element).attr('id');
  if (value !== "") {
    father.css('border-bottom', 'none');
    if (value === validWord) {
      /**Attenzione Case sensitive impl*/
      $(element).remove();
      father.append("<h2 style=\"color:#00A000 \">" + value + "</h2>");
    } else {
      $(element).css('color', 'red');
    }
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
