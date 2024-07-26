<script>
    $(document).ready(async function() {
        let index_music = 0;
        var codeSong = null;
        var isPlay = false;
        var currentSong = null;
        var audio = document.getElementById('myMusic');
        let id_genre = $('.zm-navbar-item.is-active').attr('data-id');
        let idGenreChilds = null;
        let songs = await getSongs(id_genre);
        let all_song = songs.data
        $('#searchData').on('keyup', function() {
            dataTable.search($(this).val()).draw();
        })
        // all_song =all_song.data

        getGenre(id_genre)

        let dataTable = $("#table-songs").DataTable({
            responsive: true,
            search: false,
            ordering: true, // Cho phép sắp xếp khi click vào cột
            order: [],
            lengthChange: false,
            autoWidth: false,
            data: all_song,
            rowCallback: function(row, data, index) {
                var id = data.id
                $(row).attr('id', id);
                $(row).attr('class', 'tr-music' + ' ' + 'song-' + id);
            },
            columns: [

                {
                    "data": null,
                    render: function(data) {
                        return (`
                           <div class="d-flex px-2 py-1">
                                        <div class="song-thumb" title="Để ý">
                                            <img src="${data.thumbnail}"
                                                width="50px" height="50px" class="me-3 border-radius-lg" alt="user1" />
                                            <div class="zm-actions-container">
                                                <div class="zm-actions">
                                                    <button class="zm-btn action-play button">
                                                        <i class="fas fa-play"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">${data.name}</h6>
                                            <p class="text-xs text-secondary mb-0">
                                                 ${data.artistsNames}
                                            </p>
                                        </div>
                            </div>
                        `);
                    }
                },
                {
                    "data": 'composerNames'
                },
                {
                    "data": 'genre.name_genre'
                },
                {
                    "data": 'release_date'
                },
                {
                    "data": null,
                    render: function(data) {
                        return formatTime(data.duration);
                    }
                },
                {
                    "data": null,
                    render: function(data) {
                        return data.isOffical ? 'Chính thức' : 'Không chính thức'
                    }
                },
                {
                    "data": null,
                    render: function(data) {
                        return data.isPrivate ? 'Riêng tư' : 'Không riêng tư';
                    }
                },
                {
                    "data": 'total_listens'
                },
                {
                    "data": null,
                    render: function(data) {
                        return `
                            <td class="align-middle">
                            <div class="ms-auto">
                                <a  class="btn delete-song btn-link text-danger delete-artist text-gradient px-1 mb-0"
                                data-delete='${data.id}'><i
                                    class="material-icons text-sm me-2">delete</i>Delete</a>
                                <a class="btn btn-link text-dark px-1 mb-0" href="{{ url('song/edit').'/' }}${data.id}"><i
                                    class="material-icons text-sm me-2">edit</i>Edit</a>
                            </div>
                        </td>`
                    }
                },

            ],
            initComplete: function() {
                load_music(index_music)
            }
        });

        function getGenre($id) {
            $('.music-content').addClass('loading-music')
            $.ajax({
                url: `{{ url('song/genre/id').'/' }}${$id}`,
                method: 'get',
                processData: false,
                contentType: false,
                success: function(data) {
                    const genre = data.data
                    let thisClass = $(`.zm-navbar-item[data-id="${genre.parent.id}"]`);
                    genre.id == genre.parent.id ? $('.choise-genre-music').html('Tất cả') : $(
                        '.choise-genre-music').html(genre.name_genre);
                    id_genre == genre.parent.id ? '' : isActive(thisClass)
                    const listGenreChilds = $.map(genre.childs, function(value, index) {
                        return (`
                       <li class="col-md-6" data-id=${value.id}><a class="dropdown-item" style="white-space:normal;">${value.name_genre}</a></li>
                     `)
                    })
                    $('.menu-genre').html(listGenreChilds);
                    $('.music-content').removeClass('loading-music')
                },
                error: function(error) {
                    console.log(error.statusText);
                }
            })
        }

        async function getSongs(id) {
            try {
                let data = await new Promise((resolve, reject) => {
                    $.ajax({
                        method: 'get',
                        url: `{{ url('song/id').'/' }}${id}`,
                        success: function(data) {
                            resolve(data);
                        },
                        error: function(error) {
                            reject(error.statusText);
                        }
                    });
                });
                return data;
            } catch (error) {
                console.log('Lỗi');
            }
        }


        $('.zm-navbar-item').on('click', async function() {

            let id = $(this).attr('data-id')
            if (id_genre == id) return

            isActive($(this))
            id_genre = $(this).attr('data-id');
            getGenre(id_genre);
            songs = await getSongs(id_genre);
            all_song = songs.data
            dataTable.clear().rows.add(all_song).draw();
            load_music(index_music = 0)
            pauseSong()
        })


        function isActive(thisClass) {
            let navbarItem = $('.zm-navbar-item');
            for (const item of navbarItem) {
                $(item).removeClass('is-active')
            }
            $(thisClass).addClass('is-active');
        }
        $('.menu-genre').on('click', 'li', async function() {
            const idGenre = $(this).attr('data-id');
            if (id_genre == idGenre) return
            id_genre = idGenre;
            getGenre(idGenre);
            songs = await getSongs(id_genre);
            all_song = songs.data
            dataTable.clear().rows.add(all_song).draw();
            load_music(index_music = 0);
            pauseSong()
        })

        $('.tbody-songs').on('click', '.delete-song', function() {
            const id = $(this).attr('data-delete');
            $('.loading').removeClass('loading-hidden')
            index_music = 0
            $.ajax({
                url: `{{ url('song').'/' }}${id}/destroy`,
                method: 'delete',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: async function(data) {
                    if (data.status_code == 200) {
                        $('.successToast').trigger('click')
                    } else {
                        $('.dangerToast').trigger('click');
                    }
                    $('.loading').addClass('loading-hidden')
                    songs = await getSongs(id_genre);
                    all_song = songs.data

                    dataTable.clear().rows.add(all_song).draw();
                    load_music(index_music);
                },
                error: function() {
                    console.log('lỗi');
                }
            })
        })

        function load_music(index_music) {

            all_song == '' ? $('.container-music').hide() : $('.container-music').show();

            $('.current-time-music').html('0:00');

            $('#myMusic').attr('src', all_song[index_music].audio_file);
            $('.song-thumd img').attr('src', all_song[index_music].thumbnail);
            $('.btn-acction-music').attr('id', `${all_song[index_music].id}`);
            $('.song-title-item span').html(all_song[index_music].name);
            $('.media-content h3 a').html(all_song[index_music].artistsNames);
            $('.toatl-time-music').html(formatTime(all_song[index_music].duration));
            codeSong = all_song[index_music].id;
            currentSong = $(`#table-songs .song-${all_song[index_music].id}`);
            removeActiveMusic(currentSong)
            audio.load();
        }

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
            const arrayTrMusic = $('.tbody-songs .tr-music')
            currentSong = currentTr;
            arrayTrMusic.each(function() {
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
        $('.tbody-songs').on('click', '.tr-music',function() {
            var currentTr = $(this);
            var idSong = currentTr.attr('id');
            const action_play = $(this).find('.action-play i');
            currentTr.is(currentSong) ? '' : removeActiveMusic(currentTr);

            idSong == codeSong ? '' : getIndexCurrent(idSong);

            action_play.hasClass('fa-play-playing-white') ? pauseSong() : playSong();
        })
        //
        $('.btn-acction-music').on('click', function() {
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
        audio.ontimeupdate = function() {
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
        $('#bar-progress').on('change', function() {
            const setTimeMusic = audio.duration / 100 * $(this).val()
            audio.currentTime = setTimeMusic
        })

        // tăng chỉnh âm lượng
        $('.volume-music input').on('input', function() {
            let value = $(this).val();
            audio.volume = value / 100
        })

        // Bài hát kế tiếp
        $('.play-pause-music .next-music').on('click', function() {
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
        $('.play-pause-music .pre-music').on('click', function() {
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

    })
</script>