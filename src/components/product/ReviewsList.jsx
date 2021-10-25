/* eslint-disable react/forbid-prop-types */
import { Boundary, MessageDisplay } from 'components/common';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { getAllUsers } from 'redux/actions/reviewsActions';

const ReviewsList = (props) => {
  const {
    reviews, users, isLoading, requestStatus, children
  } = props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = () => {
    setFetching(true);
    dispatch(getAllUsers(reviews.lastRefKey));
  };

  useEffect(() => {
    if (reviews.users.length === 0 || !reviews.lastRefKey) {
      fetchProducts();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [reviews.lastRefKey]);

  if (users.length === 0 && !isLoading) {
    return (
      <MessageDisplay message={requestStatus?.message || 'No Users found.'} />
    );
  } if (users.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || 'Something went wrong :('}
        action={fetchProducts}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {users.length < reviews.total && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchProducts}
            type="button"
          >
            {isFetching ? 'Fetching Users...' : 'Show More Users'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

ReviewsList.defaultProps = {
  requestStatus: null
};

ReviewsList.propTypes = {
  users: PropType.object.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default ReviewsList;
