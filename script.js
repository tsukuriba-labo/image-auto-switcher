$(document).ready(function () {
  //   $("div.image-gallery").animate({ top: "-34vh" }, 100000);

  $(".image-item img:nth-child(n+2)").hide();

  $(".image-item img:first-child").each(function (index, elem) {
    var interval = randomIntFromInterval(300, 1000) * 20;
    setInterval(function () {
      var _elem = $(".image-item img:first-child").eq(index);
      $(_elem).fadeOut(2000);
      $(_elem).next().fadeIn(2000);
      $(_elem).appendTo($(_elem).parent().get(0));
    }, interval);
  });
});

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
