import React from "react";
import Review from "./Review";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading..."
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <hr />
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" >
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
