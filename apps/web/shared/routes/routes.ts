export type AppRoute = '/' | '/marketplace' | '/client-portal' | '/enrollment-form' | '/office-enrollment';

export const routes: Array<{ path: AppRoute; label: string }> = [
  { path: '/', label: 'Office Dashboard' },
  { path: '/marketplace', label: 'Marketplace Admin' },
  { path: '/client-portal', label: 'Client Portal' },
  { path: '/enrollment-form', label: 'Registration Form' },
  { path: '/office-enrollment', label: 'Registration Form' },
];

export const getRouteFromPath = (path: string): AppRoute => {
  if (path === '/marketplace' || path === '/client-portal' || path === '/enrollment-form' || path === '/office-enrollment') return path;
  return '/';
};
