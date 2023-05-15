import { useContext } from 'react'
import { SkeletonElement } from '..'
import './styles.css'
import ThemeContext from '../../context/ThemeContext'
import Shimmer from './Shimmer'


const SkeletonRecentTrades = () => {
    const { theme } = useContext(ThemeContext)
    const themeClass = theme || 'light'

    return (
        <div className={`skeleton-wrapper ${themeClass}`}>
            <div className="skeleton-recenttrades">

                <SkeletonElement type="title" />
                <SkeletonElement type="title" />
                <SkeletonElement type="title" />
            </div>
            <Shimmer />
        </div>
    )
}

export default SkeletonRecentTrades
