import React, { useEffect } from 'react'
//custom hook

export default function useWindowSize() {

    const [windowSize,setWindowSize] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(()=>{
        const handleResize = ()=> {
            setWindowSize({              //to add event
                width:window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

    },[]);

    return windowSize;
}
