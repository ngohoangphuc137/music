import actionType from "./actionType";
export const setInfoSongArtist = (idArtist,nameArtist) => (
    {
        type:actionType.SET_INFOARTIST,
        id:idArtist,
        name:nameArtist
    }
);
