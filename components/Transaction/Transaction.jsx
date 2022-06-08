import { Container } from '@/components/Layout';
import clsx from 'clsx';
// import Link from 'next/Link';
import { useMemo } from 'react';
import styles from './Transaction.module.css';

const Transaction = ({ transaction, className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        {/* <p className={styles.content}>{transaction.content}</p> */}
        <p className={styles.content}>
          Collection Name: {transaction.collectionName}
        </p>
        <p className={styles.content}>
          <span>Colleciton Number:</span> {transaction.collectionNumber}
        </p>
        <p className={styles.content}>
          Purchase Date: {transaction.purchaseDate}
        </p>
        <p className={styles.content}>
          Purchase Cost: {transaction.purchaseCost}
        </p>
        <p className={styles.content}>
          Transaction Type: {transaction.transactionType}
        </p>
        <p className={styles.content}>
          Acquisition Source: {transaction.acquisitionSource}
        </p>
      </div>
    </div>
  );
};

export default Transaction;
