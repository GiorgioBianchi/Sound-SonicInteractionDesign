
const IMAGE1_TOP = 1,
IMAGE1_BOTTOM = 17.2, 
IMAGE2_TOP = 24.6, 
IMAGE_DIFF = IMAGE2_TOP - IMAGE1_BOTTOM,
IMAGE2_BOTTOM = 39.5, 
IMAGE3_TOP = 47.0,
IMAGE3_BOTTOM = 57.79,
IMAGE4_TOP = 65.3,
IMAGE4_BOTTOM = 77.27,
IMAGE5_TOP = 84.92,
IMAGE5_BOTTOM = 100;

let context,
    soundFade = 0,
    volume = 0, 
    sound_1Img,
    sound_2Img,
    sound_3Img,
    sound_4Img,
    sound_5Img;

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
            soundFade = scrollPercent - IMAGE1_BOTTOM;
            volume = (soundFade/IMAGE_DIFF);
            sound_2Img.volume(volume);
            sound_1Img.volume(1 - volume);
        } else if( scrollPercent > IMAGE2_TOP && scrollPercent < IMAGE2_BOTTOM) {
            if(sound_1Img.playing()) sound_1Img.volume(0);
            sound_2Img.volume(1);
            if(sound_3Img.playing()) sound_3Img.volume(0);
        } else if( scrollPercent > IMAGE2_BOTTOM && scrollPercent < IMAGE3_TOP) {
            soundFade = scrollPercent - IMAGE2_BOTTOM;
            volume = (soundFade/IMAGE_DIFF);
            sound_3Img.volume(volume);
            sound_2Img.volume(1.0 - volume);
        } else if( scrollPercent > IMAGE3_TOP && scrollPercent < IMAGE3_BOTTOM) {
            if(sound_2Img.playing()) sound_2Img.volume(0);
            sound_3Img.volume(1);
            if(sound_4Img.playing()) sound_4Img.volume(0);
        } else if( scrollPercent > IMAGE3_BOTTOM && scrollPercent < IMAGE4_TOP) {
            soundFade = scrollPercent - IMAGE3_BOTTOM;
            volume = (soundFade/IMAGE_DIFF);
            sound_4Img.volume(volume);
            sound_3Img.volume(1 - volume);
        } else if( scrollPercent > IMAGE4_TOP && scrollPercent < IMAGE4_BOTTOM) {
            if(sound_3Img.playing()) sound_3Img.volume(0);
            sound_4Img.volume(1);
            if(sound_5Img.playing()) sound_5Img.volume(0);
        } else if( scrollPercent > IMAGE4_BOTTOM && scrollPercent < IMAGE5_TOP) {
            soundFade = scrollPercent - IMAGE4_BOTTOM;
            volume = (soundFade/IMAGE_DIFF);
            sound_5Img.volume(volume);
            sound_4Img.volume(1 - volume);
        } else if( scrollPercent > IMAGE5_TOP && scrollPercent < IMAGE5_BOTTOM) {
            if(sound_4Img.playing()) sound_4Img.volume(0);
            sound_5Img.volume(1);
        }
      })

    });


    
function setVolumes(scrollPercent, sound_1, sound_2, img_diff) {
    //proporzione fade
    var soundFade = scrollPercent - IMAGE1_BOTTOM;
    //sound : x = topFade : 100
    var volume = (img_diff / 100) * soundFade;
    sound_2.volume(volume);
    sound_1.volume(1 - volume);
}

function startExperience() {

    console.log('START');
    context = new AudioContext();

    
    context.resume().then(() => {
        sound_1Img = new Howl({
            src: ['./assets/sounds/tracks/1.mp3'],
            loop: true,
        });
        
        sound_2Img = new Howl({
            src: ['./assets/sounds/tracks/2.mp3'],
            loop: true,
        });
        
        sound_3Img = new Howl({
            src: ['./assets/sounds/tracks/3.mp3'],
            loop: true,
        });
        
        sound_4Img = new Howl({
            src: ['./assets/sounds/tracks/4.mp3'],
            loop: true,
        });
        
        sound_5Img = new Howl({
            src: ['./assets/sounds/tracks/5.mp3'],
            loop: true,
        });

        console.log('PLAY');
        sound_1Img.fade(0.0, 1.0, 500);
        sound_1Img.play();
        sound_2Img.volume(0);
        sound_2Img.play();
        sound_3Img.volume(0);
        sound_3Img.play();
        sound_4Img.volume(0);
        sound_4Img.play();
        sound_5Img.volume(0);
        sound_5Img.play();
        $('.overlay-start').addClass('fadeOut');
        setTimeout($('.overlay-start').hide(), 2000);
    });
}