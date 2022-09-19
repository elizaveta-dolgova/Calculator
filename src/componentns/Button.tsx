import React from 'react';
import '../App.css';

type ButtonProps = {
    sign: string;
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    className: string;
};

function Button(props: ButtonProps) {
    return (
        <button 
            onClick={props.onClick} 
            data-value={props.sign} 
            className={props.className}
        >
            {props.sign}
        </button>
    );
}

export default Button;