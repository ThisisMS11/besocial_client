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

  if (error) console.log(error)

  return (
    <div>
      <PostMaker />

      {/* for api call */}
      {posts.length > 0 ? posts.map((post: any) => {
        return <Post images={post.photos} PostContent={post.PostString} user={post.user} likes={post.likes} postId={post.id} createdAt={post.createdAt} comments={post.comments} />
      }) : <div>No Posts found </div>}
    </div>
  );
};

export default NewsFeed;
