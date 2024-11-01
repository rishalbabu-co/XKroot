import prisma from '../../lib/prisma';

export async function createComment(data: {
  postId: string;
  userId: string;
  content: string;
}) {
  return prisma.comment.create({
    data,
    include: {
      user: {
        select: {
          name: true,
          photo: true
        }
      }
    }
  });
}

export async function updateComment(id: string, content: string) {
  return prisma.comment.update({
    where: { id },
    data: { content }
  });
}

export async function deleteComment(id: string) {
  return prisma.comment.delete({
    where: { id }
  });
}

export async function getPostComments(postId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  return prisma.comment.findMany({
    where: { postId },
    take: limit,
    skip,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: {
        select: {
          name: true,
          photo: true
        }
      }
    }
  });
}