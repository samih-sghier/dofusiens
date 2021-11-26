import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'services/firebase';

const useProfile = (id) => {
  // get and check if product exists in store
  const storeProduct = useSelector((state) => state.reviews.users.find((item) => item.id === id));

  const [profile, setProfile] = useState(storeProduct);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!profile || profile.id !== id) {
          setLoading(true);
          const doc = await firebase.getUser(id);
          

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setProfile(data);
              setLoading(false);
            }
          } else {
            setError('User not found.');
          }
        }
      } catch (err) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || 'Something went wrong.');
        }
      }
    })();
  }, [id]);

  return { profile, isLoading, error };
};

export default useProfile;
