import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { fetcher } from '@/lib/fetch';
import { useTransactionPages } from '@/lib/transaction';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './TransactionPoster.module.css';

const PosterInner = ({ user }) => {
  const collectionNameRef = useRef();
  const collectionNumberRef = useRef();
  const purchaseDateRef = useRef();
  const purchaseCostRef = useRef();
  const transactionTypeRef = useRef();
  const acquisitionSourceRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useTransactionPages();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // content: contentRef.current.value,
            collectionName: collectionNameRef.current.value,
            collectionNumber: collectionNumberRef.current.value,
            purchaseDate: purchaseDateRef.current.value,
            purchaseCost: purchaseCostRef.current.value,
            transactionType: transactionTypeRef.current.value,
            acquisitionSource: acquisitionSourceRef.current.value,
          }),
        });
        toast.success('You have posted successfully');
        // contentRef.current.value = '';
        collectionNameRef.current.value = '';
        collectionNumberRef.current.value = '';
        purchaseDateRef.current.value = '';
        purchaseCostRef.current.value = '';
        transactionTypeRef.current.value = '';
        acquisitionSourceRef.current.value = '';
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <form onSubmit={onSubmit}>
      <Container className={styles.poster}>
        {/* <Avatar size={40} username={user.username} url={user.profilePicture} /> */}
        <Input
          ref={collectionNameRef}
          className={styles.input}
          placeholder={`Collection name`}
          ariaLabel={`Collection name`}
        />
        <Input
          ref={collectionNumberRef}
          className={styles.input}
          placeholder={`Collection number`}
          ariaLabel={`Collection number`}
        />
        <Input
          ref={purchaseDateRef}
          className={styles.input}
          placeholder={`Purchase date`}
          ariaLabel={`Purchase date`}
        />
        <Input
          ref={purchaseCostRef}
          className={styles.input}
          placeholder={`Purchase cost`}
          ariaLabel={`Purchase cost`}
        />
        <Input
          ref={transactionTypeRef}
          className={styles.input}
          placeholder={`Transaction type`}
          ariaLabel={`Transaction type`}
        />
        <Input
          ref={acquisitionSourceRef}
          className={styles.input}
          placeholder={'Acquisition source'}
          ariaLabel={'Acquisition source'}
        />

        <Button type="success" loading={isLoading}>
          Submit
        </Button>
      </Container>
    </form>
  );
};

const Poster = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        <h3 className={styles.heading}>Add transaction</h3>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : data?.user ? (
          <PosterInner user={data.user} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
            to post
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
