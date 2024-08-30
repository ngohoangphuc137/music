import Home from "~/pages/Home";
import Library from "~/pages/library";
import AlbumLayout from "~/pages/album";
import path from "~/utils/path";
import MusicFavorites from "~/pages/musicFavorites";

// Public Route 
const PublicRoutes = [
    {path:path.HOME,component:Home},
    {path:path.MY_MUSIC,component:Library},
    {path:path.ALBUM,component:AlbumLayout},
    {path:path.MUSIC_FAVORITES,component:MusicFavorites},
]

export { PublicRoutes }