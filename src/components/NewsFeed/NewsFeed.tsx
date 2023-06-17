import Post from "./Post";
import PostMaker from "./PostMaker";
import { useUtils, fetchPosts } from "..";
import { useQuery } from "@tanstack/react-query";

const NewsFeed = () => {
  const utils = useUtils();

  /* fetching the data using reactQuery */
  const { status, error, data: posts } = useQuery({
    queryKey: ["allposts"],
    queryFn: () => fetchPosts(utils),
    refetchOnWindowFocus: false
  })

  if (status == 'loading') {
    return <div>loading...</div>
  }

  if (error) console.log(error);

  return (
    <>
      <PostMaker />

      {/* for api call */}
      {posts.length > 0 ? posts.map((post: any) => {
        return <Post key={post.id} photos={post.photos} PostString={post.PostString} user={post.user} likes={post.likes} id={post.id} createdAt={post.createdAt} comments={post.comments} />
      }) : <div>No Posts found </div>}
    </>
  );
};

export default NewsFeed;
