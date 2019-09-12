const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-index-mdx": hot(preferDefault(require("/Users/kations/Projekte/unikit/src/index.mdx"))),
  "component---src-box-box-mdx": hot(preferDefault(require("/Users/kations/Projekte/unikit/src/Box/box.mdx"))),
  "component---src-button-button-mdx": hot(preferDefault(require("/Users/kations/Projekte/unikit/src/Button/button.mdx"))),
  "component---src-flex-flex-mdx": hot(preferDefault(require("/Users/kations/Projekte/unikit/src/Flex/flex.mdx"))),
  "component---src-alert-alert-mdx": hot(preferDefault(require("/Users/kations/Projekte/unikit/src/Alert/alert.mdx"))),
  "component---src-progress-index-mdx": hot(preferDefault(require("/Users/kations/Projekte/unikit/src/Progress/index.mdx"))),
  "component---src-avatar-avatar-mdx": hot(preferDefault(require("/Users/kations/Projekte/unikit/src/Avatar/avatar.mdx"))),
  "component---src-button-group-button-group-mdx": hot(preferDefault(require("/Users/kations/Projekte/unikit/src/ButtonGroup/ButtonGroup.mdx"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/kations/Projekte/unikit/.docz/src/pages/404.js")))
}

