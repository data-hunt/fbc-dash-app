import { Spacer } from '@/components/Layout';
import styles from './TransactionFeed.module.css';
import Poster from './TransactionPoster';
import TransactionList from './TransactionList';

export const TransactionFeed = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster />
      <TransactionList />
    </div>
  );
};
