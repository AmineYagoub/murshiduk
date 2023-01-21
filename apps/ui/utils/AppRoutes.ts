import { NextRouter } from 'next/router';

export enum AppRoutes {
  Home = '/',
  About = '/about',
  Contact = '/contact',
  Blog = '/blog',
  SignIn = '/auth/sign-in',
  SignUp = '/auth/sign-up',
  SignOut = '/auth/sign-out',
  ForgotPassword = '/auth/forgot/password',

  AdminManageDashboard = '/admin/dashboard',
  AdminManageOrders = '/admin/manage-orders',
  AdminManageCategories = '/admin/manage-categories',
  AdminManageBlogs = '/admin/manage-blogs',
  AdminManageComments = '/admin/manage-comments',
  AdminManageSettings = '/admin/manage-settings',

  StudentDashboard = '/profile/dashboard',
  StudentProfile = '/profile/details',
  StudentContests = '/profile/contests',
  StudentMessages = '/profile/messages',
  StudentNotifications = '/profile/notifications',
  TeacherDashboard = '/teacher/dashboard',
  TeacherProfile = '/teacher/details',
  TeacherContests = '/teacher/contests',
  TeacherMessages = '/teacher/messages',
  TeacherNotifications = '/teacher/notifications',
  TeacherMembership = '/teacher/membership',
}

export const redirect = (router: NextRouter, role: string) => {
  const path =
    role === 'RoleTitle.Admin'
      ? AppRoutes.AdminManageDashboard
      : AppRoutes.StudentProfile;
  router.push({
    pathname: path,
  });
};
