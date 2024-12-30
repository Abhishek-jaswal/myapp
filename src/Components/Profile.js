
import './/css/Profile.css';
import  Navbar from './Navbar';

export function getImageUrl(person) {
    return (
      'https://i.imgur.com/' +
      person.imageId +
      's.jpg'
    );
  }
  
    
function Gellery(){
    return(
      <img src={"https://i.imgur.com/QIrZWGIs.jpg"} alt="men"/>
    );
}


export default function Profile() {
  return (
   <>
    <Navbar/>
      <h1>Images For Practical</h1>~
      <Gellery/>
      <Gellery/>
      <Gellery/>

   </>
  )
}

