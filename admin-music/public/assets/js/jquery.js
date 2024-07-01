$(document).ready(async function () {
    let all_song = [
        {
            id: 1,
            name: "Chạy ngay đi",
            path: '../assets/img/music/ChayNgayDi-SonTungMTP-5468704.mp3',
            singer: 'sơn tùng',
            image: "https://upload.wikimedia.org/wikipedia/vi/8/85/Chay_ngay_di.png"
        },
        {
            id: 2,
            name: "Cô ta luôn đúng",
            singer: 'feat. Dani D',
            path: '../assets/img/music/CoTaLuonDungfeatDaniD-NieVietNam-14802125.mp3',
            image: "https://avatar-ex-swe.nixcdn.com/song/2024/05/16/7/6/2/e/1715846756295_640.jpg"
        }
    ]
    setTimeout(() => {
        $('.music-content').removeClass('loading-music')
    }, 2000);

//     async function getSongs() {
//       try {
//         const response = await fetch('https://reqres.in/api/users?page=2');    
//         const data = await response.json();
//         return data.data
//       } catch (error) {
//         console.error('Error fetching songs:', error);
//       }
//     }
//     let songs = await getSongs();
    let index_music = 0;
    var codeSong = null;
    var isPlay = false;
    var currentSong = null;
    var audio = document.getElementById('myMusic');

    function load_music(index_music) {
        $('.current-time-music').html('0:00');

        $('#myMusic').attr('src', all_song[index_music].path);
        $('.song-thumd img').attr('src', all_song[index_music].image);
        $('.btn-acction-music').attr('id', `${all_song[index_music].id}`);
        $('.song-title-item span').html(all_song[index_music].name);
        $('.media-content h3 a').html(all_song[index_music].singer);
        $('.avatar-music-window img').attr('src', all_song[index_music].image)

        codeSong = all_song[index_music].id;
        currentSong = $(`.song-${all_song[index_music].id}`);
        removeActiveMusic(currentSong)
        setInterval(() => {
            if (audio.duration) {
                $('.toatl-time-music').html(formatTime(audio.duration));
            }
        }, 300)
        audio.load();
    }
    load_music(index_music)
    // kiểm tra bài hát đang bặt hay đã tạm ngừng
    function justPlay() {
        if (isPlay == false) {
            playSong();
        } else {
            pauseSong();
        }
    }
    // khởi động bài nhạc 
    function playSong() {
        isPlay = true
        const action_play = currentSong.find('.action-play i');
        action_play.removeClass('fa-play');
        action_play.addClass('fa-play-playing-white');
        $('.main-music').removeClass('fa-play');
        $('.main-music').addClass('fa-pause');
        audio.play();
    }
    // Ngưng bài nhạc
    function pauseSong() {
        isPlay = false
        const action_play = currentSong.find('.action-play i');
        action_play.removeClass('fa-play-playing-white');
        action_play.addClass('fa-play');
        $('.main-music').removeClass('fa-pause')
        $('.main-music').addClass('fa-play');
        audio.pause();
    }
    // xoá bỏ vị trí hiện tại của bài nhạc đang phát
    function removeActiveMusic(currentTr) {
        const arrayTrMusic = $('.tr-music')
        currentSong = currentTr;
        arrayTrMusic.each(function () {
            var idSong = $(this).attr('id');
            if (idSong != codeSong) {
                $(this).removeClass('active-music');
                $(this).find('.action-play i').removeClass('fa-play-playing-white')
                $(this).find('.action-play i').addClass('fa-play')
            }
        });
        currentSong.addClass('active-music');
    }
    // lấy vị trí index của bài hát
    function getIndexCurrent(idCurrent) {
        codeSong = idCurrent;
        const currentMusic = all_song.findIndex(element => element.id == idCurrent)
        index_music = currentMusic
        load_music(currentMusic)
    }

    //
    $('.tr-music').on('click', function () {
        var currentTr = $(this);
        var idSong = currentTr.attr('id');
        const action_play = $(this).find('.action-play i');
        currentTr.is(currentSong) ? '' : removeActiveMusic(currentTr);

        idSong == codeSong ? '' : getIndexCurrent(idSong);

        action_play.hasClass('fa-play-playing-white') ? pauseSong() : playSong();
    })
    //
    $('.btn-acction-music').on('click', function () {
        justPlay()
    })

    // định dạng thời gian cho bài nhạc
    function formatTime(time) {
        var minuter = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        var timeString = minuter + ':' + (seconds < 10 ? '0' : '') + seconds
        return `${timeString}`
    }

    // Cập nhật thời gian trực tuyến của nhạc 
    audio.ontimeupdate = function () {
        if (audio.duration) {
            const progress_percen = Math.floor(audio.currentTime / audio.duration * 100)
            $('#bar-progress').val(progress_percen)
            $('.current-time-music').html(formatTime(audio.currentTime))
        }
        if (audio.duration == audio.currentTime) {
            $('#bar-progress').val(0)
            $('.current-time-music').html('0:00')
            pauseSong()
        }
    }

    // bắt sự kiện thời gian hiện tại của bài nhạc
    $('#bar-progress').on('change', function () {
        const setTimeMusic = audio.duration / 100 * $(this).val()
        audio.currentTime = setTimeMusic
    })

    // tăng chỉnh âm lượng
    $('.volume-music input').on('input', function () {
        let value = $(this).val();
        audio.volume = value / 100
    })

    // Bài hát kế tiếp
    $('.play-pause-music .next-music').on('click', function () {
        if (index_music >= all_song.length - 1) {
            index_music = 0
        } else {
            index_music++
        }
        let id = all_song[index_music].id;
        currentSong = $(`song-${id}`)
        codeSong = id
        load_music(index_music)
        playSong()
    })
    // Bài hát trước
    $('.play-pause-music .pre-music').on('click', function () {
        if (index_music <= 0) {
            index_music = all_song.length - 1
        } else {
            index_music--
        }
        let id = all_song[index_music].id;
        currentSong = $(`song-${id}`)
        codeSong = id
        load_music(index_music)
        playSong()
    })
    //
    $('.window-restore').on('click', function () {
        $('.window-music').toggle('none-window-music');
    })
    $('.action-close-window-music').on('click', function () {
        $('.window-music').toggle('none-window-music');
    })

})