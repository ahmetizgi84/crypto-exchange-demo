/**
 * General component description.
 * This component will show up when loading state is true
 *
 * E.g.:
 * ```js
 * <ActivityIndicator />
 * ```
 */

import { Spinner } from 'react-activity';
import 'react-activity/dist/Dots.css';
import 'react-activity/dist/Spinner.css';

import styles from './styles.module.css';

function ActivityIndicator({ sm }) {
  /**
   * You can add 'sm' prop if you want to use indicator smaller.
   * <ActivityIndicator sm />
   */
  return <div className={styles.container}>{sm ? <Spinner size={14} /> : <Spinner />}</div>;
}

export default ActivityIndicator;
