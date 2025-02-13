import Logo from "../../assets/ticket-logo.png"
import Arrow from "../../assets/arrow.png"

const Links = [
    {id: 1, name: "Events", link: "/" },
    {id: 2, name: "My Tickets", link: "/" },
    {id: 3, name: "About Project", link: "/" },
]

const header = ()=> {
    
    return(
        <div className="header w-10/12 px-5 py-3 mt-4 m-auto border-2 rounded-3xl flex justify-between items-center">
            <img src={Logo} alt="" />
           <div className="hidden md:flex">
           <ul className="flex gap-9 font-semibold">
                {Links.map((data, index) => (
                    <li key={index}>
                    <a
                    className="inline-block text-md text-gray-400 hover:text-gray-200 "
                    href={data.link}>{data.name} </a>
                </li>
                ))}               
            </ul>
           </div>
           <button className="bg-white hover:bg-gray-300 px-4 py-3 text- rounded-xl flex items-center gap-3 cursor-pointer ">MY TICKET <img src={Arrow} alt="" /> </button>
       </div>
    )
}

export default header