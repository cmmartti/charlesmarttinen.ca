import React from 'react';
import {css} from 'emotion';

export default function Prose({children}) {
    return (
        <div
            className={
                'typography ' +
                css`
                    padding: 0 0.75em;
                    @media (max-width: 44em) {
                        padding: 0 0.5em;
                    }
                `
            }
        >
            {children}
        </div>
    );
}
