(function(){
  "use strict";
  var stickyZone = document.querySelector(".sticky-zone");
  function updateStickyOffset(){
    document.documentElement.style.setProperty("--sticky-h", stickyZone.offsetHeight + "px");
  }
  updateStickyOffset();
  function closeAlp(head){
    head.setAttribute("aria-expanded","false");
    var body = head.nextElementSibling;
    if(body){
      body.querySelectorAll(".num-head").forEach(closeNum);
    }
  }
  function closeNum(head){
    head.setAttribute("aria-expanded","false");
    var body = head.nextElementSibling;
    if(body){
      body.querySelectorAll(".alp-head").forEach(closeAlp);
    }
  }
  function closeParen(head){
    head.setAttribute("aria-expanded","false");
    var body = head.nextElementSibling;
    if(body){
      body.querySelectorAll(".num-head").forEach(closeNum);
    }
  }
  function closeItem(head){
    head.setAttribute("aria-expanded","false");
    var body = head.nextElementSibling;
    if(body){
      body.querySelectorAll(".paren-head").forEach(closeParen);
    }
  }
  function closeSection(head){
    head.setAttribute("aria-expanded","false");
    var body = head.nextElementSibling;
    if(body){
      body.querySelectorAll(".item-head").forEach(closeItem);
    }
  }
  function closeChapter(head){
    head.setAttribute("aria-expanded","false");
    var body = head.nextElementSibling;
    if(body){
      body.querySelectorAll(".sec-head").forEach(closeSection);
    }
  }
  function toggleChapter(head){
    var willOpen = head.getAttribute("aria-expanded") !== "true";
    if(willOpen){
      document.querySelectorAll(".ch-head").forEach(closeChapter);
      head.setAttribute("aria-expanded","true");
    }else{
      closeChapter(head);
    }
  }
  function toggleSection(head){
    var willOpen = head.getAttribute("aria-expanded") !== "true";
    if(willOpen){
      var chBody = head.closest(".ch-body");
      if(chBody){
        chBody.querySelectorAll(".sec-head").forEach(closeSection);
      }
      head.setAttribute("aria-expanded","true");
    }else{
      closeSection(head);
    }
  }
  function toggleItem(head){
    var willOpen = head.getAttribute("aria-expanded") !== "true";
    if(willOpen){
      var secBody = head.closest(".sec-body");
      if(secBody){
        secBody.querySelectorAll(".item-head").forEach(closeItem);
      }
      head.setAttribute("aria-expanded","true");
    }else{
      closeItem(head);
    }
  }
  function toggleParen(head){
    var willOpen = head.getAttribute("aria-expanded") !== "true";
    if(willOpen){
      var itemBody = head.closest(".item-body");
      if(itemBody){
        itemBody.querySelectorAll(".paren-head").forEach(closeParen);
      }
      head.setAttribute("aria-expanded","true");
    }else{
      closeParen(head);
    }
  }
  function toggleNum(head){
    var willOpen = head.getAttribute("aria-expanded") !== "true";
    if(willOpen){
      // num は paren の直下だけでなく、alp の内側に入れ子になる場合もあるため、
      // 直近の paren-body または alp-body を「同階層の範囲」として扱う
      var scope = head.closest(".paren-body, .alp-body");
      if(scope){
        scope.querySelectorAll(".num-head").forEach(function(h){
          if(h !== head && h.closest(".paren-body, .alp-body") === scope){
            closeNum(h);
          }
        });
      }
      head.setAttribute("aria-expanded","true");
    }else{
      closeNum(head);
    }
  }
  function toggleAlp(head){
    var willOpen = head.getAttribute("aria-expanded") !== "true";
    if(willOpen){
      var numBody = head.closest(".num-body");
      if(numBody){
        numBody.querySelectorAll(".alp-head").forEach(closeAlp);
      }
      head.setAttribute("aria-expanded","true");
    }else{
      closeAlp(head);
    }
  }
  document.querySelectorAll(".ch-head").forEach(function(btn){
    btn.addEventListener("click", function(){ toggleChapter(btn); });
  });
  document.querySelectorAll(".sec-head").forEach(function(btn){
    btn.addEventListener("click", function(){ toggleSection(btn); });
  });
  document.querySelectorAll(".item-head").forEach(function(btn){
    btn.addEventListener("click", function(){ toggleItem(btn); });
  });
  document.querySelectorAll(".paren-head").forEach(function(btn){
    btn.addEventListener("click", function(){ toggleParen(btn); });
  });
  document.querySelectorAll(".num-head").forEach(function(btn){
    btn.addEventListener("click", function(){ toggleNum(btn); });
  });
  document.querySelectorAll(".alp-head").forEach(function(btn){
    btn.addEventListener("click", function(){ toggleAlp(btn); });
  });
  document.getElementById("expand-all").addEventListener("click", function(){
    document.querySelectorAll(".ch-head,.sec-head,.item-head,.paren-head,.num-head,.alp-head").forEach(function(b){
      b.setAttribute("aria-expanded","true");
    });
  });
  document.getElementById("collapse-all").addEventListener("click", function(){
    document.querySelectorAll(".ch-head").forEach(closeChapter);
  });

  /* ---- パンくずリスト（開いている階層のフルパスを表示） ---- */
  var breadcrumbNav = document.getElementById("breadcrumb");
  var bodySelector = ".ch-body,.sec-body,.item-body,.paren-body,.num-body,.alp-body";
  var allHeads = Array.prototype.slice.call(
    document.querySelectorAll(".ch-head,.sec-head,.item-head,.paren-head,.num-head,.alp-head")
  );
  // 親子関係を初期化時に確定(head の祖先の *-body の直前要素が親 head)
  var parentOf = new Map();
  var childrenOf = new Map();
  var rootHeads = [];
  allHeads.forEach(function(head){
    var body = head.parentElement.closest(bodySelector);
    var parent = body ? body.previousElementSibling : null;
    parentOf.set(head, parent);
    if(parent){
      if(!childrenOf.has(parent)){ childrenOf.set(parent, []); }
      childrenOf.get(parent).push(head);
    }else{
      rootHeads.push(head);
    }
  });
  function isOpen(head){ return head.getAttribute("aria-expanded") === "true"; }
  // 開いている見出しの連鎖を上から一意にたどる。
  // 同一階層で複数開いている場合（「すべて展開」直後等）は一意に定まらないため、そこで打ち切る
  function openChain(){
    var chain = [];
    var candidates = rootHeads;
    while(true){
      var open = candidates.filter(isOpen);
      if(open.length !== 1){ break; }
      chain.push(open[0]);
      candidates = childrenOf.get(open[0]) || [];
    }
    return chain;
  }
  function updateBreadcrumb(){
    var chain = openChain();
    breadcrumbNav.textContent = "";
    chain.forEach(function(target, idx){
      if(idx > 0){
        var sep = document.createElement("span");
        sep.className = "crumb-sep";
        sep.textContent = "›";
        breadcrumbNav.appendChild(sep);
      }
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "crumb";
      btn.textContent = target.textContent;
      btn.addEventListener("click", function(){
        target.scrollIntoView({behavior:"smooth", block:"start"});
      });
      breadcrumbNav.appendChild(btn);
    });
  }
  // 開閉操作（各見出し・すべて展開/折りたたむ）の後に更新。
  // 個別 button のリスナーが先に実行され、document へのバブリングで本処理が走る
  document.addEventListener("click", function(e){
    var btn = e.target.closest ? e.target.closest("button") : null;
    if(!btn || btn.classList.contains("crumb")){ return; }
    updateStickyOffset();
    updateBreadcrumb();
  });
  window.addEventListener("resize", updateStickyOffset);
  window.addEventListener("load", updateStickyOffset);
  updateBreadcrumb();
})();
