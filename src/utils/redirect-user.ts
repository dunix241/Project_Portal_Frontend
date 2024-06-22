const redirects: (string | string[])[][] = [
  [['Students', 'Lecturers'], '/portal'],
  [['Admins'], '/cms'],
];

export const redirectUser = (user: { roles: string[] }): string => {
  let url = null;

  const redirected = redirects.some(redirect => {
    if ((redirect[0] as string[]).some(role => user?.roles.some(userRole => userRole.includes(role)))) {
      url = redirect[1];
      return true;
    }
    return false;
  })

  return redirected ? url : '/showcase'
}