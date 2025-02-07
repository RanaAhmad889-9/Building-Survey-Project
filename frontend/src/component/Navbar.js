import { useState } from "react";

const Navbar = ({ setnavdis }) => {
    const [open, setopen] = useState(false);

    const links = [
        { name: "Home", link: "#intro" },
        { name: "Upload Image", link: "#imageupload" },
        { name: "About", link: "#about" },
       
    ];

    return (
        <>
            <div className="shadow-md w-full fixed top-0 left-0 z-50">
                <div className="md:flex items-center justify-between bg-black md:bg-black py-3 md:px-4 px-7">
                    <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white">
                        <span className="text-3xl text-white mr-1 pt-2">
                            <ion-icon name="earth-outline"></ion-icon>
                        </span>
                        Building Survey
                    </div>

                    <div
                        onClick={() => setopen(!open)}
                        className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
                    >
                        <ion-icon  style={{ color: 'white' }} name={open ? "close-outline" : "menu"}></ion-icon>
                    </div>

                    <ul
                        className={`md:flex bg-white md:items-center md:pb-0 pb-12 absolute md:bg-black sm:bg-white md:static md:z-auto z-[-1]
                        left-0 w-full md:w-auto md:pl-0 pl-9 translate-all duration-500 ease-in ${open ? "top-20 opacity-100" : "top-[-490px]"} md:opacity-100 opacity-0`}
                    >
                        {links.map((link) => (
                            <li key={link.name} className="md:ml-8 text-2xl md:my-0 my-7">
                                <a href={link.link} className=" md:text-white md:hover:text-gray-500 duration-500">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                        <li className="md:hidden text-2xl mt-4">
                            <button
                                onClick={() => setnavdis(false)}
                                className="w-32 px-2 py-1 text-black rounded-full ease-inout transition delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 hover:text-white"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>

                    <button
                        onClick={() => setnavdis(false)}
                        className="hidden md:block px-3 py-1 text-white rounded-full ease-inout transition delay-150 hover:-translate-y-1 hover:scale-110 hover:text-gray-300 duration-300 hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;



