import Post from "./Post";
import PostMaker from "./PostMaker";
import { faker } from '@faker-js/faker';
import PostProps from "./PropTypes/PostProps";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUtils } from "..";


const generateFakeData = () => {
  const data: PostProps | [] = [];
  for (let i = 0; i < 1; i++) {
    const name = faker.person.fullName();

    const fakerimages: any = [];

    for (let i = 0; i < 5; ++i) {
      const imageUrl = faker.image.urlLoremFlickr({ category: 'nature' });
      fakerimages.push({ imageUrl: imageUrl });
    }

    const PostContent = faker.lorem.sentence(25);

    const obj = {
      name,
      images: fakerimages,
      PostContent,
    };

    data.push(obj);
  }

  return data;
};



const NewsFeed = () => {
  /* Fake Data */
  const demoPosts: PostProps[] = generateFakeData();

  /* fetching the posts now */
  const [posts, setPosts] = useState([]);

  const utils = useUtils();


  useEffect(() => {

    async function fetchPosts() {

      utils?.setLoading(true);
      const token = localStorage.getItem('token');
      await axios.get(`http://localhost:1983/api/v1/post/`, {
        headers: {
          'authorisation': `Bearer ${token}`
        }
      })
        .then((response) => {
          setPosts(response.data.posts);
        }).catch((error) => {
          console.log(error);
        })
      utils?.setLoading(false);
    }

    fetchPosts();
  }, [])


  if (!posts) {
    return <div>loading...</div>
  }


  return (
    <div>
      <PostMaker />

      {/* {posts && demoPosts.map((e) => {
        return <Post name={e.name} images={e.images} PostContent={e.PostContent} />
      })} */}


      {/* for api call */}
      {posts && posts.map((e: any) => {
        return <Post images={e.photos} PostContent={e.PostString} user={e.user} />
      })}
    </div>
  );
};

export default NewsFeed;
