/* eslint-disable indent */
import { ImageLoader } from 'components/common';
import { ACCOUNT_EDIT } from 'constants/routes';
import { displayDate } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Route from 'constants/routes';

const ViewProfile = (props) => {
  const profile = useSelector((state) => state.users.currentUser);

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-avatar-wrapper">
            <ImageLoader
              alt="Avatar"
              className="user-profile-img"
              src={profile.avatar}
            />
          </div>
        </div>
        <div className="user-profile-details">
          <h2 className="user-profile-name">{profile.fullname}</h2>
          <span>Email</span>
          <br />
          <h5>{profile.email}</h5>
          <span>Votes</span>
          <br />
          {profile.votes ? (
            <h5>{profile.votes}</h5>
          ) : (
              <h5 className="text-subtle text-italic">No Votes</h5>
            )}
          <span>Mobile</span>
          <br />
          {profile.mobile ? (
            <h5>{profile.mobile.value}</h5>
          ) : (
              <h5 className="text-subtle text-italic">Mobile not set</h5>
            )}
          <span>Date Joined</span>
          <br />
          {profile.dateJoined ? (
            <h5>{displayDate(profile.dateJoined)}</h5>
          ) : (
              <h5 className="text-subtle text-italic">Not available</h5>
            )}
        </div>
      </div>
    </div>
  );
};

ViewProfile.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default withRouter(ViewProfile);
