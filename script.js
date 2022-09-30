$(document).ready(function () {
  $("div.image-gallery").animate({ top: "-34vh" }, 100000);

  $(".image-item img:nth-child(n+2)").hide();

  $(".image-item[data-group^='w-'] img:first-child").each(function (
    index,
    elem
  ) {
    var interval_w = 5000;
    var _elem = $(".image-item[data-group^='w-'] img:first-child").eq(index);
    var wg = $(_elem).parent().attr("data-group");

    var num = wg.split("-")[1];

    setTimeout(function () {
      $(_elem).fadeOut(2000);
      $(_elem).next().fadeIn(2000);
      $(_elem).appendTo($(_elem).parent().get(0));

      if (num == "3") {
        $("div.image-gallery").stop();
      }
    }, interval_w * num);
  });
});
