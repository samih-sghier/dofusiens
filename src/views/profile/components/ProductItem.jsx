import { ImageLoader } from 'components/common';
import { EDIT_PRODUCT, VIEW_PROFILE } from 'constants/routes';
import { displayActionMessage, displayDate, displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React, { useRef, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { upVote, downVote } from 'redux/actions/reviewsActions';
import { getUser } from 'redux/actions/userActions';

const ProductItem = ({ product, rank }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productRef = useRef(null);
  const { profile } = useSelector((state) => ({
    profile: state.profile
  }));

  const onClickUpvote = () => {
    dispatch(upVote(product.id, profile.id, profile.upVotes, profile.downVotes));
    productRef.current.classList.remove('item-active');
  };

  const onClickDownvote = () => {
    productRef.current.classList.toggle('item-active');
  };

  const onConfirmDownvote = () => {
    dispatch(downVote(product.id, profile.id, profile.upVotes, profile.downVotes));
    //displayActionMessage('Item successfully deleted');
    productRef.current.classList.remove('item-active');
  };

  const onCancelDownvote = () => {
    productRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme
      color="#e1e1e1"
      highlightColor="#f2f2f2"
    >
      <div
        className={`item item-products ${!product.id && 'item-loading'}`}
        ref={productRef}
      >
        <div className="grid grid-count-8"
          onClick={() => {
            dispatch(getUser(product.id));
            history.push(VIEW_PROFILE);
          }}
        >
          <div className="grid-col item-img-wrapper">
            {product.avatar ? (
              <ImageLoader
                alt={product.fullname}
                className="item-img"
                src={product.avatar}
              />
            ) : <Skeleton width={50} height={30} />}
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{product.fullname || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{product.email || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>
              {product.dateJoined ? displayDate(product.dateJoined) : <Skeleton width={30} />}
            </span>
          </div>
          <div className="grid-col">
            <span>{product.votes || <Skeleton width={20} />}</span>
          </div>
          <div className="grid-col">
            <span>{rank || <Skeleton width={20} />}</span>
          </div>
        </div>
        {product.id && (

          <div className="item-action">
            <button
              className="button button-border button-small button-allowed"
              onClick={onClickUpvote}
              type="button"
              disabled={profile.upVotes.includes(product.id)}
            >
              Upvote
            </button>
            &nbsp;

            <button
              className="button button-border button-small button-danger"
              onClick={onClickDownvote}
              type="button"
              disabled={profile.downVotes.includes(product.id)}
            >
              Downvote
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to downvote user</h5>
              <button
                className="button button-small button-danger"
                onClick={onCancelDownvote}
                type="button"
              >
                No
              </button>
              &nbsp;
              <button
                className="button button-small button-allowed"
                onClick={onConfirmDownvote}
                type="button"
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

ProductItem.propTypes = {
  product: PropType.shape({
    id: PropType.string,
    name: PropType.string
  }).isRequired
};

export default withRouter(ProductItem);
