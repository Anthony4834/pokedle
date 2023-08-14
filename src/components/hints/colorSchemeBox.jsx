export const ColorSchemeBox = ({
    colorScheme,
    hintsShowing,
    setHintsShowing,
}) => {
    return hintsShowing ? (
        <div
            className='colorSchemeBox-wrapper'
            onClick={() => setHintsShowing(!hintsShowing)}
        >
            {colorScheme.map((data, idx) => {
                const { r, g, b } = data
                return (
                    <div className={`colorBox-wrapper colorBox-${idx}-wrapper`}>
                        <div
                            className={`colorBox colorBox-${idx}`}
                            key={idx}
                            style={{
                                backgroundColor: `rgb(${r}, ${g}, ${b})`,
                            }}
                        ></div>
                    </div>
                )
            })}
        </div>
    ) : (
        <div className='hintPromptBox'>
            <img
                className='modalTargetIcon'
                src='https://img.icons8.com/?size=512&id=132&format=png'
                alt='settings'
                onClick={() => setHintsShowing(!hintsShowing)}
            />
        </div>
    )
}
