import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLike, getLikesByReviewId, removeLike } from '../../../../store/likes';
import { getCurrentUserId } from '../../../../store/users';
import ButtonLike from '../../../common/ButtonLike';

const ReviewLikes = ({ reviewId }) => {
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const likes = useSelector(getLikesByReviewId(reviewId));
  const likesStr = likes.join('');

  const isLiked = likes.some(like => like.userId === currentUserId);

  // useEffect(() => {
  //   if (currentUserId) {
  //     setStatus(isLiked);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [likes, currentUserId]);
  useEffect(() => {
    if (currentUserId) {
      setStatus(isLiked);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likesStr, currentUserId]);

  const toggleLike = () => {
    const likeData = { userId: currentUserId || '', reviewId };

    if (isLiked) {
      dispatch(removeLike(likeData));
    } else {
      dispatch(createLike(likeData));
    }
  };

  return <ButtonLike displayCount={likes.length} status={status} onToggle={toggleLike} />;
};

export default ReviewLikes;
