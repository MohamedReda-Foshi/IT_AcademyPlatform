import React from 'react'

function Button(props) {
  return (
    <div>
        <a
    className="inline-block rounded-3xl bg-red-600 px-8 py-3 text-sm font-bold  hover:border-green-400 text-white transition hover:bg-white hover:text-red-500 hover:scale-95 hover:shadow-xl focus:outline-none   "
    href="#"
>
  {props.button}
</a>
    </div>
  )
}

export default Button