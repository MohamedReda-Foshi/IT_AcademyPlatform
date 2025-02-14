import React from 'react'

function SeButton(props) {
    return (
        <div>
            <a className="inline-block rounded-3xl border border-current px-4 py-2 text-sm font-medium text-red-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring "

                href="#"
            >                    {props.button}
            </a>
    
        </div>
    )
}

export default SeButton