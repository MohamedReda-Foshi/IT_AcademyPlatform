import React from 'react'


interface SeButtonProps {
    button: string;
}

function SeButton(props:SeButtonProps) {
    return (
        <div>
            <a className="bg-white text-red-500 hover:bg-red-800 px-4 py-2 rounded-md transition "

                href="#"
            >                    {props.button}
            </a>
    
        </div>
    )
}

export default SeButton