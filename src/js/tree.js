import Baobab from 'baobab';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const tree = {
  home: {
  	waypoints: [],
    actual: 0
  }
};

export { tree as initialTree };
export default new Baobab(tree, {
  shiftReferences: true,
  autoCommit: true,
  pure: true,
  mixins: [PureRenderMixin]
});
