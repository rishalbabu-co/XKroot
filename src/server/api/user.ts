import prisma from '../../lib/prisma';
import type { User } from '@prisma/client';

export async function createUser(data: {
  firebaseUid: string;
  email: string;
  name?: string;
  photo?: string;
}) {
  return prisma.user.create({
    data
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  return prisma.user.update({
    where: { id },
    data
  });
}

export async function getUserByFirebaseUid(firebaseUid: string) {
  return prisma.user.findUnique({
    where: { firebaseUid },
    include: {
      experience: true,
      education: true,
      skills: true,
      languages: true,
      socialLinks: true
    }
  });
}

export async function updateUserProfile(userId: string, data: {
  name?: string;
  title?: string;
  photo?: string;
  location?: string;
  bio?: string;
  phone?: string;
  experience?: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    gpa?: string;
  }>;
  skills?: Array<{
    name: string;
    level: number;
  }>;
  languages?: Array<{
    name: string;
    level: string;
  }>;
  socialLinks?: {
    website?: string;
    github?: string;
    linkedin?: string;
  };
}) {
  const {
    experience,
    education,
    skills,
    languages,
    socialLinks,
    ...basicInfo
  } = data;

  // Update basic user information
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: basicInfo
  });

  // Update experience
  if (experience) {
    await prisma.experience.deleteMany({
      where: { userId }
    });
    await prisma.experience.createMany({
      data: experience.map(exp => ({ ...exp, userId }))
    });
  }

  // Update education
  if (education) {
    await prisma.education.deleteMany({
      where: { userId }
    });
    await prisma.education.createMany({
      data: education.map(edu => ({ ...edu, userId }))
    });
  }

  // Update skills
  if (skills) {
    await prisma.skill.deleteMany({
      where: { userId }
    });
    await prisma.skill.createMany({
      data: skills.map(skill => ({ ...skill, userId }))
    });
  }

  // Update languages
  if (languages) {
    await prisma.language.deleteMany({
      where: { userId }
    });
    await prisma.language.createMany({
      data: languages.map(lang => ({ ...lang, userId }))
    });
  }

  // Update social links
  if (socialLinks) {
    await prisma.socialLink.upsert({
      where: { userId },
      create: { ...socialLinks, userId },
      update: socialLinks
    });
  }

  return getUserByFirebaseUid(updatedUser.firebaseUid);
}