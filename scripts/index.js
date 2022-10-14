
// A $( document ).ready() block.
let context;


$( document ).ready(function() {
    console.log('ready');

    $('#container-body').on('scroll', function(){
        var s = $('#container-body').scrollTop();
        var h = $('#container-body').height();
        var d = $('#container-body').prop("scrollHeight");
      
        var scrollPercent = ((s+h)/d) * 100;

        console.log(scrollPercent);

        if(scrollPercent > 7 && scrollPercent < 16 ){
            console.log('audio playing');
            if(sound_2.playing()) sound_2.stop();
        } else if(scrollPercent > 16 && scrollPercent < 25) {
            if(!sound_2.playing()) sound_2.play();
            sound_2.volume(0.05);
            sound_1.volume(0.5);
        } else if( scrollPercent > 25) {
            sound_2.volume(0.3);
        }
      })

    });

var sound_1 = new Howl({
    src: ['./assets/sounds/tracks/1.mp3'],
    loop: true,
});

var sound_2 = new Howl({
    src: ['./assets/sounds/tracks/2.mp3'],
    loop: true,
});
    
function startExperience() {

    console.log('START');

    context = new AudioContext();
        
    

    context.resume().then(() => {
        console.log('PLAY')
        sound_1.play();
        $(".overlay-start").hide();
    });
}