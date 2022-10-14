/**
 * 画像スイッチ付きのスクロールをセットアップ
 *
 * @param {*} imageGroups
 */
function setImageScroll(
  imageGroups,
  _duration,
  _mobileDuration,
  breakPoint = "(min-width: 768px)"
) {
  var duration = _mobileDuration;

  if (window.matchMedia(breakPoint).matches) {
    duration = _duration;
  }

  // イメージギャラリ
  var imggl1, imggl2;

  function _setupScroll() {
    // 画像スクロール
    imggl1 = $(".image-gallery").eq(0);
    imggl2 = $(".image-gallery").eq(1);

    imggl1.stop(false, false);
    imggl1.animate({ top: -1 * imggl1.height() - 10 }, duration, "linear");

    imggl2.stop(false, false);
    imggl2.css({ top: imggl1.position().top + imggl1.outerHeight(true) - 15 });
    imggl2.animate({ top: -10 }, duration, "linear");
  }

  $(document).ready(function () {
    // 二枚目以降の画像を非表示
    $(".image-item img:nth-child(n+2)").hide();

    // イメージギャラリーを下にコピー
    $(".image-gallery").clone(true).appendTo("div#container");

    // 無限スクロール設定
    _setupScroll();

    setInterval(() => {
      var bottom = imggl1.position().top + imggl1.outerHeight(true);

      if (bottom < 0) {
        // 上のイメージギャラリを下に移動
        imggl1.appendTo("div#container");

        // 無限スクロール設定
        _setupScroll();
      }
    }, 2000);

    // 画像切り替え設定
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
setImageScroll(
  [
    { group: "w", interval: 5000 },
    { group: "h", interval: 10000 },
  ],
  50000,
  300000
);
