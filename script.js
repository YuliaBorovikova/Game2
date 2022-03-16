Swal.fire({
    title: 'Давай поиграем',
    text: "Мой компьютер загадал число. У тебя есть всего 5 попыток, чтобы его отгадать. Попробуй выиграть!",
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
  
  
  const input = document.querySelector('#guess');
  const btn = document.querySelector('#btn');
  const randomNumber = Math.floor(Math.random()*20 +1);
  
  //Запуск функции Play() кликом на кнопку
  btn.addEventListener('click', play);
  
  //Запуск функции Play() нажатием на Enter
  input.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
      play();
    }
  })
  
  
  let i = 0;
  
  //запуск СЧЕТЧИКа от клика на кнопку
  btn.addEventListener ('click' , counter);
  
  //запуск СЧЕТЧИКа от Enter
  input.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
      counter();
    }
  })
  
  //функция счетчика
  function counter(){
    if (input.value == "1"||input.value == "2"||input.value == "3"||input.value == "4"||
        input.value == "5"||input.value == "6"||input.value == "7"||input.value == "8"||
        input.value == "9"||input.value == "10"||input.value == "11"||input.value == "12"||
        input.value == "13"||input.value == "14"||input.value == "15"||input.value == "16"||
        input.value == "17"||input.value == "18"||input.value == "19"||input.value == "20"){
      i++;
    
    if (i === 4) {
      Swal.fire('Соберись! Осталась последняя попытка.');
    }
    
    else if (i === 5) {
      Swal.fire({
        title: 'Упс! Попытки закончились. Сыграешь еще?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6ECB63',
        cancelButtonColor: '#d33',
        confirmButtonText: '<a class="newGame" href="index.html">Новая игра</a>',
        cancelButtonText: 'Не хочу больше играть'
      });
      audioNewTwo();
    }
    }}
  
  
  function play() {
    const userNumber = document.querySelector('#guess').value;
    if (userNumber > 20 || userNumber<1) {
      Swal.fire({
        icon: 'error',
        title: 'Ошибка',
        text: 'Нужно ввести число от 1 до 20',
      })
      input.value = '';
    }
  
    else if (isNaN(userNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Ой!',
        text: 'Нужно ввести число',
      })
      input.value = '';
    }
  
    else {
      if (userNumber < randomNumber) {
        Swal.fire('Не угадал! Попробуй число больше')
      }
  
      else if (userNumber > randomNumber) {
        Swal.fire('Не угадал! Попробуй число меньше')
      }
  
      else {
        document.querySelector('#canvas').style.display = 'block';
          $(function() {
            var canvas = $('#canvas')[0];
            canvas.width = $(window).width();
            canvas.height = $(window).height();
            var ctx = canvas.getContext('2d');
            // init
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // objects
            var listFire = [];
            var listFirework = [];
            var fireNumber = 10;
            var center = {
              x: canvas.width / 2,
              y: canvas.height / 2
            };
            var range = 100;
            for (var i = 0; i < fireNumber; i++) {
              var fire = {
                x: Math.random() * range / 2 - range / 4 + center.x,
                y: Math.random() * range * 2 + canvas.height,
                size: Math.random() + 0.5,
                fill: '#fd1',
                vx: Math.random() - 0.5,
                vy: -(Math.random() + 4),
                ax: Math.random() * 0.02 - 0.01,
                far: Math.random() * range + (center.y - range)
              };
              fire.base = {
                x: fire.x,
                y: fire.y,
                vx: fire.vx
              };
              //
              listFire.push(fire);
            }
          
            function randColor() {
              var r = Math.floor(Math.random() * 256);
              var g = Math.floor(Math.random() * 256);
              var b = Math.floor(Math.random() * 256);
              var color = 'rgb($r, $g, $b)';
              color = color.replace('$r', r);
              color = color.replace('$g', g);
              color = color.replace('$b', b);
              return color;
            }
            (function loop() {
              requestAnimationFrame(loop);
              update();
              draw();
            })();
          
            function update() {
              for (var i = 0; i < listFire.length; i++) {
                var fire = listFire[i];
                //
                if (fire.y <= fire.far) {
                  // case add firework
                  var color = randColor();
                  for (var i = 0; i < fireNumber * 5; i++) {
                    var firework = {
                      x: fire.x,
                      y: fire.y,
                      size: Math.random() + 1.5,
                      fill: color,
                      vx: Math.random() * 5 - 2.5,
                      vy: Math.random() * -5 + 1.5,
                      ay: 0.05,
                      alpha: 1,
                      life: Math.round(Math.random() * range / 2) + range / 2
                    };
                    firework.base = {
                      life: firework.life,
                      size: firework.size
                    };
                    listFirework.push(firework);
                  }
                  // reset
                  fire.y = fire.base.y;
                  fire.x = fire.base.x;
                  fire.vx = fire.base.vx;
                  fire.ax = Math.random() * 0.02 - 0.01;
                }
                //
                fire.x += fire.vx;
                fire.y += fire.vy;
                fire.vx += fire.ax;
              }
              for (var i = listFirework.length - 1; i >= 0; i--) {
                var firework = listFirework[i];
                if (firework) {
                  firework.x += firework.vx;
                  firework.y += firework.vy;
                  firework.vy += firework.ay;
                  firework.alpha = firework.life / firework.base.life;
                  firework.size = firework.alpha * firework.base.size;
                  firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
                  //
                  firework.life--;
                  if (firework.life <= 0) {
                    listFirework.splice(i, 1);
                  }
                }
              }
            }
          
            function draw() {
              // clear
              ctx.globalCompositeOperation = 'source-over';
              ctx.globalAlpha = 0.18;
              ctx.fillStyle = '#000';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              // re-draw
              ctx.globalCompositeOperation = 'screen';
              ctx.globalAlpha = 1;
              for (var i = 0; i < listFire.length; i++) {
                var fire = listFire[i];
                ctx.beginPath();
                ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = fire.fill;
                ctx.fill();
              }
              for (var i = 0; i < listFirework.length; i++) {
                var firework = listFirework[i];
                ctx.globalAlpha = firework.alpha;
                ctx.beginPath();
                ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = firework.fill;
                ctx.fill();
              }
            }
          })
          Swal.fire({
            
            showCancelButton: true,
            confirmButtonText: '<a class="newGame" href="index.html">Новая игра</a>',
            confirmButtonColor: 'rgb(7, 126, 17)',
            cancelButtonText: 'Не хочу больше играть',
            cancelButtonColor: '#d33',
          });
        audioNew();
      }
    }
  }

  function audioNew() {
    const audio = new Audio('pobeda.mp3');
    audio.play();
  }

  function audioNewTwo() {
    const audio = new Audio('proval.mp3');
    audio.play();
  }