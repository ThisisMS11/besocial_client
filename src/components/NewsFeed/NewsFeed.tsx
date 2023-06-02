import Post from "./Post";
import PostMaker from "./PostMaker";
import { faker } from '@faker-js/faker';
import PostProps from "./PropTypes/PostProps";



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

  return (
    <div>
      <PostMaker />

      {demoPosts.map((e) => {
        return <Post name={e.name} images={e.images} PostContent={e.PostContent} />
      })}
    </div>
  );
};

export default NewsFeed;
