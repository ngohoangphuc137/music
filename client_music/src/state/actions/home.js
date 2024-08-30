import actionType from "./actionType";
export const actionHome = (dataHome) => ({
    type: actionType.GET_HOME,
    home: dataHome
})