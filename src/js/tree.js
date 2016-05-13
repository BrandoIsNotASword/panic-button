import Baobab from 'baobab';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const tree = {
  home: {
    data: [],
    waypoints: [],
    dropdown: false,
    selectedSession: ''
  }
};

export { tree as initialTree };
export default new Baobab(tree, {
  shiftReferences: true,
  autoCommit: true,
  pure: true,
  mixins: [PureRenderMixin]
});
