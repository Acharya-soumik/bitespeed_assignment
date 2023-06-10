function Sidebar({ onChange, selectedNode, nodeValue }) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="px-2 py-6 flex bg-gray-200 px-10">
      {!selectedNode ? (
        <div
          className="h-[20px] p-5 flex justify-center items-center border border-teal-400 rounded"
          onDragStart={(event) => onDragStart(event, "message")}
          draggable
        >
          Messages
        </div>
      ) : (
        <div>
          <p>Message</p>
          <input value={nodeValue["message"]} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
