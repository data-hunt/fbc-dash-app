import { Container } from '@/components/Layout';
import clsx from 'clsx';
// import Link from 'next/Link';
import { useMemo } from 'react';
import styles from './Transaction.module.css';

const Transaction = ({ transaction, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <p className={styles.content}>{transaction.content}</p>
      </div>
    </div>
  );
};

export default Transaction;
