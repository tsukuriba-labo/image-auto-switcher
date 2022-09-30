function setImageScroll(imageGroups) {
  $(document).ready(function () {
    // 画像スクロール
    $("div.image-gallery").animate({ top: "-34vh" }, 100000);

    // 二枚目以降の画像を非表示
    $(".image-item img:nth-child(n+2)").hide();

    let count = 0;

    imageGroups.forEach(function (v, index) {
      $(
        ".image-item[data-group^='" + v.group + "-" + "'] img:first-child"
      ).each(function (index, elem) {
        var wg = $(elem).parent().attr("data-group");
        var num = wg.split("-")[1];

        var myCount = count;

        setTimeout(function () {
          $(elem).fadeOut(2000);
          $(elem).next().fadeIn(2000);
          if (myCount == count - 1) {
            $("div.image-gallery").stop();
          }
        }, v.interval * num);

        // 合計カウント
        count++;
      });
    });
  });
}

setImageScroll([
  { group: "w", interval: 5000 },
  { group: "h", interval: 10000 },
]);
