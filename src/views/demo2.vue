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
      const data = {
        nodes: [
          {
            id: "l0",
            label: "topic根",
            level: "ROOT",
            anchorPoints: [[0.5, 1]],
          },

          {
            id: "l20",
            label: "项目",
            level: "PROJECT-GROUP",
            anchorPoints: [
              [0.5, 0],
              [1, 0.5],
            ],
          },
          {
            id: "l21",
            label: "需求",
            level: "REQ-GROUP",
            anchorPoints: [
              [0.5, 0],
              [1, 0.5],
            ],
          },
          {
            id: "l22",
            label: "卡片",
            level: "CARD-GROUP",
            anchorPoints: [
              [0.5, 0],
              [1, 0.5],
            ],
          },

          // {id: 'l30J', label: '  ', level: 'JOIN-PROJECT'},
          {
            id: "l400",
            label: "项目1",
            level: "PROJECT",
            comboId: "combo-project-1",
          },
          {
            id: "l301",
            label: "项目BBBB",
            level: "PROJECT",
            comboId: "combo-project-1",
          },
          {
            id: "l302",
            label: "项目C",
            level: "PROJECT",
            comboId: "combo-project-1",
          },
          {
            id: "l303",
            label: "项目DD",
            level: "PROJECT",
            comboId: "combo-project-1",
          },

          { id: "l310", label: "需求11", level: "EPIC" },
          { id: "l311", label: "需求22", level: "EPIC" },
          { id: "l312", label: "需求33", level: "EPIC" },
          { id: "l313", label: "特性AA", level: "FEATURE" },

          { id: "l320", label: "卡片89", level: "CARD" },
          { id: "l321", label: "卡片999999", level: "CARD" },
          { id: "l322", label: "卡片fasdfasd", level: "CARD" },
          { id: "l323", label: "卡片fadsfasdfa", level: "CARD" },
          { id: "l324", label: "卡片对联温州话", level: "CARD" },
        ],
        edges: [
          { source: "l0", target: "l20", type: "polyline" },
          { source: "l0", target: "l21", type: "polyline" },
          { source: "l0", target: "l22", type: "polyline" },

          // {source: 'l20', target: 'combo-project-1'},
          { source: "l20", target: "l400" },
          { source: "l20", target: "l301" },
          { source: "l20", target: "l302" },
          { source: "l20", target: "l303" },

          { source: "l21", target: "l310" },
          { source: "l21", target: "l311" },
          { source: "l21", target: "l312" },
          { source: "l21", target: "l313" },

          { source: "l22", target: "l320" },
          { source: "l22", target: "l321" },
          { source: "l22", target: "l322" },
          { source: "l22", target: "l323" },
          { source: "l22", target: "l324" },
        ],
        combos: [
          // {id: 'combo-project-1', type: 'rect', label: '项目'}
        ],
      };
      const leftWidth = 100;

      const contentWidth = window.innerWidth - leftWidth;

      const begins = this.calculateBegins(3, 40, 10, contentWidth);

      const graph = new G6.Graph({
        container: "container",
        width: contentWidth,
        height: window.innerHeight,
        fitView: true,
        fitViewPadding: 40,
        modes: {
          // default: ['drag-node'],
        },
        defaultNode: {
          size: 80,
          style: {
            fill: "#C6E5FF",
            stroke: "#5B8FF9",
          },
          type: "rect",
        },
        defaultEdge: {
          size: 2,
          color: "blue",
          type: "cubic-horizontal",
        },
        layout: {
          pipes: [
            {
              type: "dagre",
              rankDir: "TB",
              direction: "LR",

              nodesFilter: (node) =>
                ["ROOT", "PROJECT-GROUP", "REQ-GROUP", "CARD-GROUP"].includes(
                  node.level
                ),
            },
            {
              type: "grid",
              columns: 1,
              begin: begins[0],
              nodesFilter: (node) => ["PROJECT"].includes(node.level),
            },
            {
              type: "grid",
              columns: 1,
              nodesFilter: (node) => ["EPIC", "FEATURE"].includes(node.level),

              begin: begins[1],
              nodesep: 20,
              ranksep: 50,
            },
            {
              type: "grid",
              columns: 1,
              nodesFilter: (node) => ["CARD"].includes(node.level),

              begin: begins[2],
              nodesep: 20,
              ranksep: 50,
            },
          ],
        },
      });
      graph.data(data);
      graph.render();
    },
    calculateBegins(level2Number, level2Width, l3offset, contentWidth) {
      const y = 400;

      return [...Array(level2Number).keys()].map((no) => [100 + 300 * no, y]);
      const padding = contentWidth % level2Number;

      const columnWidth = padding
        ? (contentWidth - padding) / level2Number
        : contentWidth / level2Number;

      return [...Array(level2Number).keys()].map((no) => [
        padding + columnWidth * no + level2Width + l3offset,
        y,
      ]);
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
