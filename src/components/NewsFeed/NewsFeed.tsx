import Post from "./Post";
import PostMaker from "./PostMaker";
import { faker } from '@faker-js/faker';
import PostProps from "./PropTypes/PostProps";

const generateFakeData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    const name = faker.person.fullName();
    const imageUrl = faker.image.urlLoremFlickr({ category: 'nature' });
    const PostContent = faker.lorem.sentence(25);

    const obj = {
      name,
      imageUrl,
      PostContent,
    };

    data.push(obj);
  }

  return data;
};

const NewsFeed = () => {
  /* Fake Data */
  const demoPosts: PostProps[] = generateFakeData();

  return (
    <div>
      <PostMaker />

      {demoPosts.map((e) => {
        return <Post name={e.name} imageUrl={e.imageUrl} PostContent={e.PostContent} />
      })}
    </div>
  );
};

export default NewsFeed;
