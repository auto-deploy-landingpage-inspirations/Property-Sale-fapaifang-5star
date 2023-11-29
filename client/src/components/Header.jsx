import { React, useState } from 'react'
import { BsJustifyRight, BsMessenger, BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import MobileMenu from './mobileMenu'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './ProfileOption'
import { setSearchTermState } from '../redux/search/searchSlice'
import { FaSignInAlt } from 'react-icons/fa'
import { MdOutlineClose } from "react-icons/md";




const Header = () => {
    const [isActiveMoblie, setisActiveMoblie] = useState(false)
    const { currentUser } = useSelector((state) => state.user)
    const { notificationsDB } = useSelector(state => state.notification)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search`)
        setSearchValue("")
    }



    return (
        <>
            <div className="navbar pl-0 pr-0 pt-3 pb-3 bg-slate-300 shadow-md">

                <div className="px-5  max-w-screen-xl w-full !mx-auto grid grid-cols-12 gap-1">
                    {/* Logo container  */}
                    <div className="col-span-3 sm:col-span-4">

                        <h1 className="font-blach sm:text-xl text-sm text-left hover:bg-transparent uppercase text-brand-blue tracking-tighter w-full font-heading font-bold flex items-center justify-start">
                            <Link to={'/home'} className='flex items-center justify-start'>
                                <img className='w-8 h-8' src="https://img.icons8.com/sf-black-filled/64/313a67/home.png" alt="logo" />
                                <span className='hidden sm:block'>Property Sale</span>
                            </Link>
                        </h1>

                    </div>

                    {/* search Form  */}
                    <div className="col-span-6 sm:col-span-3  md:col-span-4">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control w-full max-w-full   sm:max-w-sm  flex flex-row mx-auto items-center justify-center relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="search"
                                    onChange={(e) => {
                                        dispatch(setSearchTermState(e.target.value)),
                                            setSearchValue(e.target.value)
                                    }}
                                    value={searchValue}
                                />
                                <button type='submit' className='search_btn bg-brand-blue'>
                                    <i className='text-center text-white font-bold'><BsSearch /></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/*========= when user login ======== */}
                    <div className="col-span-3 sm:col-span-5  md:col-span-4 flex items-center justify-end">
                        <ul className="hidden sm:ml-5 sm:flex items-center justify-end  pr-4 font-semibold text-brand-blue font-content ">
                            <li className='mr-6 capitalize'>
                                <Link to='/home'>Home</Link>
                            </li>
                            <li className='mr-6 capitalize'>
                                <Link to='/about'>About</Link>
                            </li>
                            <li className='mr-6 capitalize text-lg text-brand-blue'>
                                <Link to={`${currentUser ? "/message" : "/login"}`}>
                                    <span className='relative'>
                                        <BsMessenger className='z-10' />
                                        {
                                            notificationsDB.length === 0
                                                ?
                                                <p className={`text-xs px-[2px] font-heading font-medium bg-lime-600 text-white absolute  top-[-13px] right-[-14px]  flex items-center justify-center rounded-sm`}>new</p>
                                                :
                                                <p className={`text-[11px] font-content font-medium bg-[#c00] text-white absolute  top-[-10px] h-4 ${notificationsDB.length < 9 ? "w-3 right-[-8px]" : "w-4 right-[-10px]"} flex items-center justify-center rounded-sm`}>{notificationsDB.length}</p>
                                        }
                                    </span>
                                </Link>
                            </li>
                            {
                                currentUser ?
                                    <Profile user={currentUser} />
                                    :
                                    <li className='mr-6 capitalize'>
                                        <Link to='/login' className='flex items-center justify-end'>
                                            Login <FaSignInAlt className='ml-1 mt-[2px] text-brand-blue' />
                                        </Link>
                                    </li>
                            }

                        </ul>

                        <div className="nav_mobile flex items-center justify-center sm:hidden gap-1">
                            {/* User Profile Image  */}
                            {/* {currentUser && <Profile user={currentUser} />} */}

                            <Link to={`${currentUser ? "/message" : "/login"}`} className='mr-1 text-lg  text-brand-blue'>
                                <span className='relative'>
                                    <BsMessenger className='z-10' />
                                    {
                                        notificationsDB.length === 0
                                            ?
                                            <p className={`text-xs px-[2px] font-heading font-normal bg-lime-600 text-white absolute  top-[-13px] right-[-9px]  flex items-center justify-center rounded-sm`}>new</p>
                                            :
                                            <p className={`text-[11px] font-content font-medium bg-[#c00] text-white absolute  top-[-10px] h-4 ${notificationsDB.length < 9 ? "w-3 right-[-8px]" : "w-4 right-[-10px]"} flex items-center justify-center rounded-sm`}>{notificationsDB.length}</p>
                                    }
                                </span>
                            </Link>

                            <button
                                className="btn btn-ghost p-1 hover:bg-transparent text-lg"
                                onClick={() => setisActiveMoblie(!isActiveMoblie)}
                            >
                                {
                                    isActiveMoblie ? <MdOutlineClose className='text-red-600 font-bold' /> : <BsJustifyRight className='text-brand-blue' />
                                }

                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {
                isActiveMoblie && <MobileMenu menuStatus={{ isActiveMoblie, setisActiveMoblie }} />
            }
        </>

    )
}

export default Header