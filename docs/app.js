(function () {
  "use strict";
  var root = document.documentElement;
  var T = {
    ru: { title: "CodeSyntax: People Die — gore-песочница для Windows", desc: "CodeSyntax: People Die — gore-песочница с ragdoll-физикой, ловушками, динамической кровью и ботами. Бесплатно для Windows. 18+." },
    en: { title: "CodeSyntax: People Die — gore sandbox for Windows", desc: "CodeSyntax: People Die — gore sandbox with ragdoll physics, traps, dynamic blood and AI bots. Free download for Windows. 18+." }
  };
  var btns = document.querySelectorAll(".lang button");
  var copyBtn = document.getElementById("copy");

  function setLang(l, save) {
    if (l !== "ru" && l !== "en") l = "ru";
    root.lang = l;
    document.title = T[l].title;
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", T[l].desc);
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", btns[i].dataset.lang === l ? "true" : "false");
    }
    if (copyBtn) copyBtn.textContent = copyBtn.getAttribute("data-" + l);
    if (save) { try { localStorage.setItem("lang", l); } catch (e) {} }
  }

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () { setLang(this.dataset.lang, true); });
  }

  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  setLang(stored || ((navigator.language || "").slice(0, 2).toLowerCase() === "ru" ? "ru" : "en"), false);

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var txt = (document.getElementById("sha").textContent || "").trim();
      function done() {
        var l = root.lang;
        copyBtn.textContent = copyBtn.getAttribute("data-ok-" + l);
        copyBtn.classList.add("ok");
        setTimeout(function () { copyBtn.textContent = copyBtn.getAttribute("data-" + root.lang); copyBtn.classList.remove("ok"); }, 1600);
      }
      function fallback() {
        var r = document.createRange();
        r.selectNodeContents(document.getElementById("sha"));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        try { document.execCommand("copy"); done(); } catch (e) {}
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done, fallback);
      } else { fallback(); }
    });
  }
})();
