// import React from react  means:
// React is a library  and react is react-package
// let me give you example:- suppose Jazz need coffee then he go to cafe and take coffee and came back .
// key points: coffee is react-package and the cafe is react-library.and Jazz is Import
import React from 'react'
import { people } from './data.js';
// import { getImageUrl } from './Profile';
// Profile is a filename  and getImageUrl is file's function
// let me give you example:- suppose Jazz need coffee then he go to cafe and take coffee and came back .
// key points: coffee is file's function and the cafe is file and Jazz is Import

import { getImageUrl } from './Profile'
export default function Navbar (){
    const listItems = people.map(person =>
        <li key={person.id}>
          <img
            src={getImageUrl(person)}
            alt={person.name}
          />
          <p>
            <b>{person.name}</b>
              {' ' + person.profession + ' '}
              known for {person.accomplishment}
          </p>
        </li>
      );
      return <ul>{listItems}</ul> 
    }
    