const fs = require('fs');
const path = require('path');

module.exports = function tutorialsRoutes(context) {
  const file = path.join(context.siteDir, 'src', 'data', 'tutorials.json');
  const read = () => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : []);

  return {
    name: 'tutorials-routes',
    getPathsToWatch: () => [file],
    async contentLoaded({ actions }) {
      const list = read();
      for (let i = 0; i < list.length; i++) {
        const tutorial = list[i];
        const data = await actions.createData(
          `tutorial-${tutorial.slug}.json`,
          JSON.stringify({ tutorial, prev: list[i - 1] || null, next: list[i + 1] || null }),
        );
        actions.addRoute({
          path: `${context.baseUrl}tutorials/${tutorial.slug}`,
          component: '@site/src/components/Tutorials/Watch',
          modules: { data },
          exact: true,
        });
      }
    },
  };
};
