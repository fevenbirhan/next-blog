import { connect } from '../../../../lib/mongodb/mongoose.js';
import Comment from '../../../../lib/models/comment.model.js';
import { currentUser } from '@clerk/nextjs/server';

export const POST = async (req) => {
  try {
    await connect();

    const body = await req.json();
    const commentText = body.comment;
    const postId = body.postId;

    const user = await currentUser();

    if (!user || !user.username) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const newComment = await Comment.create({
      comment: commentText,
      postId,
      username: user.username,
    });

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (err) {
    console.error('Error creating comment:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
};