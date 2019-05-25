/* eslint-disable import/prefer-default-export */


export const addFieldsToReviews = (reviews, currUserId) => {
  return reviews.map((review) => {
    console.log('a review');
    return Object.assign({}, review, {
      userUpvoted: review.vote.positive.some((userId) => {
        console.log(`userIds differ ${userId} ${currUserId} `);
        return userId.equals(currUserId);
      }),
      userDownvoted: review.vote.negative.some((userId) => {
        return userId.equals(currUserId);
      }),
    });
  });
};
