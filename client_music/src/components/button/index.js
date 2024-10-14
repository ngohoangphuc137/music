const Button = ({ handl, ishandl = false, icon, value, iconNext }) => {
  return (
    <button
      onClick={() => {
        if (ishandl) handl()
      }}
      className="flex w-full items-center py-[10px] pl-3 pr-[20px]" >
      <span className="mr-[13px]" >{icon}</span>
      {value}
      {iconNext ? (<span className="flex-1 flex justify-end">{iconNext}</span>) : ''}
    </button>
  )
}
export default Button