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

var wordsField = [
  {
    id: 1,
    arranged: "intelligence",
  },
  {
    id: 2,
    arranged: "universal",
  },
  {
    id: 3,
    arranged: "impossible",
  },
  {
    id: 4,
    arranged: "predator",
  },
  {
    id: 5,
    arranged: "desert-eagle",
  },
  {
    id: 6,
    arranged: "hello-world",
  },
  {
    id: 7,
    arranged: "titanic",
  },
  {
    id: 8,
    arranged: "you-can't-solve-this",
  },
  {
    id: 9,
    arranged: "incredible",
  },
  {
    id: 10,
    arranged: "congratulation!",
  },
];

var currentIndex = 0;

$("#input").on("keyup", (e) => {
  if (e.keyCode == 13) checkWord($("#input").val());
});

const checkWord = (val) => {
  if (val === wordsField[currentIndex].arranged) success();
  else failed();
  $("#input").val("");
};

const success = () => {
  if (currentIndex < 0) {
    currentIndex++;
    $("#success").css("opacity", "0.7");
    $("#input")
      .css("padding-right", "10%")
      .attr("placeholder", "Congratulation!");
    $("#word").fadeOut(1000);
    setTimeout(() => {
      $("#input").css("padding-right", "0").attr("placeholder", "Guess here");
      $("#word").html(wordsField[currentIndex].arranged.shuffle()).fadeIn(500);
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
    $("#word").html(wordsField[currentIndex].arranged.shuffle()).fadeIn(500);
    $("#input")
      .css("border-color", "orange")
      .css("padding-left", "0")
      .css("margin-left", "0");
    $("#wrong").css("opacity", "0");
  }, 1000);
};

document.addEventListener("click", (e) => {
  $("#tutorial").fadeOut(500);
  setTimeout(() => {
    $("#tutorial").html(
      `<h1><i class="fas fa-glass-cheers"></i> Congratulation! <i class="fas fa-glass-cheers"></i></h1><br />If you want to see more of my projects, contact me on <a href="http://facebook.com/quocbao.kaiser/" target="_blank"><i class="fab fa-facebook-square"></i></a>`
    );
  }, 2000);
});

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
