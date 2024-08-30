import { NavLink } from "react-router-dom"

const isActiveStyle = 'py-3 px-[24px] flex items-center content-center text-[#dadada] bg-active-bg border-l-[3px] border-border-color-left-custom';
const notIsActiveStyle = 'py-3 px-[24px] flex items-center content-center text-[#dadada] border-l-[3px] border-transparent'
const MenuItem = ({title,to,icon})=>{
    return(
        <NavLink to={to} className={({isActive})=>isActive ? isActiveStyle : notIsActiveStyle}>
            {icon}
            <span className="pl-[0.5rem] font-medium flex gap-[12px] text-[15px] justify-center" >{title}</span>
        </NavLink>
    )
}
export default MenuItem