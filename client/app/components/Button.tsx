import React from 'react'


interface ButtonProps {
  button: string;
}

function Button(props: ButtonProps) {
  return (
    <div>
      <a
        className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md transition"
        href="#"
      >
        {props.button}
      </a>
    </div>
  );
}

export default Button