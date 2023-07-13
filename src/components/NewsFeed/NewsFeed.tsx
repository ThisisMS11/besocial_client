import Post from "./Post";
import PostMaker from "./PostMaker";
import { useUtils, fetchPosts } from "..";
import { useQuery } from "@tanstack/react-query";
import { PostProp } from '../types'
import { useState, useEffect } from '../imports/Reactimports'
import { AxiosError } from "axios";
import PostSkelton from "./PostSkelton";

const NewsFeed = () => {
  const utils = useUtils();

  const [allposts, setAllposts] = useState<PostProp[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTimeout, setSearchTimeout] = useState<any>(null);



  /* fetching the data using reactQuery */
  const fetchPostsQuery = useQuery({
    queryKey: ["allposts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setAllposts(data);
    }
  })

  const filterPrompts = (searchtext: string) => {

    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

    return fetchPostsQuery.data.filter(
      (item: PostProp) =>
        regex.test(item.PostString) ||
        regex.test(item.user.name)
    );
  };

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout as number);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setAllposts(searchResult);
      }, 500)
    );
  };


  useEffect(() => {
    const { status, error, data } = fetchPostsQuery;

    if (error) {
      const myerr = error as AxiosError;
      const errormessage = utils?.GetErrorMessage(myerr) as string;

      utils?.errornotify(errormessage);
    }
    if (status === 'success') {
      setAllposts(data)
    }


  }, [fetchPostsQuery.status])


  return (
    <>
      <PostMaker />

      {/* Skeleton vs posts  */}




      <input type="text" className=" mx-auto  bg-[#1e1f23] block rounded-md  py-2.5 pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 text-white w-[93%]" placeholder="Search Posts..." onChange={handleSearchChange} value={searchText} />

      {
        fetchPostsQuery.status === 'loading' ? (<>
          <PostSkelton />
          <PostSkelton />
          </>) :

          allposts.length > 0 ? allposts.map((post: any) => {
            return <Post key={post.id} photos={post.photos} PostString={post.PostString} user={post.user} likes={post.likes} id={post.id} createdAt={post.createdAt} comments={post.comments} />
          }) : <div className=" h-full flex items-center justify-center text-3xl ">No Posts found </div>

      }

    </>
  );
};

export default NewsFeed;
