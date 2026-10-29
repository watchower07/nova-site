// Platforma göre ilgili indirme düğmesini öne alır; App Store bağlantısı yoksa iPhone düğmesini pasif gösterir.
(function () {
  var c = window.NOVA || {};
  var ua = navigator.userAgent || "";
  var platform = /android/i.test(ua) ? "android" : /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && "ontouchend" in document) ? "ios" : "windows";
  ["android", "ios", "windows"].forEach(function (p) {
    var a = document.getElementById("indir-" + p);
    if (!a) return;
    if (c[p]) a.href = c[p]; else { a.classList.add("pasif"); var s = a.querySelector("small"); if (s) s.textContent = "Yakında"; }
    if (p === platform && !document.body.hasAttribute("data-vurgusuz")) { a.classList.add("ana"); a.parentNode.insertBefore(a, a.parentNode.firstChild); }
  });
})();
