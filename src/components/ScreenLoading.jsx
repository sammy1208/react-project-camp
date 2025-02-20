import ReactLoading from "react-loading";

export default function ScreenLoading ( {isLoading} ) {
    return(
        <>
        {isLoading && (    
        <div
        className="d-flex justify-content-center align-items-center"
        style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999
        }}
        >
        <ReactLoading
            type="spin"
            color="black"
            width="4rem"
            height="4rem"
        />
        </div>
        )}
        </>
    )
}
