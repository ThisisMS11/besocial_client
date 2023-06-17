import CommentTxtEditor from "./CommentTxtEditor";

interface MyComponentProps {
  postId: string;
  comments: any;
}

const CommentBox: React.FC<MyComponentProps> = ({ postId, comments }) => {

  return (
    <>
      {/* textfield component to create comment  */}
      <CommentTxtEditor postId={postId} comments={comments} />
    </>
  );
};

export default CommentBox;
