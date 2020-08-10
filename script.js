String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};

var words = [];
const setWordsField = (val) => {
  switch (val) {
    case "tech":
      words = [...technologies];
      break;
    case "anime":
      words = [...animes];
      break;
    case "country":
      words = [...countries];
      break;
    case "game":
      words = [...games];
  }
  console.log(words);
  $("#tutorial").fadeOut(500);
  setTimeout(() => {
    $("#tutorial").html(
      `<h1><i class="fas fa-glass-cheers"></i> Congratulation! <i class="fas fa-glass-cheers"></i></h1><br />If you want to see more of my projects, contact me on <a href="http://facebook.com/quocbao.kaiser/" target="_blank"><i class="fab fa-facebook-square"></i></a>`
    );
    $(".container").css("opacity", "1");
    $("#word").html(words[0].shuffle());
  }, 500);
};

var currentIndex = 0;

$("#input").on("keyup", (e) => {
  if (e.keyCode == 13) checkWord($("#input").val());
});

const checkWord = (val) => {
  if (val === words[currentIndex]) success();
  else failed();
  $("#input").val("");
};

const success = () => {
  if (currentIndex < words.length - 1) {
    currentIndex++;
    $("#success").css("opacity", "0.7");
    $("#input")
      .css("padding-right", "10%")
      .attr("placeholder", "Congratulation!");
    $("#word").fadeOut(1000);
    setTimeout(() => {
      $("#input").css("padding-right", "0").attr("placeholder", "Guess here");
      $("#word").html(words[currentIndex].shuffle()).fadeIn(500);
      $("#success").css("opacity", "0");
    }, 1000);
  } else $("#tutorial").fadeIn(1000);
};

const failed = () => {
  $("#wrong").css("opacity", "0.7");
  $("#input")
    .css("border-color", "red")
    .css("padding-left", "11%")
    .css("margin-left", "-11%");
  $("#input").attr("placeholder", "Try again!");
  setTimeout(() => {
    $("#word").html(words[currentIndex].shuffle()).fadeIn(500);
    $("#input")
      .css("border-color", "orange")
      .css("padding-left", "0")
      .css("margin-left", "0");
    $("#wrong").css("opacity", "0");
  }, 1000);
};

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "1":
      $("*").css("color", "white");
      break;
    case "2":
      $("*").css("color", "black");
      break;
    case "3":
      $("*").css("color", "springgreen");
      break;
    case "4":
      $("*").css("color", "orange");
      break;
    case "5":
      $("*").css("color", "violet");
      break;
    case "6":
      $("*").css("color", "blue");
      break;
    case "7":
      $("*").css("color", "orange");
      break;
    case "8":
      $("*").css("color", "yellow");
      break;
    case "9":
      $("*").css("color", "brown");
  }
});
