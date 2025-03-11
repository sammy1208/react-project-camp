import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AutoScrollToTop ()  {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }, [pathname]);
    
    return null
}