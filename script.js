$(function () {
  // ハンバーガーボタンクリックで実行
  $(".drawer__button").click(function () {
    $(this).toggleClass("active");
    $(".drawer__nav").toggleClass("active");
  });

  $(".drawer__nav__link").click(function () {
    $(".drawer__button").removeClass("active");
    $(".drawer__nav").removeClass("active");
  });

  // ページ内スクロール
  $('a[href^="#"]').click(function () {
    const speed = 400;
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);
    let position = target.offset().top;
    $("body,html").animate({ scrollTop: position }, speed, "swing");
    return false;
  });
  // function
});

$(function(){
  
  //カーソル要素の指定
  var cursor=$("#cursor");
  //ちょっと遅れてついてくるストーカー要素の指定  
  var stalker=$("#stalker");
  
  //mousemoveイベントでカーソル要素を移動させる
  $(document).on("mousemove",function(e){
    //カーソルの座標位置を取得
    var x=e.clientX;
    var y=e.clientY;
    //カーソル要素のcssを書き換える用
    cursor.css({
      "opacity":"0.9",
      "top":y+"px",
      "left":x+"px"
    });
    //ストーカー要素のcssを書き換える用    
    setTimeout(function(){
      stalker.css({
        "opacity":"1",
        "top":y+"px",
        "left":x+"px"
      });
    },140);//カーソルより遅れる時間を指定
  });
  //aタグホバー
  $("a").on({
    "mouseenter": function() {
      //activeクラス付与
      cursor.addClass("active");
      stalker.addClass("active");
    },
    "mouseleave": function() {
      cursor.removeClass("active");
      stalker.removeClass("active");
      
    }
  });
});






// fade-up 表示判定（Intersection Observer）
const fadeTargets = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});
fadeTargets.forEach((el) => observer.observe(el));

// move-on-scroll 実行処理（scrollイベント）
const moveTexts = document.querySelectorAll('.move-on-scroll');

window.addEventListener('scroll', () => {
  moveTexts.forEach((moveText) => {
    if (!moveText.classList.contains('show')) return;

    const scrollY = window.scrollY;
    const offsetTop = moveText.getBoundingClientRect().top + window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY + windowHeight > offsetTop && scrollY < offsetTop + 300) {
      const movement = (scrollY + windowHeight - offsetTop) * 0.08;
      moveText.style.transform = `translateY(-${movement}px)`;
    }
  });
});




let accordionDetails = '.js-details';
let accordionSummary = '.js-details-summary';
let accordionContent = '.js-details-content';
let speed = 500;

$(accordionSummary).each(function() {
  $(this).on("click", function(event) {
    // summaryにis-activeクラスを切り替え
    $(this).toggleClass("is-active");
    // デフォルトの挙動を無効化
    event.preventDefault();

    if ($(this).parent($(accordionDetails)).attr("open")) {
      // アコーディオンを閉じるときの処理
      $(this).nextAll($(accordionContent)).slideUp(speed, function() {
        // アニメーションの完了後にopen属性を取り除く
        $(this).parent($(accordionDetails)).removeAttr("open");
        // display:none;を消して、ページ内検索にヒットするようにする
        $(this).show();
      });
    } else {
      // アコーディオンを開くときの処理
      $(accordionSummary).not($(this)).removeClass("is-active");
      $(accordionContent).not($(this).nextAll($(accordionContent))).slideUp(speed, function() {
        // アニメーションの完了後、すでに開いているアコーディオンのopen属性を取り除く
        $(this).parent($(accordionDetails)).removeAttr("open");
        $(this).show();
      });
      // クリックしたアコーディオンを開く
      $(this).parent($(accordionDetails)).attr("open", "true");
      $(this).nextAll($(accordionContent)).hide().slideDown(speed);
    }
  })
});