<script>
    $(document).ready(async function()  {
        var selectedIds = [];
        let id_genre = $('.zm-navbar-item.is-active').attr('data-id');
        let playListGenre = await getPlayList(id_genre);
        let all_playList = playListGenre.data.play_list
        getGenre(id_genre)
        let dataTable = $("#table-playlist").DataTable({
            responsive: true,
            search: false,
            ordering: true,
            order: [],
            lengthChange: false,
            autoWidth: false,
            data: all_playList,
            columns: [{
                    "data": null,
                    render: function(data) {
                        return (`
                           <div class="d-flex px-2 py-1">
                                        <div class="song-thumb" title="${data.title}">
                                            <img src="{{ url('storage').'/' }}${data.thumbnail}"
                                                width="50px" height="50px" class="me-3 border-radius-lg" alt="user1" />
                                           
                                        </div>  
                                         <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">${data.title}</h6>
                                       
                                        </div>          
                            </div>
                        `);
                    }
                },
                {
                    "data": null,
                    render: function(data) {
                        return (`
                         <p class="text-xs text-center font-weight-bold mb-0">   
                                        <input type="checkbox" name="idPlayList" value="${data.id}" id="fcustomCheck1">
                                    </p>
                        `)
                    }
                }
            ]
        })


        $('.zm-navbar-item').on('click', async function() {

            let id = $(this).attr('data-id')
            if (id_genre == id) return

            isActive($(this))
            id_genre = $(this).attr('data-id');
            selectedIds = [];
            getGenre(id_genre);
            playListGenre = await getPlayList(id_genre);
            all_playList = playListGenre.data.play_list
            dataTable.clear().rows.add(all_playList).draw();
        })
        $('.menu-genre').on('click', 'li', async function() {
            const idGenre = $(this).attr('data-id');
            if (id_genre == idGenre) return
            selectedIds = [];
            id_genre = idGenre;
            getGenre(idGenre);
            playListGenre = await getPlayList(id_genre);
            all_playList = playListGenre.data.play_list
            dataTable.clear().rows.add(all_playList).draw();
        })

        function isActive(thisClass) {
            let navbarItem = $('.zm-navbar-item');
            for (const item of navbarItem) {
                $(item).removeClass('is-active')
            }
            $(thisClass).addClass('is-active');
        }
        $('#searchData').on('keyup', function() {
            dataTable.search($(this).val()).draw();
        })
     
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

        async function getPlayList(id) {
            try {
                let data = await new Promise((resolve, reject) => {
                    $.ajax({
                        method: 'get',
                        url: `{{ url('getPlayList').'/' }}{{ $topic->id }}/genre/${id}`,
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

        $('.tbody-PlayList').on('change', 'input[name="idPlayList"]', function() {
            var id = $(this).val();
            if ($(this).is(':checked')) {
                selectedIds.push(id);
            } else {
                selectedIds = selectedIds.filter(function(item) {
                    return item !== id;
                });
            }
        });
        $('.btn-more-playlist').on('click',function(){
           if (selectedIds == '') return 
            $('.loading').removeClass('loading-hidden')
            $.ajax({
                url: `{{ route('topics.insertPlaylist',$topic->id) }}`,
                method: 'post',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    'data': selectedIds
                },
                dataType: "json",
                success: async function(data) {
                    if (data.status) {
                        $('.loading').addClass('loading-hidden')
                        $('.successToast').trigger('click')
                        getGenre(id_genre)
                        playListGenre = await getPlayList(id_genre);
                        all_song = playListGenre.data.play_list
                        dataTable.clear().rows.add(all_song).draw();
                    }
                },
                error: function(error) {
                    console.log('lỗi');
                }
            })
        })
    })
</script>