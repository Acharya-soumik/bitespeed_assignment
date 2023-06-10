// Import Modules
import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
// Import Components
import Header from "./components/Header";
import MessageNode from "./components/MessageNode";
import Sidebar from "./components/Sidebar";
// Import Assets/Styles
import "reactflow/dist/style.css";

let id = 0;
const getId = () => `my_id_${id++}`;
const nodeTypes = {
  message: MessageNode,
};

let initState = { message: "Hi, Message" };

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(false);
  const [nodeName, setNodeName] = useState(initState);

  console.log(nodeName, "is node name");

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        node.data = {
          ...node.data,
          text: nodeName["message"],
        };

        return node;
      })
    );
  }, [nodeName, setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node`, text: nodeName["message"] },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, nodeName]
  );

  const isValidConnection = (connection) => {
    let isValid = true;
    edges.forEach((item) => {
      if (connection.source && item.source === connection.source)
        isValid = false;
    });
    return isValid;
  };

  const handleTextChange = (e) => {
    setNodeName((prev) => ({ ...prev, message: e.target.value }));
  };

  const onSave = () => {
    let keys = {};
    edges.forEach((item) => {
      if (item.target) keys[item.target] = 1;
    });
    if (Object.keys(keys).length === nodes.length) {
      alert("saved!");
      setSelectedNode(false);
    } else {
      alert("error, cannot save");
    }
  };
  return (
    <div>
      <Header onSave={onSave} />
      <div className="flex flex-grow h-[90vh] w-[100vw]">
        <ReactFlowProvider>
          <div
            className="reactflow-wrapper flex-grow h-full bg-emerald-50"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              isValidConnection={isValidConnection}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              onNodeClick={(_, node) =>
                setSelectedNode(selectedNode ? false : node.id)
              }
            >
              <Controls />
            </ReactFlow>
          </div>
          <Sidebar
            selectedNode={selectedNode}
            onChange={handleTextChange}
            nodeValue={nodeName}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DnDFlow;
