import DrawerQuery from '@/graphql/client/drawer.gql'

const ui = {
  defaults: {
    drawer: {
      __typename: 'Drawer',
      isOpen: false
    }
  },
  resolvers: {
    Mutation: {
      toggleDrawer: (_, args, { cache }) => {
        const drawer = cache.readQuery({query: DrawerQuery})
        drawer.drawer.isOpen = !drawer.drawer.isOpen
        cache.writeData({data: drawer})
        return null
      }
    }
  }
}

export default ui
