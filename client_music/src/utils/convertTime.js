const convertTime = (duration) => {
    const minute = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
    const time = '0'+minute + ':' + (seconds > 10 ? seconds : '0' + seconds)
    return time
}
export default convertTime