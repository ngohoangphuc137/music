import Home from "~/pages/Home";
import Library from "~/pages/library";
import AlbumLayout from "~/pages/album";
import path from "~/utils/path";
import MusicFavorites from "~/pages/musicFavorites";
import Artist from "~/pages/artist";
import ArtistListSong from "~/pages/artist/artistListSong";
import ArtistListAlbum from "~/pages/artist/artistListAlbum";
import Topic from "~/pages/topic";
import TopicDetail from "~/pages/topic/topicDetail";
import Song from "~/pages/song";
import PageSearch from "~/pages/search";
import SearchAll from "~/pages/search/searchAll";
import SearchSong from "~/pages/search/searchSong";
import SearchPlaylist from "~/pages/search/searchPlaylist";
import SearchArtist from "~/pages/search/searchArtist";
import GenreAlbum from "~/pages/genreAlbum";

// Public Route
const PublicRoutes = [
    { path: path.HOME, component: Home },
    { path: path.MY_MUSIC, component: Library },
    { path: path.ALBUM, component: AlbumLayout },
    { path: path.MUSIC_FAVORITES, component: MusicFavorites },
    { path: path.ARTIST, component: Artist },
    { path: path.ARTIST_SONG, component: ArtistListSong },
    { path: path.ARTIST_ALBUM, component: ArtistListAlbum },
    { path: path.TOPIC, component: Topic },
    { path: path.TOPIC_DETAIL, component: TopicDetail },
    { path: path.SONG, component: Song },
    {
        path: path.SEARCH, component: PageSearch,
        layoutChilrden: [
            {path: path.SEARCH_ALL ,component:SearchAll},
            {path: path.SEARCH_SONG ,component:SearchSong},
            {path: path.SEARCH_PLAYLIST ,component:SearchPlaylist},
            {path: path.SEARCH_ARTIST ,component:SearchArtist},
        ]
    },
    { path: path.GENRE_ALBUMS, component: GenreAlbum },
];

export { PublicRoutes };
