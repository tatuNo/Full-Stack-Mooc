import React from 'react';
import Part from '../components/Part';
import { CoursePart } from '../App';


const Content = ({ data }: { data: CoursePart[] }) => {
  return(
    <div>
      {data.map(c => 
        <Part key={c.name} content={c} />
      )}
    </div>
  )
}

export default Content;