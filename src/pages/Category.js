import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CATEGORY = gql`
  query getCategory($id: ID!) {
    category(id: $id) {
      id
      name
      reviews {
        title
        body
        rating
        id
        categories {
          name
          id
        }
      }
    }
  }
`;

const Category = () => {
  const { id } = useParams();
  const { error, loading, data } = useQuery(CATEGORY, {
    variables: { id: id }, //borrar un id para probar
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <div>
      <h2>{data.category.name}</h2>
      {data.category.reviews.map((review) => (
        <div className="review-card" key={review.id}>
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map((c)=>
            <small key={c.id}>{c.name}</small>
          )}

          <ReactMarkdown>{review.body.substring(0, 200)}</ReactMarkdown>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default Category;
