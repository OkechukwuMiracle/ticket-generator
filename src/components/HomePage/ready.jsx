import Header from '../Navbar/header'
import ReadyBg from "../../assets/ready_bg.png"
import QrCode from "../../assets/qr-code.png" 
import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import html2canvas from "html2canvas";

const ready = () => {
    const navigate = useNavigate();
    const ticketRef = useRef(null);

    const ticketDetails = JSON.parse(localStorage.getItem("ticketDetails"));
  const attendeeDetails = JSON.parse(localStorage.getItem("attendeeDetails"));

   const downloadTicket = () => {
    if (!ticketRef.current) return;

    setTimeout(() => {
    html2canvas(ticketRef.current, { 
      scale: 2,
      useCORS: true, // Allows loading external images
      allowTaint: true, //  Prevents cross-origin issues

     }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Techember_Ticket.png";
      link.click();
    });
  }, 3000);  //Waits 3 second for images to load
  }

  return (
    <div>
        <Header />
        <div className="selection_container max-w-screen-sm  mt-7 p-7 m-auto border-2 rounded-3xl">
        <div className="step_container md:flex justify-between items-center w-full pb-3 relative">
          <h1 className="h1_line text-white text-2xl">Ready</h1>
          <p className="p_line text-gray-300 text-lg">step 3 / 3</p>
          <span className="absolute w-10/12 md:w-1/3"></span>
        </div>

        <div className='text-center mt-5'>
            <h2 className='text-white font-bold text-3xl'>Your Ticket is Booked!</h2>
            <p className='text-gray-300 font-semibold mt-5'>Check your email for a copy or you can download</p>
        </div>

            {/* Ticket Section (To be captured) */}
        <div className='relative mt-10' ref={ticketRef}>  
            <img src={ReadyBg} alt="" className='m-auto' />
            <div className='ready_container border absolute top-6 md:left-40 rounded-xl'>
            <h1 className="techember_h1 text-3xl text-white absolute top-3 left-11">
              Techember Fest "25
            </h1>
            <p className='absolute top-11 text-gray-300 text-sm left-6'>📍 04 Runners road, Ikoyi, Lagos.</p>
            <p className='absolute top-16 text-gray-300 text-sm left-9'>📆 March 15,2025 | 7:00pm</p>
            
            {/* Handles imnage uplaoad */}
            <img src={attendeeDetails?.avatar} alt="Avatar" crossOrigin="anonymous"  className='img_upload w-1/2 h-1/4 border-4 rounded-2xl absolute top-28 left-16' />

            <div className='ticket_req w-11/12 border absolute top-60 left-3 p-1 rounded-xl'>
                <div className='mb_input flex gap-1 border-b-2'>
                    <div  className='mb_input w-1/2 border-r-2 overflow-x-auto whitespace-nowrap scrollabar-hide'>
                        <p className='text-sm text-gray-400 pr-'>Enter your name</p>
                        <p className="text-white text-sm mt-2 inline-flex">{attendeeDetails?.fullName}</p>
                    </div>

                    <div className='mb_input w-1/2 overflow-x-auto whitespace-nowrap scrollabar-hide'>
                        <p className='text-sm text-gray-400 pl-1' >Enter your email*</p>
                        <p className="text-gray-300 text-s mt-2 inline-flex">{attendeeDetails?.email}</p>
                    </div>
                </div>

                <div className='mb_input flex gap-1 border-b-2'>
                    <div  className='mb_input w-1/2 border-r-2'>
                        <p className='text-sm text-gray-400'>Ticket Type:</p>
                        <p className="text-white text-sm mt-2" >{ticketDetails?.type}</p>
                    </div>

                    <div className='mb_input w-1/2 '>
                        <label className='text-sm text-gray-400 pl-1' >Ticket For:</label>
                        <p className="text-gray-300 text-sm mt-2 ">{ticketDetails?.quantity}</p>
                    </div>
                </div>

                {/* Display Textarea Input */}
          <div className="mt-2">
            <p className="text-gray-400 text-sm">Special Request?</p>
            <p className="text-gray-300 text-sm pt-1 rounded-md">{attendeeDetails?.textArea}</p>
          </div>
            </div>

                
            </div>
            {/* QR Code */}
            <div id="qrCode" className="absolute bottom-5 left-10 md:left-44">
                    <img src={QrCode} alt="QR Code" crossOrigin="anonymous" />
                </div>
        </div>

          {/* handles buttons */}
          <div className="btn_2 justify-between gap-5 mt-5">
            <button
              onClick={() => navigate("/")}
              className="btn_1 md:w-1/2 border-2 p-3 text-xl rounded-xl"
            >
              Book Another Ticket
            </button>
            <button
              type="button"
              onClick={downloadTicket}
              className="btn_1 md:w-1/2 border-2 p-3 text-xl rounded-xl"
            >
              Download Ticket
            </button>
          </div>
        </div>
      
    </div>
  )
}

export default ready
