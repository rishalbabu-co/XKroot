import prisma from '../../lib/prisma';
import type { Post } from '@prisma/client';

export async function createPost(data: {
  userId: string;
  content: string;
  media?: any[];
}) {
  return prisma.post.create({
    data: {
      ...data,
      media: media ? JSON.stringify(media) : null
    },
    include: {
      user: {
        select: {
          name: true,
          photo: true
        }
      },
      likes: true,
      comments: true
    }
  });
}

export async function updatePost(id: string, data: Partial<Post>) {
  return prisma.post.update({
    where: { id },
    data: {
      ...data,
      media: data.media ? JSON.stringify(data.media) : undefined
    },
    include: {
      user: {
        select: {
          name: true,
          photo: true
        }
      },
      likes: true,
      comments: true
    }
  });
}

export async function deletePost(id: string) {
  return prisma.post.delete({
    where: { id }
  });
}

export async function getFeedPosts(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  return prisma.post.findMany({
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
      },
      likes: true,
      comments: true
    },
    where: {
      OR: [
        { userId },
        {
          userId: {
            in: await prisma.follow
              .findMany({
                where: { followerId: userId },
                select: { followingId: true }
              })
              .then(follows => follows.map(f => f.followingId))
          }
        }
      ]
    }
  });
}

export async function likePost(postId: string, userId: string) {
  return prisma.like.create({
    data: {
      postId,
      userId
    }
  });
}

export async function unlikePost(postId: string, userId: string) {
  return prisma.like.delete({
    where: {
      postId_userId: {
        postId,
        userId
      }
    }
  });
}