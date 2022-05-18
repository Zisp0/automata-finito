const myDiagram = new go.Diagram("myDiagramDiv", {
  "undoManager.isEnabled": true,
});

const graph = go.GraphObject.make;

myDiagram.linkTemplate = graph(
  go.Link, // the whole link panel
  {
    curve: go.Link.Bezier,
    adjusting: go.Link.Stretch,
    reshapable: false,
    relinkableFrom: false,
    relinkableTo: false,
    toShortLength: 3,
  },
  new go.Binding("points").makeTwoWay(),
  new go.Binding("curviness"),
  graph(
    go.Shape,
    // the Shape.stroke color depends on whether Link.isHighlighted is true
    new go.Binding("stroke", "isHighlighted", function (h) {
      return h ? "#726eff" : "black";
    }).ofObject(),
    // the Shape.strokeWidth depends on whether Link.isHighlighted is true
    new go.Binding("strokeWidth", "isHighlighted", function (h) {
      return h ? 3 : 1;
    }).ofObject()
  ),
  graph(
    go.Shape,
    { toArrow: "Standard", strokeWidth: 0 },
    // the Shape.fill color depends on whether Link.isHighlighted is true
    new go.Binding("fill", "isHighlighted", function (h) {
      return h ? "#726eff" : "black";
    }).ofObject()
  ),
  graph(
    go.Panel,
    "Auto",
    graph(
      go.Shape, // the label background, which becomes transparent around the edges
      {
        fill: graph(go.Brush, "Radial", {
          1: "#DAE4E4",
        }),
        stroke: null,
        name: "SHAPE",
      }
    ),
    graph(
      go.TextBlock,
      // editing the text automatically updates the model data
      new go.Binding("text").makeTwoWay()
    )
  )
);

myDiagram.nodeTemplateMap.add(
  "normal",
  graph(
    go.Node,
    "Auto",
    { desiredSize: new go.Size(47, 47) },
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    graph(go.Shape, "Circle", {
      fill: "#08c6ab",
      stroke: "black",
      portId: "",
      fromLinkable: false,
      fromLinkableSelfNode: false,
      fromLinkableDuplicates: false,
      toLinkable: false,
      toLinkableSelfNode: false,
      toLinkableDuplicates: false,
      cursor: "pointer",
      name: "SHAPE",
    }),
    graph(
      go.TextBlock,
      {
        font: "bold 16pt helvetica, bold arial, sans-serif",
        stroke: "black",
      },
      new go.Binding("text").makeTwoWay()
    )
  )
);

myDiagram.nodeTemplateMap.add(
  "final",
  graph(
    go.Node,
    "Auto",
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    graph(go.Shape, "Circle", {
      fill: "#08c6ab",
      stroke: "black",
      portId: "",
      fromLinkable: false,
      fromLinkableSelfNode: false,
      fromLinkableDuplicates: false,
      toLinkable: false,
      toLinkableSelfNode: false,
      toLinkableDuplicates: false,
      cursor: "pointer",
      name: "SHAPE",
    }),
    graph(go.Shape, "Circle", {
      fill: null,
      desiredSize: new go.Size(30, 30),
      strokeWidth: 1,
      stroke: "black",
    }),
    graph(
      go.TextBlock,
      {
        font: "bold 16pt helvetica, bold arial, sans-serif",
        stroke: "black",
      },
      new go.Binding("text").makeTwoWay()
    )
  )
);

myDiagram.nodeTemplateMap.add(
  "vacio",
  graph(
    go.Node,
    "Auto",
    { desiredSize: new go.Size(47, 47) },
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    graph(go.Shape, "Circle", {
      fill: "transparent" /* green */,
      stroke: null,
      portId: "",
      fromLinkable: false,
      fromLinkableSelfNode: false,
      fromLinkableDuplicates: false,
      toLinkable: false,
      toLinkableSelfNode: false,
      toLinkableDuplicates: false,
      cursor: "pointer",
    }),
    graph(
      go.TextBlock,
      {
        font: "bold 16pt helvetica, bold arial, sans-serif",
        stroke: "whitesmoke",
      },
      new go.Binding("text").makeTwoWay()
    )
  )
);

myDiagram.model = new go.GraphLinksModel(
  [
    { key: -1, loc: "-620 0", category: "vacio" },
    { key: 0, text: "q0", loc: "-500 0", category: "normal" },
    { key: 1, text: "q1", loc: "-400 0", category: "final" },
    { key: 2, text: "q2", loc: "-300 -60", category: "normal" },
    { key: 3, text: "q3", loc: "-300 60", category: "final" },
    { key: 4, text: "q4", loc: "-200 60", category: "final" },
    { key: 5, text: "q5", loc: "-200 -60", category: "final" },
    { key: 6, text: "q6", loc: "-100 -60", category: "final" },
    { key: 7, text: "q7", loc: "-100 60", category: "normal" },
    { key: 8, text: "q8", loc: "0 60", category: "final" },
  ],
  [
    { from: -1, to: 0, text: "Inicio", curviness: 0 },
    { from: 0, to: 1, text: "b", curviness: 0 },
    { from: 1, to: 2, text: "a", curviness: 0 },
    { from: 1, to: 3, text: "b", curviness: 0 },
    { from: 2, to: 5, text: "a", curviness: -20 },
    { from: 3, to: 4, text: "a", curviness: 0 },
    { from: 4, to: 5, text: "a", curviness: 0 },
    { from: 4, to: 7, text: "b", curviness: 0 },
    { from: 5, to: 2, text: "a", curviness: -20 },
    { from: 5, to: 6, text: "b", curviness: 0 },
    { from: 6, to: 6, text: "b", curviness: -10 },
    { from: 6, to: 2, text: "a", curviness: -60 },
    { from: 7, to: 8, text: "a", curviness: -20 },
    { from: 8, to: 7, text: "b", curviness: -20 },
  ]
);

function colorearNodo(num) {
  node = myDiagram.findNodeForKey(num);
  shape = node.findObject("SHAPE");
  shape.fill = "#726eff";
}

function colorearEnlace(nodoInicial, nodoFinal) {
  ini = myDiagram.findNodeForKey(nodoInicial);
  ini.findLinksOutOf().each(function (i) {
    fin = myDiagram.findNodeForKey(nodoFinal);
    fin.findLinksInto().each(function (f) {
      if (i == f) {
        i.isHighlighted = true;
      }
    });
  });
}

function colorNodo(num, inc) {
  setTimeout(function () {
    colorearNodo(num);
  }, 0);
  setTimeout(function () {
    nodoOriginal(num);
  }, inc);
}

function nodoOriginal(num) {
  node = myDiagram.findNodeForKey(num);
  shape = node.findObject("SHAPE");
  shape.fill = "#08c6ab";
}

function enlaceOriginal(nodoInicial, nodoFinal) {
  ini = myDiagram.findNodeForKey(nodoInicial);
  ini.findLinksOutOf().each(function (i) {
    fin = myDiagram.findNodeForKey(nodoFinal);
    fin.findLinksInto().each(function (f) {
      if (i == f) {
        i.isHighlighted = false;
      }
    });
  });
}

function colorEnlace(inicio, final, inc) {
  setTimeout(function () {
    colorearEnlace(inicio, final);
  }, 0);
  setTimeout(function () {
    enlaceOriginal(inicio, final);
  }, inc);
}
