// enemy manager

var EnemyManager = function(){

  var enemy_list = [];

  function init(){
    enemy_list.push(make_enemy(5));
    enemy_list.push(make_enemy(11));
    setInterval(function(){
      for (var i = 0; i < 3; i++){

        var random_num = parseInt(Math.random()*11);
        if (random_num == 5){continue;}
        enemy_list.push(make_enemy(random_num));
      }
    }, 1000);
  };


  function update(delta){
    for (var i = enemy_list.length -1; i > -1; i--){
      if (enemy_list[i].update(delta)){
        enemy_list.splice(i, 1);
      }
    }
  };

  function make_enemy(type){
    return new Enemy(type);
  };

  function get_enemy_list(){
    return enemy_list;
  }

  this.init = init;
  this.update = update;
  this.get_enemy_list = get_enemy_list;

};