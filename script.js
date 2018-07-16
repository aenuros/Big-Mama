//rails g scaffold Task description completed:boolean
$(document).ready(function(){

$('#gameArea').hide();

  $("form").submit(function(e) {
      e.preventDefault();
  });

// Global Variables and Prototypes

function talk(text) {
  $('#conversation').append(text);
  window.scrollTo(0,document.body.scrollHeight);
}

  //random
  function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //get your name
  let name=false;
  function whatIsName() {
    //click submit button for name
    $('#name-submit').click(function() {
      let value = $('#user-input').val();
      $('#gameArea').show();
      $('#nameArea').replaceWith(`<p>Name: "${value}"</p>`);
      talk(`Welcome, ${value}!`);
      name=true;
      return true;
    });
    //press enter
    $(document).keypress(function(key) {
      if(key.which === 13) {
        //console.log("HELLO");
        let value = $('#user-input').val();
        $('#gameArea').show();
        $('#nameArea').replaceWith(`<p>Name:${value}</p>`);
        talk(`Welcome, ${value}!`);
        name=true;
        return true;
      }
  });
};

  //moving forward
  let spaces = 0;
  let winspace = 55;
  let turn =0;
  let battlespace = false;

let enemy = {
  name: "Big Mama",
  defaultHealth: 10,
  health: 10,
  status: 0
}

let yourstatus = {
  defaultHealth: 10,
  health: 10,
  inventory: [],
  arrayMaxValues:3
}

function itemRoll() {
  if (yourstatus.inventory.length < yourstatus.arrayMaxValues) {
    dice = getRandom(1,2);
    if(dice == 2) {
      talk(`<p>You got a SMOOTHIE!</p>`);
      yourstatus.inventory.push("smoothie");
      refreshInventory();
    }
    else if (dice == 1) {
      talk(`<p>You got PEPPERSPRAY!</p>`);
      yourstatus.inventory.push("pepperspray");
      refreshInventory();
    }
   }
}

function refreshInventory() {
  for (i=0;i<yourstatus.arrayMaxValues;i++) {
    itemIndex = i+1;
    if (yourstatus.inventory[i] == undefined) {
      console.log('undefined');
      $(`#item${itemIndex}`).replaceWith(`<li id="item${itemIndex}"><button value="inv" id="${itemIndex}">${itemIndex}</button>n/a</li>`);
    }
    else {
    $(`#item${itemIndex}`).replaceWith(`<li id="item${itemIndex}"><button value="inv" id="${itemIndex}" class="${yourstatus.inventory[i]}">${itemIndex}</button> ${yourstatus.inventory[i]}</li>`);
    }
  }
}

  function goForward() {
  $('#attack').hide();
  $('#forward').show();
  $('#forward').click(function(){
    // if(whatIsName()==false) {
    //   $('#conversation').append(`<p>NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo</p>`);
    // }
    //else {
    turn++;
    if (getRandom(1,5) == 5) {
      talk(`<p>You are in a battle!</p>`);
      enemyAppeared();
    }
          else {
          itemRoll();
          spaces++;
          talk(`<p>You have moved forward! You've traveled ${spaces} spaces.</p>`);
          }
      //  };

      checkSpaces();
  });
};

  //
  function goAttack() {
  $('#attack').click(function() {
    let attack = getRandom(1,5);
    console.log("You attacked");
    talk(`<p>You attacked for ${attack} damage!</p>`);
    enemy.health = enemy.health - attack;
    talk(`<p>Big Mama health: ${enemy.health}</p>`);
    if (checkHealth() == 3) {;
    enemyAttack();
    }
  });
};


function enemyAttack() {

  if(enemy.status==0){
      let attack = getRandom(1,4);
        yourstatus.health = yourstatus.health - attack;
        talk(`<p>Big Mama has inflicted ${attack} damage on you!</p>`);
        talk(`<p>Your health: ${yourstatus.health}</p>`);
        checkHealth();
      }
  else {
    talk(`<p>Big Mama can't attack for ${enemy.status} turn(s)!`);
    enemy.status--;
  }
}

function checkSpaces() {
  if (spaces==winspace) {
    console.log("Spaces");
    talk(`<p>You won!</p>`);
    $('#controls').hide();
  }
}

function checkHealth() {
  if (enemy.health <= 0) {
    console.log("WIN");
    talk(`<p>Big Mama was defeated!</p>`);
    $('#forward').show();
    $('#attack').hide();
    battlespace = false;
    return 1;
  }

  else if (yourstatus.health <= 0) {
    talk(`<p>You died.</p>`);
    $('#controls').hide();
    return 2;
  }

  else {
    return 3;
  }
}

function enemyAppeared() {
  $('#attack').show();
  $('#forward').hide();
  enemy.health = enemy.defaultHealth;
  battlespace = true;
  enemy.status = 0;
}

function InvUse() {

  for (i=1;i<4;i++) {
    $('ul').on("click", "#"+ i, function() {
      let option = $(this).attr('id');
      let item = $(this).attr('class');
      console.log(item);
        if (item == "smoothie") {
          smoothieUse();
        }
        else if (item =="pepperspray" && battlespace== true) {
          peppersprayUse();
        }
      console.log(option);
      realIndex = option-1;
      console.log(yourstatus.inventory);
      yourstatus.inventory.splice(realIndex,1);
      refreshInventory();
      console.log(yourstatus.inventory);
    })
  }

};

whatIsName();


goForward();


goAttack();



function smoothieUse() {
  yourstatus.health = yourstatus.defaultHealth;
  talk(`<p>You have used a smoothie! You are at ${yourstatus.health}.</p>`);
  if (battlespace == true) {
    enemyAttack();
  }
}

function peppersprayUse() {
  enemy.status=3;
  talk(`<p>You used pepperspray on Big Mama. She is currently unable to attack!</p>`);
}

InvUse();


});
