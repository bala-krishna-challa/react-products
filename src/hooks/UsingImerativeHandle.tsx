import React, { forwardRef, useImperativeHandle, useRef } from "react";

const CommentList = forwardRef(function CommentList(props, ref) {
  const divRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToBottom() {
          const node = divRef.current;
          node.scrollTop = node.scrollHeight;
        },
      };
    },
    []
  );

  let comments = [];
  for (let i = 0; i < 50; i++) {
    comments.push(<p key={i}>Comment #{i}</p>);
  }

  return (
    <div className="CommentList" ref={divRef}>
      {comments}
    </div>
  );
});

const AddComment = forwardRef<HTMLInputElement>(function AddComment(
  props,
  ref
) {
  return <input ref={ref} placeholder="Add comment..." />;
});

const Post = forwardRef((props, ref) => {
  const commentsRef = useRef(null);
  const addCommentRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollAndFocusAddComment() {
          commentsRef.current.scrollToBottom();
          addCommentRef.current.focus();
        },
      };
    },
    []
  );

  return (
    <>
      <article>
        <p>Welcome to my blog!</p>
      </article>
      <CommentList ref={commentsRef} />
      <AddComment ref={addCommentRef} />
    </>
  );
});

function UsingImperativeHandle() {
  const postRef = useRef(null);

  function handleClick() {
    postRef.current.scrollAndFocusAddComment();
  }

  return (
    <>
      <button onClick={handleClick}>Write a comment</button>
      <Post ref={postRef} />
    </>
  );
}

export default UsingImperativeHandle;
