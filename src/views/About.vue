<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";
import data from "./g6Data2";

export default {
  name: "G6Demo",
  mounted() {
    this.initTree();
  },
  methods: {
    initTree() {
      G6.registerNode("card-node", {
        draw: function drawShape(cfg, group) {
          const r = 2;
          const color = "#5B8FF9";
          const w = cfg.size[0];
          const h = cfg.size[1];
          const shape = group.addShape("rect", {
            attrs: {
              x: -w / 2,
              y: -h / 2,
              width: w, //200,
              height: h, // 60
              stroke: color,
              radius: r,
              fill: "#fff",
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "main-box",
            draggable: true,
          });

          // title text
          group.addShape("text", {
            attrs: {
              textBaseline: "top",
              x: -w / 2,
              y: -h / 2 + 6,
              lineHeight: 20,
              text: cfg.id + "三个字",
              fill: "red",
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "title",
          });
          return shape;
        },
        setState(name, value, item) {
          if (name === "collapsed") {
            const marker = item
              .get("group")
              .find((ele) => ele.get("name") === "collapse-icon");
            const icon = value ? G6.Marker.expand : G6.Marker.collapse;
            marker.attr("symbol", icon);
          }
        },
      });

      const data = {
        id: "A",
        children: [
          {
            id: "A1",
            label: "测试",
            children: [
              { id: "A11" },
              { id: "A12" },
              { id: "A13" },
              { id: "A14" },
            ],
          },
          {
            id: "A2",
            children: [
              {
                id: "A21",
                children: [
                  {
                    id: "A211",
                    children: [
                      { id: "A2111" },
                      { id: "A2112" },
                      { id: "A2113" },
                      { id: "A2114" },
                    ],
                  },
                  { id: "A212" },
                ],
              },
              {
                id: "A22",
              },
            ],
          },
          {
            id: "A3",
            children: [
              {
                id: "A31",
                children: [{ id: "A311" }, { id: "A312" }],
              },
              {
                id: "A32",
              },
            ],
          },
          {
            id: "A4",
            children: [
              {
                id: "A41",
                children: [{ id: "A411" }, { id: "A412" }],
              },
              {
                id: "A42",
              },
            ],
          },
          {
            id: "A5",
            children: [
              {
                id: "A51",
                children: [{ id: "A511" }, { id: "A512" }],
              },
              {
                id: "A52",
              },
            ],
          },
          {
            id: "A6",
            children: [
              {
                id: "A61",
                children: [{ id: "A611" }, { id: "A612" }],
              },
              {
                id: "A62",
              },
            ],
          },
          {
            id: "A7",
            children: [
              {
                id: "A71",
                children: [{ id: "A711" }, { id: "A712" }],
              },
              {
                id: "A72",
              },
            ],
          },
          // {
          //   id: "A8",
          //   children: [
          //     {
          //       id: "A81",
          //       children: [{ id: "A811" }, { id: "A812" }],
          //     },
          //     {
          //       id: "A82",
          //     },
          //   ],
          // },
          // {
          //   id: "A7",
          //   children: [
          //     {
          //       id: "A71",
          //       children: [{ id: "A711" }, { id: "A712" }],
          //     },
          //     {
          //       id: "A72",
          //     },
          //   ],
          // },
          // {
          //   id: "A8",
          //   children: [
          //     {
          //       id: "A81",
          //       children: [{ id: "A811" }, { id: "A812" }],
          //     },
          //     {
          //       id: "A82",
          //     },
          //   ],
          // },
        ],
      };

      const container = document.getElementById("container");
      const width = window.innerWidth;
      const height = window.innerHeight;
      G6.registerEdge("treeEdge", {
        draw(cfg, group) {
          const { sourceNode, targetNode } = cfg;
          const sourceNodeBBox = sourceNode.getBBox();
          const targetNodeBBox = targetNode.getBBox();
          const dir =
            targetNodeBBox.centerX > sourceNodeBBox.centerX ? "right" : "left";

          const startPosX =
            dir === "right"
              ? sourceNodeBBox.x + sourceNodeBBox.width
              : sourceNodeBBox.x;
          const targetPosX =
            dir === "right"
              ? targetNodeBBox.x
              : targetNodeBBox.x + targetNodeBBox.width;
          const halfX = (targetPosX + startPosX) / 2;

          const path = [
            ["M", startPosX, sourceNodeBBox.centerY],
            ["L", halfX, sourceNodeBBox.centerY],
            ["L", halfX, targetNodeBBox.centerY],
            ["L", targetPosX, targetNodeBBox.centerY],
          ];
          const shape = group.addShape("path", {
            attrs: {
              stroke: "#aab7c4",
              path,
            },
          });
          if (cfg.label) {
            group.addShape("text", {
              //线条上显示文本
              attrs: {
                text: cfg.label,
                x: -130,
                y: 280,
                fill: "#333",
              },
              name: "text-shape",
            });
          }
          return shape;
        },
      });
      const graph = new G6.TreeGraph({
        container: "container",
        width,
        height,
        minZoom: 0.5,
        modes: {
          default: ["collapse-expand", "drag-canvas", "scroll-canvas"],
        },
        defaultNode: {
          type: "card-node",
          size: [60, 20],
        },
        defaultEdge: {
          type: "treeEdge",
          labelCfg: {
            style: {
              fill: "#fff",
              fontSize: 14,
            },
          },
          // type: "cubic-horizontal",
          // style: {
          //   endArrow: true,
          //   stroke: "red",
          // },
        },
        layout: {
          type: "indented",
          // direction: "LR", //LR RL H
          dropCap: false,
          indent: 140,
          getHeight: () => {
            return 25;
          },
          getVGap: () => {
            return 0;
          },
          getHGap: () => {
            return 0;
          },
          getSide: (d) => {
            console.log(2222);
            if (d.id === "A312") return "left";
            return "right";
          },
          // radial: true,
        },
      });
      // const subgraphLayout = new G6.Layout["force"]({
      //   center: [500, 450],
      // });
      // 初始化布局，灌入子图数据
      // subgraphLayout.init({
      //   nodes: subGraphNodes,
      //   edges: subGraphEdges,
      // });
      graph.data(data);
      graph.render();
      // graph.fitView();
      graph.on("node:click", (e) => {
        if (e.target.get("name") === "collapse-icon") {
          e.item.getModel().collapsed = !e.item.getModel().collapsed;
          graph.setItemState(e.item, "collapsed", e.item.getModel().collapsed);
          graph.layout();
        }
      });

      if (typeof window !== "undefined")
        window.onresize = () => {
          if (!graph || graph.get("destroyed")) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
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
