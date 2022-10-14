/**
 * 画像スイッチ付きのスクロールをセットアップ
 *
 * @param {*} imageGroups
 */
function setImageScroll(imageGroups) {
  $(document).ready(function () {
    // $("html,body").animate({ scrollTop: 0 }, 1);
    const duration = 50000;
    $(".image-gallery").clone(true).appendTo("div#container");

    // 画像スクロール
    var imggl1 = $(".image-gallery").eq(0);
    var imggl2 = $(".image-gallery").eq(1);
    imggl1.animate({ top: -1 * imggl1.height() - 10 }, duration, "linear");

    // 二枚目以降の画像を非表示
    $(".image-item img:nth-child(n+2)").hide();

    // イメージギャラリーを下にコピー
    imggl2.css({ top: imggl1.position().top + imggl1.outerHeight(true) - 15 });
    imggl2.animate({ top: -10 }, duration, "linear");

    setInterval(() => {
      var _imggl1 = $(".image-gallery").eq(0);
      var _imggl2 = $(".image-gallery").eq(1);
      var bottom = _imggl1.position().top + _imggl1.outerHeight(true);

      if (bottom < 0) {
        _imggl1.appendTo("div#container");
        _imggl1 = $(".image-gallery").eq(0);
        _imggl2 = $(".image-gallery").eq(1);

        _imggl1.stop(false, false);
        _imggl1.animate(
          { top: -1 * _imggl1.height() - 10 },
          duration,
          "linear"
        );

        _imggl2.stop(false, false);
        _imggl2.css({
          top: _imggl1.position().top + _imggl1.outerHeight(true) - 15,
        });
        _imggl2.animate({ top: -10 }, duration, "linear");
      }
    }, 2000);

    imageGroups.forEach(function (v, index) {
      $(".image-item[data-group^='" + v.group + "-" + "']").each(
        (index, elem) => {
          var wg = $(elem).attr("data-group");
          var num = wg.split("-")[1];

          setInterval(() => {
            var imgs = $(elem).children();
            if (imgs.length > 1) {
              var img = $(elem).children(" img:first-child")[0];
              $(img).fadeOut(2000);
              $(img).next().fadeIn(2000);
              $(img).appendTo($(elem));
            }
          }, v.interval * num);
        }
      );
    });
  });
}
// 画像スイッチ付きのスクロールをセットアップ
// w-1, w-2, w-3,... のグループは5秒間隔で順に切り替わります。
// h-1, h-2, h-3,... のグループは10秒間隔で順に切り替わります。
setImageScroll([
  { group: "w", interval: 5000 },
  { group: "h", interval: 10000 },
]);
