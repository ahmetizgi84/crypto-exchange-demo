import { useRef } from 'react';

const SHOW_RENDER_COUNTERS = true;

const useRenderCounter = () => {
    const renderCount = useRef(0);
    renderCount.current = renderCount.current + 1;

    if (SHOW_RENDER_COUNTERS) {
        return (
            <div style={{
                width: "36px",
                height: "36px",
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'red',
                color: 'white'
            }}>
                {renderCount.current}
            </div>
        );
    }
    return null;
};

export default useRenderCounter;


/**
 import useRenderCounter from '../hooks/useRenderCounter'
 const renderCounter = useRenderCounter();
 {renderCounter}
 */