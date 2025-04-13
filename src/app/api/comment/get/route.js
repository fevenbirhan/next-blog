import { connect } from '../../../../lib/mongodb/mongoose.js';
import Comment from '../../../../lib/models/comment.model.js';

export const POST = async (req) => {
  try {
    await connect();

    const { postId } = await req.json();
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (err) {
    console.error('Error getting comments:', err);
    return new Response('Failed to fetch comments', { status: 500 });
  }
};