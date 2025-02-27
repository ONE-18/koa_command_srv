/**
* Cors middleware
* To allow the frontend app access
*/
 
import cors from '@koa/cors';
import type { Middleware } from 'koa';
 
/**
* Funcion that returns a Koa middleware to allow CORS, configured with a list of allowed sites
*
* @param listAllowedSites A list of allowed sites to access the System API, e.g. ['http://localhost']
* @returns Koa middleware
*/
export const corsMiddleware = (listAllowedSites:Array<string>, excludedEndpointLists: Array<string> = []): Middleware => {
 
  const ALLOWED_ALL_ORIGINS_PATTERN = '*'
 
  const corsOptions: cors.Options = {
    origin: (ctx: any) => {
      const origin = ctx.request.headers.origin;
      const path = ctx.request.path;
  
      // Check if the request's path matches any of the regular expressions in the excludedEndpointLists array
      const isExcludedEndpoint = excludedEndpointLists.some((pattern) => new RegExp(pattern).test(path));
      if (isExcludedEndpoint) {
        return ALLOWED_ALL_ORIGINS_PATTERN;
      }

      // If the list of allowed origins contains the wildcard '*', return it
      if (listAllowedSites.includes(ALLOWED_ALL_ORIGINS_PATTERN)) {
        return ALLOWED_ALL_ORIGINS_PATTERN
      }
 
      // If origin is not in the list of allowed origins, return undefined
      if (!!origin && listAllowedSites.includes(origin)) {
        return origin;
      }
    },

    // Allow only GET requests
    allowMethods: 'GET' //,HEAD,PUT,POST,DELETE,PATCH,OPTIONS
  }
  
  return cors(corsOptions)
}