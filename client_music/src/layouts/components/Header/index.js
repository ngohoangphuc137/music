import { memo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import { Modal, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { useMediaQuery } from 'react-responsive'

import Icons from "~/components/icons";
import Search from "../search";
import image from "~/assets/images";
import InformationUser from "~/components/itemInformation/informationUser";
import {
    setIsOpenRegiter,
    setIsOpenLogin,
    setTokenUser,
    setInfoUser,
} from "~/state/actions/user";
import {
    loginServicer,
    registerServicer,
    loginGoogleServicer,
} from "~/services/authServicer";

const { GoArrowLeft, GoArrowRight, LuLoader2, IoEyeOff, IoEye, LogoGoogle, CiMenuBurger } =
    Icons;

const Header = () => {
    const location = useLocation();
    const [historyStateIdx, setHistoryStateIdx] = useState(0);
    const [back, setBack] = useState(false);
    const [forward, setForward] = useState(false);
    const { isOpenRegiter, isOpenLogin, bearer_token } = useSelector(
        (state) => state.user
    );
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loadGoogle, setLoadGoogle] = useState(false);
    const isSearch = useMediaQuery({ query: '(max-width:630px)' })
    const maxW556px = useMediaQuery({ query: '(max-width:556px)' })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email không đúng định dạng!")
                .required("Trường email là bắt buộc!")
                .matches(
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    "Email không đúng định dạng!"
                ),
            password: Yup.string().required("Trường mật khẩu là bắt buộc!"),
        }),
        onSubmit: async (value, { resetForm }) => {
            setLoadingLogin(true);
            const response = await loginServicer(value);
            resetForm();
            if (response.data.status === 200) {
                if (typeof response.data.token !== "undefined") {
                    const dataInfo = response.data.info;
                    dispatch(setTokenUser(response.data.token));
                    dispatch(
                        setInfoUser(
                            dataInfo.name,
                            dataInfo.liked_songs,
                            dataInfo.liked_playlists,
                            dataInfo.followed_artists,
                            dataInfo.created_playlists
                        )
                    );
                    toast.success("Đăng nhập thành công");
                }
            } else {
                toast.error("Đăng nhập thất bại!");
            }
            setLoadingLogin(false);
            dispatch(setIsOpenLogin(false));
        },
    });

    const formikRegister = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Trường tên là bắt buộc!"),
            email: Yup.string().required("Trường email là bắt buộc!"),
            password: Yup.string().required("Trường password là bắt buộc!"),
            confirmpassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp!")
                .required("Trường confirm Password là bắt buộc!"),
        }),
        onSubmit: async (value, { resetForm }) => {
            setLoadingLogin(true);
            const { confirmpassword, ...data } = value;
            const response = await registerServicer(data);
            resetForm();
            if (response.data.status === 422) {
                if (typeof response.data?.errors) {
                    toast.warning(response.data.errors?.email[0], {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setShowPassword(false);
                    setShowConfirmPassword(false);
                }
            }
            if (response.data.status === 201) {
                toast.success("Đăng ký thành công", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(setIsOpenRegiter(false));
            }
            setLoadingLogin(false);
        },
    });

    useEffect(() => {
        if (isOpenLogin) formik.resetForm();
        if (isOpenRegiter) formikRegister.resetForm();
        setShowPassword(false);
        setShowConfirmPassword(false);
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [isOpenLogin, isOpenRegiter]);

    const dispatch = useDispatch();
    const handleCancelRegister = () => {
        dispatch(setIsOpenRegiter(!isOpenRegiter));
    };
    const handleCancelLogin = () => {
        dispatch(setIsOpenLogin(!isOpenLogin));
    };

    useEffect(() => {
        setHistoryStateIdx(window.history.state.idx);
        if (window.history.state.idx === 0) {
            setBack(false);
            setForward(false);
            return;
        }
        if (window.history.state.idx >= 1) setBack(true);
        window.history.state.idx < historyStateIdx
            ? setForward(true)
            : setForward(false);

        /* eslint-disable react-hooks/exhaustive-deps */
    }, [location]);

    const goBack = () => {
        if (window.history.state.idx === 0) return;
        window.history.back();
    };
    const goForward = () => {
        if (window.history.state.idx === 0) return;
        window.history.forward();
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoadGoogle(true);
            const { access_token } = tokenResponse;
            const response = await loginGoogleServicer(access_token);
            if (response.data.status === 200) {
                dispatch(setTokenUser(response.data.token));
                const dataInfo = response.data.info;

                dispatch(
                    setInfoUser(
                        dataInfo.name,
                        dataInfo.liked_songs,
                        dataInfo.liked_playlists,
                        dataInfo.followed_artists,
                        dataInfo.created_playlists
                    )
                );
                dispatch(setIsOpenLogin(false));
                toast.success("Đăng nhập thành công");
            } else {
                toast.error("Đăng nhập không thành công!");
            }
            setLoadGoogle(false);
        },
        onError: (error) => {
            setLoadGoogle(false);
            console.log("login google failed", error);
        },
    });
    const toggleSideBar = () => {
        let slibarLeft = document.querySelector('.left-slidebar');
        if (slibarLeft.classList.contains('left-slidebar0')) {
            slibarLeft.classList.remove('left-slidebar0')
        } else {
            slibarLeft.classList.add('left-slidebar0')
        }
    }

    return (
        <>
            <header className="zm-header lg:h-[70px] md:h-[60px] sm:h-[60px] flex items-center sticky top-0 right-0 z-[100] left-[240px] min-[300px]:left-0 px-[59px] sm:px-[20px] min-[300px]:px-3">
                <div className="text-white z-20 flex justify-between items-center w-[100%]">
                    <div className="flex items-center flex-1">
                        {!isSearch && (
                            <>
                                <button onClick={goBack}>
                                    <GoArrowLeft
                                        size={24}
                                        className={back ? "mr-[20px]" : "mr-[20px] text-color-custom"}
                                    />
                                </button>
                                <button onClick={goForward}>
                                    <GoArrowRight
                                        size={24}
                                        className={
                                            forward ? "mr-[20px]" : "mr-[20px] text-color-custom"
                                        }
                                    />
                                </button>
                            </>
                        )}

                        <Search />
                    </div>
                    {maxW556px && (<span onClick={toggleSideBar} className="mr-3 cursor-pointer"><CiMenuBurger size={21} /></span>)}
                    <div>
                        <HeadlessTippy
                            interactive="true"
                            placement="bottom-start"
                            trigger="click"
                            render={() => (
                                <div>
                                    <InformationUser />
                                </div>
                            )}
                        >
                            <button>
                                <figure className="w-[38px] h-[38px] rounded-[999px] overflow-hidden">
                                    <img
                                        className="h-auto w-[100%] inline-block align-top"
                                        src={
                                            bearer_token !== null
                                                ? "https://s120-ava-talk-zmp3.zmdcdn.me/e/9/5/3/2/120/014ce0d9753e7fbb3ad32c4f53120086.jpg"
                                                : image.use
                                        }
                                        alt="ImageUser"
                                    />
                                </figure>
                            </button>
                        </HeadlessTippy>
                    </div>
                </div>

            </header>
            <Modal
                title="Đăng ký tài khoản"
                open={isOpenRegiter}
                onCancel={handleCancelRegister}
                footer={null}
            >
                <form onSubmit={formikRegister.handleSubmit}>
                    <div className="flex flex-col my-1">
                        <label className="font-normal">Name</label>
                        <Input
                            id="name"
                            name="name"
                            value={formikRegister.values.name}
                            onChange={formikRegister.handleChange}
                            placeholder="Tên tài khoản"
                        />
                        {formikRegister.errors?.name && (
                            <p className="text-red-600">{formikRegister.errors?.name}</p>
                        )}
                    </div>
                    <div className="flex flex-col my-1">
                        <label className="font-normal">Email</label>
                        <Input
                            name="email"
                            value={formikRegister.values.email}
                            onChange={formikRegister.handleChange}
                            placeholder="Email"
                        />
                        {formikRegister.errors?.email && (
                            <p className="text-red-600">{formikRegister.errors?.email}</p>
                        )}
                    </div>
                    <div className="flex flex-col my-1">
                        <label className="font-normal">Password</label>
                        <div className="relative">
                            <Input
                                type={!showPassword ? "password" : "text"}
                                className="pr-7"
                                name="password"
                                value={formikRegister.values.password}
                                onChange={formikRegister.handleChange}
                                placeholder="Mật khẩu"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer absolute top-[5px] right-2 z-20 overflow-hidden"
                            >
                                {!showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </span>
                        </div>
                        {formikRegister.errors?.password && (
                            <p className="text-red-600">{formikRegister.errors?.password}</p>
                        )}
                    </div>
                    <div className="flex flex-col my-1">
                        <label className="font-normal">Confirm Password</label>
                        <div className="relative">
                            <Input
                                type={!showConfirmPassword ? "password" : "text"}
                                name="confirmpassword"
                                value={formikRegister.values.confirmpassword}
                                onChange={formikRegister.handleChange}
                                placeholder="Kiểm tra mật khẩu"
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="cursor-pointer absolute top-[5px] right-2 z-20 overflow-hidden"
                            >
                                {!showConfirmPassword ? (
                                    <IoEyeOff size={20} />
                                ) : (
                                    <IoEye size={20} />
                                )}
                            </span>
                        </div>
                        {formikRegister.errors?.confirmpassword && (
                            <p className="text-red-600">
                                {formikRegister.errors?.confirmpassword}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end pt-1">
                        <div className="relative">
                            <button
                                type={loadingLogin ? "button" : "submit"}
                                className="p-1 rounded select-none delay-[0.7s] flex justify-end items-center border-zinc-600 font-normal border-[1px] border-solid"
                            >
                                {loadingLogin && (
                                    <LuLoader2 size={18} className="mr-2 loaderSong" />
                                )}
                                Đăng ký
                            </button>
                            {loadingLogin && (
                                <div className="absolute w-[100%] h-[100%] rounded bg-[rgba(255,250,250,0.5)] top-0 left-0 z-20"></div>
                            )}
                        </div>
                    </div>
                </form>
            </Modal>
            <Modal
                title="Đăng nhập tài khoản"
                open={isOpenLogin}
                onCancel={handleCancelLogin}
                footer={null}
                className="px-7"
            >
                <div className="relative">
                    <form onSubmit={formik.handleSubmit} className="px-4">
                        <div className="flex flex-col my-1">
                            <label className="font-normal">Email</label>
                            <Input
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                placeholder="Email"
                            />
                            {formik.errors?.email && isOpenLogin && (
                                <p className="text-red-600">{formik.errors?.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col my-1">
                            <label className="font-normal">Password</label>
                            <div className="relative">
                                <Input
                                    type={!showPassword ? "password" : "text"}
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Password"
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer absolute top-[5px] right-2 z-20 overflow-hidden"
                                >
                                    {!showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                </span>
                            </div>
                            {formik.errors?.password && isOpenLogin && (
                                <p className="text-red-600">{formik.errors?.password}</p>
                            )}
                        </div>
                        <div className="flex justify-end pt-1 items-center">
                            <div className="relative">
                                <button
                                    type={loadingLogin ? "button" : "submit"}
                                    className="p-1 rounded select-none delay-[0.7s] flex justify-end items-center border-zinc-600 font-normal border-[1px] border-solid"
                                >
                                    {loadingLogin && (
                                        <LuLoader2 size={18} className="mr-2 loaderSong" />
                                    )}
                                    Đăng nhập
                                </button>
                                {loadingLogin && (
                                    <div className="absolute w-[100%] h-[100%] rounded bg-[rgba(255,250,250,0.5)] top-0 left-0 z-20"></div>
                                )}
                            </div>
                        </div>
                    </form>
                    <div className="w-auto px-4">
                        <div className="flex items-center justify-center text-[17px] font-semibold select-none">
                            Hoặc
                        </div>
                        <button
                            onClick={() => loginGoogle()}
                            className="w-full flex items-center border-[1px] mt-3 border-solid h-10 border-[#d3dbef] rounded-md cursor-pointer"
                        >
                            <div className="w-full flex items-center h-7 ml-4">
                                <span className="mr-2">
                                    <LogoGoogle width={30} />
                                </span>
                                <p className="text-[16.5px] font-medium select-none">
                                    Đăng nhập bằng Google
                                </p>
                            </div>
                        </button>
                    </div>
                    {loadGoogle && (
                        <div className="absolute w-[100%] h-[100%] rounded bg-[rgba(255,250,250,0.5)] top-0 left-0 z-20">
                            <span className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
                                <LuLoader2
                                    size={40}
                                    className="mr-2 loaderSong text-[#4f4d4d]"
                                />
                            </span>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};
export default memo(Header);
