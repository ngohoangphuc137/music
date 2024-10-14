import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const MenuItem = ({ title, to, icon, token = false }) => {
    const maxW556px = useMediaQuery({ query: '(max-width:556px)' })
    const isActiveStyle = `py-3  flex items-center ${maxW556px ? 'pl-3 justify-start' : 'lg:px-[24px] sm:px-[0px] min-[300px]:px-[0px] lg:justify-start sm:justify-center min-[300px]:justify-center'} content-center text-[#dadada] bg-active-bg border-l-[3px] border-border-color-left-custom`;
    const notIsActiveStyle = `py-3  flex items-center ${maxW556px ? 'pl-3 justify-start' : 'lg:px-[24px] sm:px-[0px] min-[300px]:px-[0px] lg:justify-start sm:justify-center min-[300px]:justify-center'} content-center text-[#dadada] border-l-[3px] border-transparent`
    const { bearer_token } = useSelector(
        (state) => state.user
    );
    const handlcheckLogin = (e) => {
        if (token && bearer_token == null) {
            e.preventDefault();
            toast.warning("Hãy đăng nhập để vào trang này!");
        }
    }

    return (
        <NavLink to={to}
            onClick={(e) => handlcheckLogin(e)}
            className={({ isActive }) => isActive ? isActiveStyle : notIsActiveStyle}>
            {icon}
            <span className={`pl-[0.5rem] ${maxW556px ? 'block' : 'sm:hidden lg:block min-[300px]:hidden'} font-medium flex gap-[12px] text-[15px] justify-center`} >{title}</span>
        </NavLink>
    )
}
export default MenuItem