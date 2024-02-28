import React, { useEffect, useState } from 'react'
import InputModal from './InputModal';

const AiIcon = () => {

    const [isInputFocused, setInputFocused] = useState(false);
    const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
    const [openPopup,SetOpenPopup]=useState(false)
 
   
    useEffect(() => {
        const observer = new MutationObserver(() => {
          const messageInput = document.querySelector('.msg-form__contenteditable[contenteditable="true"][data-artdeco-is-focused="true"]');
          if (messageInput) {
            setInputFocused(true);
            const rect = messageInput.getBoundingClientRect();
            setInputPosition({ x: ((rect.x)+messageInput.clientWidth-40), y: (rect.y)+messageInput.clientHeight-40 });
        } else {
            setInputFocused(false);
        }
        });
    
        observer.observe(document.body, { subtree: true, childList: true });
    
        
        return () => observer.disconnect();
      }, []);
    

  return (
  <>


  <div style={{ top: `${inputPosition.y}px`, left: `${inputPosition.x}px` }} className="z-50 flex fixed top-32 right-8">
  {!!openPopup&&<InputModal SetOpenPopup={SetOpenPopup}/>}
     
   {isInputFocused?<img onClick={()=>SetOpenPopup(true)} className='cursor-pointer height-[25px] width-[25px]' src="https://firebasestorage.googleapis.com/v0/b/tweetx-project.appspot.com/o/images%2FIcon.svg?alt=media&token=13872b27-a2b8-4333-87cc-ad0c04e7a568" alt='icon'/>:""}
   </div>
  </>
  )
}

export default AiIcon