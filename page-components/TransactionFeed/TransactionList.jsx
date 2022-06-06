import { Button } from '@/components/Button';
import { Container, Spacer } from '@/components/Layout';
import Wrapper from '@/components/Layout/Wrapper';
import { Transaction } from '@/components/Transaction';
import { Text } from '@/components/Text';
import { useTransactionPages } from '@/lib/transaction';
import Link from 'next/link';
import styles from './TransactionList.module.css';

const TransactionList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } =
    useTransactionPages();
  const transactions = data
    ? data.reduce((acc, val) => [...acc, ...val.transactions], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      <Wrapper>
        {transactions.map((transaction) => (
          <Link
            key={transaction._id}
            href={`/user/${transaction.creator.username}/transaction/${transaction._id}`}
            passHref
          >
            <div className={styles.wrap}>
              <Transaction className={styles.post} transaction={transaction} />
            </div>
          </Link>
        ))}
        <Container justifyContent="center">
          {isReachingEnd ? (
            <Text color="secondary">No more transactions are found</Text>
          ) : (
            <Button
              variant="ghost"
              type="success"
              loading={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
          )}
        </Container>
      </Wrapper>
    </div>
  );
};

export default TransactionList;
