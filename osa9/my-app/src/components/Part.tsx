import React from 'react';
import { CoursePart } from '../App';

const Part = ({ content }: { content: CoursePart }) => {
  
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  const header = () => (
    <div>
      <b>{content.name} {content.exerciseCount}</b>
    </div>
  )

  switch(content.type) {
    case "normal":
      return(
        <div>
          {header()}
          <div>
            <em>{content.description}</em>
          </div>
        </div>
        )
    case "groupProject":
      return(
        <div>
          {header()}
          <div>
            <a>project exercises {content.exerciseCount}</a>
          </div>
        </div>
        )
    case "submission":
      return(
        <div>
          {header()}
          <div>
            <em>{content.description}</em>
          </div>
          <div>
            <a>submit to {content.exerciseSubmissionLink}</a>
          </div>
        </div>
      )
    case "special":
      return (
        <div>
          {header()}
          <div>
            <a>required skills: </a>
            {content.requirements.map(requirment =>
            <li key={requirment}>
              {requirment}
              </li> 
              )}
          </div>
        </div>
      )
    default:
      return assertNever(content);
  }
};

export default Part;