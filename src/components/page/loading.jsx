import { RotatingLines } from 'react-loader-spinner'

export const Loading = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
        }}
    >
        <RotatingLines
            strokeColor='grey'
            strokeWidth='5'
            animationDuration='0.75'
            width='40'
            visible={true}
        />
    </div>
)
