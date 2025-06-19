import React from 'react'


interface ButtonProps {
  button: string;
}

function Button(props: ButtonProps) {
  return (
    <div className='py-4'>
      <button
        disabled={props.disabled}
        className={`bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition ${
          props.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {props.button}
      </button>

    </div>
  );
}

export default Button