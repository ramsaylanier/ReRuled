import ListItem from '@/components/list/ListItem.vue'
export default {
  name: 'game-list-item',
  props: ['game', 'me'],
  components: {
    ListItem
  }
}
