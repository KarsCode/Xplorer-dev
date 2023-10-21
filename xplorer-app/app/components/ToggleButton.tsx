import { useState } from 'react';
import { Switch } from '@headlessui/react';

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);
  

  const toggleBackgroundColor = () => {
    // Get the element with the ID 'first'
    const element = document.getElementById('first');

    if (element) {
      // Toggle the background color
      element.style.backgroundColor = enabled ? 'black' : 'white';
    }

    const elements = document.getElementsByClassName('second');

    if (elements.length > 0) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = enabled ? 'white' : 'black';
    }
  }

  const element3 = document.getElementById('third');
  if (element3) {
    // Toggle the background color
    element3.style.color = enabled ? 'white' : 'black';
  }

  
  const elements4 = document.getElementsByClassName('fourth');

  if (elements4.length > 0) {
    for (let i = 0; i < elements4.length; i++) {
      elements4[i].style.color = enabled ? 'white' : 'black';
      elements4[i].style.backgroundColor = enabled? 'rgb(23 23 23)' : 'rgb(244 244 245)';
  }
 }


 const elements5 = document.getElementsByClassName('fifth');

 if (elements5.length > 0) {
   for (let i = 0; i < elements5.length; i++) {
     elements5[i].style.backgroundColor = enabled? 'rgb(38 38 38)' : 'rgb(244 244 245)';
 }
}


const elements6 = document.getElementsByClassName('sixth');

 if (elements6.length > 0) {
   for (let i = 0; i < elements6.length; i++) {
     elements6[i].style.color = enabled? 'white' : 'black';
 }
}


const elements7 = document.getElementsByClassName('seventh');

 if (elements7.length > 0) {
   for (let i = 0; i < elements7.length; i++) {
     elements7[i].style.color = enabled? 'white' : 'black';
     elements7[i].style.backgroundColor = enabled? 'rgb(23 23 23)' : 'rgb(244 244 245)';
 }
}



const elements8 = document.getElementsByClassName('eigth');

 if (elements8.length > 0) {
   for (let i = 0; i < elements8.length; i++) {
     elements8[i].style.backgroundColor = enabled? 'rgb(38 38 38)' : 'rgb(244 244 245)';
 }
}

const elements9 = document.getElementsByClassName('ninth');

 if (elements9.length > 0) {
   for (let i = 0; i < elements9.length; i++) {
     elements9[i].style.color = enabled? 'white' : 'black';
 }
}

const elements10 = document.getElementsByClassName('tenth');

 if (elements10.length > 0) {
   for (let i = 0; i < elements10.length; i++) {
     elements10[i].style.color = enabled? 'white' : 'black';
 }
}


const elements11 = document.getElementsByClassName('eleventh');

 if (elements11.length > 0) {
   for (let i = 0; i < elements11.length; i++) {
     elements11[i].style.color = enabled? 'white' : 'black';
     elements11[i].style.backgroundColor = enabled? 'black' : 'white';
 }
}
  const elements12 = document.getElementsByClassName('twelth');

  if (elements12.length > 0) {
    for (let i = 0; i < elements12.length; i++) {
      elements12[i].style.border = enabled? 'rgb(23,23,23)' : 'gray';
  }
 }
     // Toggle the state
     setEnabled(!enabled);
     
   };
  

  return (
    <div className="py-5">
      <Switch
        checked={enabled}
        onChange={toggleBackgroundColor}
        className={`${enabled ? 'bg-yellow-300' : 'bg-yellow-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default Toggle;