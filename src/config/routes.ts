/**
 * Route Definitions
 *
 * This file defines all routes and their navigation configuration.
 * Routes marked with `nav.show: true` will appear in the navigation.
 *
 * When using the CLI to generate pages with --pages flag,
 * new routes are automatically added here.
 */

/**
 * Navigation configuration for a route
 */
export interface NavConfig {
  /** Whether to show this route in the navbar */
  show: boolean;
  /** Sort order in navigation (lower = first) */
  order: number;
  /** Display label for navigation */
  label: string;
}

/**
 * Route definition with optional navigation config
 */
export interface RouteDefinition {
  /** URL path (without leading slash for non-root) */
  path: string;
  /** Navigation configuration */
  nav?: NavConfig;
}

/**
 * Route definitions for all pages
 */
export const routes = {
  // Home page (root) - not shown in nav (logo links there)
  home: {
    path: '/',
    nav: { show: false, order: 0, label: 'Home' },
  },

  // Static pages
  about: {
    path: '/about',
    nav: { show: true, order: 3, label: 'About' },
  },
  contact: {
    path: '/contact',
    nav: { show: true, order: 4, label: 'Contact' },
  },

  // Blog section
  blog: {
    path: '/blog',
    nav: { show: true, order: 2, label: 'Blog' },
  },

  // Components showcase
  components: {
    path: '/components',
    nav: { show: true, order: 1, label: 'Components' },
  },
} as const satisfies Record<string, RouteDefinition>;

/**
 * Type-safe route identifier
 */
export type RouteId = keyof typeof routes;

/**
 * Get all route IDs
 */
export const routeIds = Object.keys(routes) as RouteId[];

/**
 * Validate if a string is a valid route ID
 */
export function isValidRouteId(id: string): id is RouteId {
  return id in routes;
}

/**
 * Get the path for a route
 */
export function getRoutePath(routeId: RouteId): string {
  return routes[routeId].path;
}

/**
 * Navigation route information
 */
export interface NavRoute {
  routeId: RouteId;
  path: string;
  label: string;
  order: number;
}

/**
 * Get routes that should appear in navigation, sorted by order
 */
export function getNavRoutes(): NavRoute[] {
  return Object.entries(routes)
    .filter(([_, route]) => route.nav?.show === true)
    .map(([routeId, route]) => ({
      routeId: routeId as RouteId,
      path: route.path,
      label: route.nav!.label,
      order: route.nav!.order,
    }))
    .sort((a, b) => a.order - b.order);
}
