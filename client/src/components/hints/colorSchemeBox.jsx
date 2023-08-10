export const ColorSchemeBox = ({colorScheme, hintsShowing, setHintsShowing}) => {
    return(
        <div className="colorSchemeBox-wrapper" onClick={() => setHintsShowing(!hintsShowing)}>
            {
                colorScheme.map((data, idx) => {
                    const { r, g, b } = data
                    return (
                        <div className={`colorBox-wrapper colorBox-${idx}-wrapper`}>
                            <div className={`colorBox colorBox-${idx}`} key={idx}
                            style={{
                                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                            }}
                            ></div> 
                        </div>
                        
                    )
                })
            }
        </div>
    )
}