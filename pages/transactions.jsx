import { TransactionFeed } from '@/page-components/TransactionFeed';
import Head from 'next/head';

const TransactionPage = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <TransactionFeed />
    </>
  );
};

export default TransactionPage;
