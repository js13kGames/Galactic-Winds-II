// bootstraps the game
var game_manager;


window.onload = function(e){
  game_manager = new GameManager();
};


var GameManager = function(){
  // must decompress svgs first.
  svg_decompresor = new SVGDecompresor();
  svg_decompresor.decompress_big_ass_string();

  player = new Player();
  enemy_manager = new EnemyManager();
  level_manager = new LevelManager();
  input = new Input();
  utils = new Utils();
  //,
  
  graphics = new Graphics();
  player.init();
  level_manager.init();
  enemy_manager.init();

  function update(delta){
    if (game_paused){return;}
    player.update(delta);
    level_manager.update(delta);
    enemy_manager.update(delta);
  }

  var run = (function() {
    var update_interval = 1000 / 60;
    var start_tick = next_tick = last_tick = (new Date).getTime();
    num_frames = 0;

    return function() {
      current_tick = (new Date).getTime();
      while ( current_tick > next_tick ) {
        delta = (current_tick - last_tick) / 1000;
        update(delta);
        next_tick += update_interval;
        last_tick = (new Date).getTime();
      }

      graphics.draw();

      // fps = (num_frames / (current_tick - start_tick)) * 1000;
      // Game.graphics.fps_counter.textContent = Math.round(fps);
      num_frames++;
    }
  })();



  input.subscribe_to_key('enter', progress_game);

  // document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
  if( window.requestAnimationFrame) {
    window.each_frame = function(cb) {
      var _cb = function() { cb(); requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    window.each_frame = function(cb) {
      var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    window.each_frame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  window.each_frame(run);
  // game_master.start_game();

};

// singletons
var player,
  enemy_manager,
  level_manager,
  input,
  svg_decompresor,
  graphics,
  utils;

// globals
var game_paused = true;

var game_state = 'start';
  var enter_debounce = false;
  function progress_game(key_up){
    if (!key_up){
      return;
    }
    if (game_state == 'start'){
      document.getElementById('start_screen').style['display'] = 'none';
      document.getElementById('main-canvas').style['display'] = 'block';
      game_state = 'play';
      game_paused = false;
    }else if (game_state == 'play' && game_paused){
      document.getElementById('main-canvas').style['display'] = 'none';
      document.getElementById('you_lose').style['display'] = 'block';
      setTimeout(function(){
        document.getElementById('game_over').style['display'] = 'block';
      },1000);
      game_state = 'game_over';
    }else if (game_state == 'game_over'){
      location.reload();
    }
  };
