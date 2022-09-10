import React, { useState, useRef, useEffect } from 'react';

/** 
 * Utility Component used in the SelectComponent Component, allowing the menu to close when the user clicks outside
 */
export default function WithClickOutside (WrappedComponent) {
    const Component = (props) => {

        const [open, setOpen] = useState(false);

        const ref = useRef();

        useEffect(() => {
            const handleClickOutside = (e) => {
                if (ref.current) {
                    if (!ref.current.contains(e.target)) {
                        setOpen(false);
                    }
                }
                
            }
            document.addEventListener("mousedown", handleClickOutside);
        }, [ref]);

        return (
            <WrappedComponent open={open} setOpen={setOpen} ref={ref} {...props} />
        )
    }

    return Component;

}