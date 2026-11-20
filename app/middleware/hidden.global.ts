// A hidden page (see useHiddenPages) answers 404 like any address that does not exist.
export default defineNuxtRouteMiddleware((to) => {
  const isHidden = useHiddenPages()
  if (isHidden(to.path)) return abortNavigation(createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true }))
})
