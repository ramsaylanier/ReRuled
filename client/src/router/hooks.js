
import { checkAuthentication } from '@/auth'

export function requireAuth (to, from, next) {
  if (checkAuthentication()) {
    next()
  } else {
    next('/')
  }
}

export function redirectToProfile (to, from, next) {
  if (checkAuthentication()) {
    next('/profile')
  } else {
    next()
  }
}
