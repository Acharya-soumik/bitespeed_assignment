import { Handle, Position } from "reactflow";

function MessageNode({ data }) {
  return (
    <div className="">
      <Handle
        type="source"
        id="source"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div className="bg-fuchsia-400 rounded-t-lg p-2">
        <p className="text-[10px]">Send Message</p>
      </div>

      <Handle type="target" id="target" position={Position.Right} />
      <div className="bg-white rounded-b-lg p-2">
        <p className="text-[8px]">{data.text}</p>
      </div>
    </div>
  );
}

export default MessageNode;
