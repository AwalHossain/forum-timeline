import { useCallback, useRef } from "react";

interface InfiniteScrollProps {
    isLoading: boolean;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetching: boolean;
}


export default function useInfiniteScroll({isLoading,fetchNextPage, hasNextPage, isFetching}:InfiniteScrollProps){
    const observer = useRef<IntersectionObserver>();

    return useCallback((node:HTMLDivElement)=>{
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if(entries[0].isIntersecting && hasNextPage && !isFetching){
                    fetchNextPage();
                }
            }
        )
        if(node) observer.current.observe(node);
    },[isLoading,fetchNextPage,hasNextPage,isFetching])
}

