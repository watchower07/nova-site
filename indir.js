// Platforma göre ilgili indirme düğmesini öne alır; bağlantısı olmayan düğmeyi "Yakında" diye pasif gösterir.
// Son sürüm bağlantıları indir.novaart3d.com/son.js'den (yayın betiği yazar) okunur; okunamazsa yapilandirma.js geçerlidir.
(function () {
  var c = window.NOVA || {};
  var ua = navigator.userAgent || "";
  var platform = /android/i.test(ua) ? "android" : /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && "ontouchend" in document) ? "ios" : "windows";

  function uygula(k, ilk) {
    ["android", "ios", "windows"].forEach(function (p) {
      var a = document.getElementById("indir-" + p);
      if (!a) return;
      var s = a.querySelector("small");
      if (s && !s.hasAttribute("data-ilk")) s.setAttribute("data-ilk", s.textContent);
      if (k[p]) {
        a.href = k[p];
        a.classList.remove("pasif");
        var v = /(\d+\.\d+\.\d+)/.exec(k[p]);   // sürüm bağlantının kendisinden: eski APK yeni sürüm diye görünmesin
        if (s) s.textContent = s.getAttribute("data-ilk") + (v ? " · " + v[1] : "");
      } else {
        a.removeAttribute("href");
        a.classList.add("pasif");
        if (s) s.textContent = "Yakında";
      }
      if (ilk && p === platform && !document.body.hasAttribute("data-vurgusuz")) {
        a.classList.add("ana");
        a.parentNode.insertBefore(a, a.parentNode.firstChild);
      }
    });
  }

  uygula(c, true);

  if (c.sonSurumAdresi) {
    var js = document.createElement("script");
    js.src = c.sonSurumAdresi + "?k=" + Date.now();   // önbellekteki eski sürüm gelmesin
    js.onload = function () {
      var son = window.NOVA_SON;
      if (!son || !son.surum) return;
      uygula({ android: son.android || c.android, ios: c.ios, windows: son.windows || c.windows }, false);
    };
    document.head.appendChild(js);
  }
})();
