import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react'

type Props = {
    value:string;
    icon:IconDefinition;
    onClick :() =>void;
    label:ReactNode;
    keyName:string;
    defaultCkecked?:boolean;
}

const LabelRadioButton = ({value,icon,keyName,label,onClick,defaultCkecked=false}:Props) => {
  return (
  
          <label   className="radio-btn group text-sm md:text-lg">
              <span className="icon group-has-[:checked]:bg-blue-300 group-has-[:checked]:text-white duration-300">
                <FontAwesomeIcon icon={icon} />
              </span>
              <input
                onClick={onClick}
                hidden
                type="radio"
                name={keyName}
                value={value}
                defaultChecked={defaultCkecked}
              />
              {label}
            </label>
  )
}

export default LabelRadioButton