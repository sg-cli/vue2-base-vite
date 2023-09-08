<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  name: "G6Demo",
  mounted() {
    this.initTree();
  },
  methods: {
    initTree() {
      const fontSize = 15;
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
      G6.registerNode("crect", {
        draw: (cfg, group) => {
          const width = cfg.id.length * 10;
          const rect = group.addShape("rect", {
            attrs: {
              x: 0,
              y: -10,
              ...cfg.style,
              width,
              height: 20,
              lineWidth: 0,
              opacity: 0,
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "rect-shape",
            draggable: true,
          });
          const label = group.addShape("text", {
            attrs: {
              text: cfg.id,
              fill: "#ccc",
              fontSize,
              x: 0,
              y: 0,
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "label-shape",
            draggable: true,
          });
          const labelBBox = label.getBBox();
          const icon = group.addShape("circle", {
            attrs: {
              x: labelBBox.maxX + 10,
              y: (labelBBox.minY + labelBBox.maxY) / 2,
              r: 5,
              stroke: "#000",
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "circle-shape",
            draggable: true,
          });
          const bboxWidth = label.getBBox().width + 20;
          rect.attr({ width: bboxWidth });

          group.addShape("path", {
            attrs: {
              lineWidth: 1,
              fill: "#ccc",
              stroke: "#ccc",
              path: [
                ["M", 0, 0],
                ["L", bboxWidth, 0],
              ],
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: "path-shape",
            draggable: true,
          });

          return rect;
        },
        getAnchorPoints: (type, cfg) => {
          return [
            [0, 0.5],
            [1, 0.5],
          ];
        },
      });

      fetch(
        "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
      )
        .then((res) => res.json())
        .then((data) => {
          data = {
            id: "Modeling Methods",
            children: [
              {
                id: "Classification",
                children: [
                  {
                    id: "Logistic regression",
                  },
                  {
                    id: "Linear discriminant analysis",
                  },
                  {
                    id: "Rules",
                  },
                  {
                    id: "Decision trees",
                  },
                  {
                    id: "Naive Bayes",
                  },
                  {
                    id: "K nearest neighbor",
                  },
                  {
                    id: "Probabilistic neural network",
                  },
                  {
                    id: "Support vector machine",
                  },
                ],
              },
              {
                id: "Consensus",
                children: [
                  {
                    id: "Models diversity",
                    children: [
                      {
                        id: "Different initializations",
                      },
                      {
                        id: "Different parameter choices",
                      },
                      {
                        id: "Different architectures",
                      },
                      {
                        id: "Different modeling methods",
                      },
                      {
                        id: "Different training sets",
                      },
                      {
                        id: "Different feature sets",
                      },
                    ],
                  },
                  {
                    id: "Methods",
                    children: [
                      {
                        id: "Classifier selection",
                      },
                      {
                        id: "Classifier fusion",
                      },
                    ],
                  },
                ],
              },
            ],
          };
          const graph = new G6.TreeGraph({
            container: "container",
            width: window.innerWidth,
            height: window.innerHeight,
            modes: {
              default: ["collapse-expand", "drag-canvas", "zoom-canvas"],
            },
            defaultNode: {
              type: "rect",
            },
            defaultEdge: {
              type: "treeEdge",
              labelCfg: {
                style: {
                  fill: "#fff",
                  fontSize: 14,
                },
              },
            },
            layout: {
              type: "compactBox",
              direction: "V",
              getId: function getId(d) {
                return d.id;
              },
              getHeight: function getHeight() {
                return 16;
              },
              getVGap: function getVGap() {
                return 10;
              },
              getHGap: function getHGap() {
                return 100;
              },
              getWidth: function getWidth(d) {
                return G6.Util.getTextSize(d.id, fontSize)[0] + 20;
              },
            },
            fitView: true,
          });
          graph.data(data);
          graph.render();

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
