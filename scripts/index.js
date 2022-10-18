
let context;

const IMAGE1_TOP = 7.5,
IMAGE1_BOTTOM = 17.2, 
IMAGE2_TOP = 24.6, 
IMAGE_1_2_DIFF = IMAGE2_TOP - IMAGE1_BOTTOM;
IMAGE2_BOTTOM = 39.5, 
IMAGE3_TOP = 47.0,
IMAGE_2_3_DIFF = IMAGE3_TOP - IMAGE2_BOTTOM;
IMAGE3_BOTTOM = 57.79,
IMAGE4_TOP = 65.3,
IMAGE_3_4_DIFF = IMAGE4_TOP - IMAGE3_BOTTOM;
IMAGE4_BOTTOM = 77.27,
IMAGE5_TOP = 84.92
IMAGE_4_5_DIFF = IMAGE5_TOP - IMAGE4_BOTTOM;
IMAGE5_BOTTOM = 100;


$( document ).ready(function() {
    console.log('ready');

    $('#container-body').on('scroll', function(){
        var s = $('#container-body').scrollTop();
        var h = $('#container-body').height();
        var d = $('#container-body').prop("scrollHeight");
      
        var scrollPercent = ((s+h)/d) * 100;

        console.log(scrollPercent);

        if(scrollPercent > IMAGE1_TOP && scrollPercent < IMAGE1_BOTTOM ){
            if(sound_2Img.playing()) sound_2Img.volume(0);
        } else if(scrollPercent > IMAGE1_BOTTOM && scrollPercent < IMAGE2_TOP) {
            setVolumes(scrollPercent, sound_1Img, sound_2Img);
        } else if( scrollPercent > IMAGE2_TOP && scrollPercent < IMAGE2_BOTTOM) {
            if(sound_1Img.playing()) sound_1Img.volume(0);
            sound_2Img.volume(1);
            if(sound_3Img.playing()) sound_3Img.volume(0);
        } else if( scrollPercent > IMAGE2_BOTTOM && scrollPercent < IMAGE3_TOP) {
            setVolumes(scrollPercent, sound_2Img, sound_3Img);
        } else if( scrollPercent > IMAGE3_TOP && scrollPercent < IMAGE3_BOTTOM) {
            if(sound_2Img.playing()) sound_2Img.volume(0);
            sound_3Img.volume(1);
            if(sound_4Img.playing()) sound_4Img.volume(0);
        } else if( scrollPercent > IMAGE3_BOTTOM && scrollPercent < IMAGE4_TOP) {
            setVolumes(scrollPercent, sound_3Img, sound_4Img);
        } else if( scrollPercent > IMAGE4_TOP && scrollPercent < IMAGE4_BOTTOM) {
            if(sound_3Img.playing()) sound_3Img.volume(0);
            sound_4Img.volume(1);
            if(sound_5Img.playing()) sound_5Img.volume(0);
        } else if( scrollPercent > IMAGE4_BOTTOM && scrollPercent < IMAGE5_TOP) {
            setVolumes(scrollPercent, sound_4Img, sound_5Img);
        } else if( scrollPercent > IMAGE5_TOP && scrollPercent < IMAGE5_BOTTOM) {
            if(sound_4Img.playing()) sound_4Img.volume(0);
            sound_5Img.volume(1);
        }
      })

    });

var sound_1Img = new Howl({
    src: ['./assets/sounds/tracks/1.mp3'],
    loop: true,
});

var sound_2Img = new Howl({
    src: ['./assets/sounds/tracks/2.mp3'],
    loop: true,
});

var sound_3Img = new Howl({
    src: ['./assets/sounds/tracks/1.mp3'],
    loop: true,
});

var sound_4Img = new Howl({
    src: ['./assets/sounds/tracks/2.mp3'],
    loop: true,
});

var sound_5Img = new Howl({
    src: ['./assets/sounds/tracks/1.mp3'],
    loop: true,
});
    
function setVolumes(scrollPercent, sound_1, sound_2) {
    //proporzione fade
    var soundFade = scrollPercent - IMAGE1_BOTTOM;
    //sound : x = topFade : 100
    var volume = (IMAGE_1_2_DIFF / 100) * soundFade;
    sound_2.volume(volume);
    sound_1.volume(1 - volume);
}

function startExperience() {

    console.log('START');

    context = new AudioContext();
        
    

    context.resume().then(() => {
        console.log('PLAY')
        sound_1Img.volume(0);
        sound_1Img.play();
        sound_2Img.volume(0);
        sound_2Img.play();
        sound_3Img.volume(0);
        sound_3Img.play();
        sound_4Img.volume(0);
        sound_4Img.play();
        sound_5Img.volume(0);
        sound_5Img.play();
        $(".overlay-start").hide();
    });
}