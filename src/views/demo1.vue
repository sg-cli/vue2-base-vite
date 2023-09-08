<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";
import Hierachy from "@antv/hierarchy";

export default {
  name: "G6Demo",
  mounted() {
    this.initTree();
  },
  methods: {
    initTree() {
      fetch(
        "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
      )
        .then((res) => res.json())
        .then((data) => {
          const container = document.getElementById("container");
          const width = container.scrollWidth;
          const height = container.scrollHeight || 500;
          const graph = new G6.TreeGraph({
            container: "container",
            width,
            height,
            modes: {
              default: [
                {
                  type: "collapse-expand",
                  onChange: function onChange(item, collapsed) {
                    const data = item.get("model");
                    data.collapsed = collapsed;
                    return true;
                  },
                },
                "drag-canvas",
                "zoom-canvas",
              ],
            },
            defaultNode: {
              size: 26,
              anchorPoints: [
                [0, 0.5],
                [1, 0.5],
              ],
            },
            defaultEdge: {
              type: "cubic-horizontal",
            },
            layout: (layoutData) => {
              const compactBox = new Hierachy.dendrogram(layoutData, {
                nodeSep: 50,
              });
              const positions = {};
              G6.Util.traverseTree(compactBox, (child) => {
                positions[child.id] = { x: child.x, y: child.y };
              });
              // let subGraph = {};
              // G6.Util.traverseTree(layoutData, (child) => {
              //   if (child.id === "Classification") subGraph = child;
              //   child.x = positions[child.id].x;
              //   child.y = positions[child.id].y;
              // });
              // const mindmap = new Hierachy.mindmap(subGraph, {
              //   direction: "LR",
              //   getHGap: () => 50,
              //   getVGap: () => 50,
              // });
              // G6.Util.traverseTree(mindmap, (child) => {
              //   positions[child.id] = { x: child.x, y: child.y };
              // });
              // let subIndented = {};
              // G6.Util.traverseTree(layoutData, (child) => {
              //   if (child.id === "Consensus") subIndented = child;
              //   child.x = positions[child.id].x;
              //   child.y = positions[child.id].y;
              // });
              // const indented = new Hierachy.indented(subIndented, {
              //   direction: "LR",
              //   indent: 140,
              //   getHeight: () => {
              //     return 60;
              //   },
              //   getVGap: () => {
              //     return 0;
              //   },
              //   getHGap: () => {
              //     return 0;
              //   },
              // });
              // G6.Util.traverseTree(indented, (child) => {
              //   positions[child.id] = { x: child.x, y: child.y };
              // });
              // G6.Util.traverseTree(compactBox, (child) => {
              //   child.x = positions[child.id].x;
              //   child.y = positions[child.id].y;
              // });
              //

              return compactBox;
            },
          });

          let centerX = 0;
          graph.node(function (node) {
            if (node.id === "Modeling Methods") {
              centerX = node.x;
            }

            return {
              label: node.id,
              labelCfg: {
                position:
                  node.children && node.children.length > 0
                    ? "left"
                    : node.x > centerX
                    ? "right"
                    : "left",
                offset: 5,
              },
            };
          });

          graph.data(data);
          graph.render();
          graph.fitView();

          if (typeof window !== "undefined")
            window.onresize = () => {
              if (!graph || graph.get("destroyed")) return;
              if (
                !container ||
                !container.scrollWidth ||
                !container.scrollHeight
              )
                return;
              graph.changeSize(container.scrollWidth, container.scrollHeight);
            };
        });
    },
  },
};
</script>
<style>
#container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
