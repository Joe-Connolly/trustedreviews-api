/* eslint-disable import/prefer-default-export */

// currently uunused, but maybe useful if we want to highlight thumbs up or thumbs down
export const addFieldsToReviews = (reviews, currUserId) => {
  return reviews.map((review) => {
    return Object.assign({}, review, {
      userUpvoted: review.vote.positive.some((userId) => {
        return userId.equals(currUserId);
      }),
      userDownvoted: review.vote.negative.some((userId) => {
        return userId.equals(currUserId);
      }),
    });
  });
};
