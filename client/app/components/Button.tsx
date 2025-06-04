import React from 'react'


interface ButtonProps {
  button: string;
}

function Button(props: ButtonProps) {
  return (
    <div className='py-4'>
      <button
        className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition"
      >
        {props.button}
      </button>

    </div>
  );
}

export default Button