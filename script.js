//rails g scaffold Task description completed:boolean
$(document).ready(function(){

$('#gameArea').hide();

  $("form").submit(function(e) {
      e.preventDefault();
  });

// Global Variables and Prototypes

  //random
  function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //get your name
  let name=false;
  function whatIsName() {
    //click submit button for name
    $('#name-submit').click(function() {
      console.log("HELLO");
      let value = $('#user-input').val();
      $('#gameArea').show();
      $('#nameArea').replaceWith(`<p>Name: "${value}"</p>`);
      $("#conversation").append(`Welcome, ${value}!`);
      name=true;
      return true;
    });
    //press enter
    $(document).keypress(function(key) {
      if(key.which === 13) {
        console.log("HELLO");
        let value = $('#user-input').val();
        $('#gameArea').show();
        $('#nameArea').replaceWith(`<p>Name:${value}</p>`);
        $("#conversation").append(`<p>Welcome, ${value}!</p>`);
        name=true;
        return true;
      }
  });
};

  //moving forward
  let spaces = 0;
  let winspace = 15;
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
    dice = getRandom(1,4);
    if(dice == 2) {
      $('#conversation').append(`<p>You got a SMOOTHIE!</p>`);
      yourstatus.inventory.push("smoothie");
      refreshInventory();
    }
    else if (dice == 1) {
      $('#conversation').append(`<p>You got PEPPERSPRAY!</p>`);
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
    $(`#item${itemIndex}`).replaceWith(`<li id="item${itemIndex}"><button value="inv" id="${itemIndex}">${itemIndex}</button> ${yourstatus.inventory[i]}</li>`);
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
      $('#conversation').append(`<p>You are in a battle!</p>`);
      enemyAppeared();
    }
          else {
          itemRoll();
          console.log("You clicked forward");
          spaces++;
          $('#conversation').append(`<p>You have moved forward! You've traveled ${spaces} spaces.</p>`);
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
    $('#conversation').append(`<p>You attacked for ${attack} damage!</p>`);
    enemy.health = enemy.health - attack;
    $('#conversation').append(`<p>Big Mama health: ${enemy.health}</p>`);
    if (checkHealth() == 3) {;
    enemyAttack();
    }
  });
};


function enemyAttack() {
  let attack = getRandom(1,4);
    yourstatus.health = yourstatus.health - attack;
    $('#conversation').append(`<p>Mama has inflicted ${attack} damage on you!</p>`);
    checkHealth();
}


function checkSpaces() {
  if (spaces==winspace) {
    console.log("Spaces");
    $('#conversation').append(`<p>You won!</p>`);
    $('#controls').hide();
  }
}

function checkHealth() {
  if (enemy.health <= 0) {
    console.log("WIN");
    $('#conversation').append(`<p>Big Mama was defeated!</p>`);
    $('#forward').show();
    $('#attack').hide();
    return 1;
  }

  else if (yourstatus.health <= 0) {
    $('#conversation').append(`<p>You died.</p>`);
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
}

whatIsName();


goForward();


goAttack();

function smoothieUse() {
  yourstatus.health = yourstatus.defaultHealth;
  $('#conversation').append(`<p>You have used a smoothie! You are at ${yourstatus.health}.</p>`);
}

function peppersprayUse() {
  enemy.status=3;
  $('#conversation').append(`<p>You used pepperspray on Big Mama. She is currently unable to attack!</p>`);
}




});
