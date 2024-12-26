import React from 'react'

function SeButton(props) {
    return (
        <div>
            <a className="inline-block rounded-3xl border border-current px-8 py-3 text-sm font-medium text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"

                href="#"
            >                    {props.button}
            </a>
    
        </div>
    )
}

export default SeButton