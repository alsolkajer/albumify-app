export default async function ({ app, redirect }) {
  // check cookies in local instead of using $auth.loggedIn by nuxtjs/auth
  const user = await app.$cookies.get('auth._token.local')
  if (!user) {
    redirect('/login')
  }
}
