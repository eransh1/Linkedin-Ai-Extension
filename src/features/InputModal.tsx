import React, { Fragment, useEffect, useState } from 'react'
import { FaGooglePlay } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { FaLongArrowAltDown } from "react-icons/fa";
const InputModal = ({SetOpenPopup}) => {
    const [showAiMessageModal,setShowAiMessageModal]=useState<boolean>(false)
    const [message,setMessage]=useState<string>("")
    const [userMsg,setUserMsg]=useState<string>("")
    const generatedText=`Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`
    
function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
setMessage(e.target.value)
}

function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault()
setShowAiMessageModal(true)
setUserMsg(message)
setMessage("")
}

function closePopup () {
    setMessage("")
    setUserMsg("")
    setShowAiMessageModal(false)
    SetOpenPopup(false)
};

useEffect(() => {
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            // Call your function here
            closePopup();
        }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
    document.removeEventListener("keydown", handleKeyDown);
    };
}, []);

function handleInsertIntoInputBox(){
    const divElement =document.querySelector('.msg-form__contenteditable[contenteditable="true"]')
    if (divElement) {
        const paragraphElement = divElement.querySelector('p');
    
        if (paragraphElement) {
            const placeholderDiv = document.querySelector('.msg-form__placeholder');
           
            if (placeholderDiv) {
                const placeholderStyle = (document.querySelector('.msg-form__placeholder')as HTMLElement)?.style;
                placeholderStyle.display='none'
            }
            paragraphElement.innerHTML=generatedText; // Update the inner HTML as needed
            closePopup()
        }
    }
    

}

  return (
    <>
    <section className='z-50 w-full h-screen bg-black bg-opacity-60 fixed top-0 left-0 flex'>
    <form onSubmit={handleFormSubmit} className='m-auto w-[470px] rounded-[15px] p-[15px] bg-[#F9FAFB] flex flex-col gap-3'>

   {!!showAiMessageModal&&<Fragment>
   <p className='ml-auto bg-[#DFE1E7] text-[#666D80] w-[200px] break-words p-2 rounded-md'>{userMsg}</p>

    <p className='bg-[#DBEAFE] text-[#666D80] w-[300px] break-words p-2 rounded-md'>{generatedText}</p>
   </Fragment>}

    <input value={message} onChange={handleInputChange} className='focus:outline-none text-base text-[#666D80] px-4 w-full h-[31px] border-gray-200 border-2 rounded-[4px]' type="text" placeholder='Your prompt' required/>
    {showAiMessageModal?<div className='flex items-center gap-4 w-full'>
    <p onClick={handleInsertIntoInputBox} className='cursor-pointer flex items-center content-center gap-1 text-[1.15rem] ml-auto bg-[transparent] px-3 py-[0.15rem] text-[#666D80] border-2 border-[#666D80] rounded'><FaLongArrowAltDown size={12}/> Insert</p>
    <p className='cursor-pointer flex items-center content-center gap-2 text-[1.15rem] bg-[#3B82F6] px-3 py-1 text-white rounded'><FiRefreshCw size={12}/> Regenerate</p>
    </div>:
    <button type='submit' className='flex items-center content-center gap-2 text-[1.15rem] ml-auto bg-[#3B82F6] px-3 py-2 text-white rounded'><FaGooglePlay size={12}/>Generate</button>
    }
    </form>
    </section>
    </>
  )
}

export default InputModal