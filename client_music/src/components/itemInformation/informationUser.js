import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setIsOpenRegiter, setIsOpenLogin } from "~/state/actions/user";
import Icons from "../icons";
import { logoutServicer } from "~/services/authServicer";
import { setTokenUser, clearInfoUser } from "~/state/actions/user";
import { toast } from "react-toastify";
import { Modal, Button } from "antd";

const { MdOutlineLogout, LuLoader2 } = Icons;

const InformationUser = () => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { isOpenRegiter, isOpenLogin, bearer_token, info_user } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();

    const openModalLogout = () => {
        setOpen(true)
    };
    const handlLogout = async () => {
        const response = await logoutServicer(bearer_token);
        if (response.data.status === 200) {
            dispatch(setTokenUser(null));
            dispatch(clearInfoUser());
            setOpen(false)
            setLoading(false)
            toast.success("Đăng xuất thành công");
        } else {
            toast.error("Đăng xuất thất bại!");
        }
        setLoading(true)
    }

    return (
        <div className="w-[300px] bg-[#34224f] rounded-lg p-[6px]">
            <ul className="w-full">
                {/*  */}
                {bearer_token !== null ? (
                    <>
                        <li className="rounded-sm p-2 mb-2">
                            <div className="flex mb-4 items-center">
                                <div className="mr-3 rounded-full overflow-hidden w-[60px] h-[60px]">
                                    <img
                                        className="w-full h-auto"
                                        src="https://s120-ava-talk-zmp3.zmdcdn.me/e/9/5/3/2/120/014ce0d9753e7fbb3ad32c4f53120086.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <p className="text-[16.5px] font-semibold leading-4 mb-[6px] text-white">
                                        {info_user?.name}
                                    </p>
                                    <p className="text-[20px] leading-[66%] w-1 h-2"></p>
                                </div>
                            </div>
                        </li>
                        <li
                            className="hover:bg-border-player text-[#fff] rounded relative"
                        >
                            <button
                                onClick={() => {
                                    openModalLogout()
                                }}
                                className="flex w-full items-center py-[10px] pl-3 pr-[20px]" >
                                <span className="mr-[13px]" ><MdOutlineLogout size={20} /></span>
                                Đăng xuất
                            </button>

                        </li>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => dispatch(setIsOpenRegiter(!isOpenRegiter))}
                            className="w-full flex items-center justify-center bg-[#9b4de0] rounded-[20px] text-white h-10 font-semibold leading-5 text-[15px] mt-2 mb-3"
                        >
                            Đăng ký
                        </button>
                        <button
                            onClick={() => dispatch(setIsOpenLogin(!isOpenLogin))}
                            className="w-full flex items-center justify-center bg-[#9b4de0] rounded-[20px] text-white h-10 font-semibold leading-5 text-[15px] mt-2 mb-3"
                        >
                            Đăng nhập
                        </button>
                    </>
                )}
            </ul>
            <Modal
                title="Xác nhận đăng xuất"
                centered
                open={open}
                onOk={() => setOpen(true)}
                onCancel={() => setOpen(false)}
                maskClosable={false}
                footer={null}
                width={750}
            >
                <p className="select-none" >Bạn có chắc chắn muốn đăng xuất khỏi Zing Music<br />
                    Hành động này sẽ đăng xuất tài khoản bạn  trên trình duyệt</p>
                <div className="w-full flex items-center justify-end mt-2">
                    <div className="relative">
                        <Button
                            onClick={() => setOpen(false)}
                            className="mr-1">Không</Button>
                        {loading && <div className="absolute w-[100%] h-[100%] rounded bg-border-player top-0 left-0 z-20"></div>}
                    </div>
                    <div className="relative">
                        <Button onClick={handlLogout} type="primary" className="delay-1000">
                            Đăng xuất
                            {loading && <span className="flex-1 flex justify-end"><LuLoader2 size={18} className="loaderSong" /></span>}
                        </Button>
                        {loading && <div className="absolute w-[100%] h-[100%] rounded bg-border-player top-0 left-0 z-20"></div>}
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default InformationUser;
