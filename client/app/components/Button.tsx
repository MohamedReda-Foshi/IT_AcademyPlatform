"use client";

import React from 'react'

// re-define the struct of the button interface 
interface ButtonProps {
  button: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean
  className?: string
  onClick?: () => void
}

function Button(props: ButtonProps) {
  return (
    <div className='py-4'>
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        className={`bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition ${
                    props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`
                  }
        type={props.type || "button"}
      >
        {props.button}
      </button>

    </div>
  );
}

export default Button