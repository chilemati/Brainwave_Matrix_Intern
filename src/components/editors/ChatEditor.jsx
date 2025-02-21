import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import TakeInput from "../diaglog/TakeInput";
import ImageResize from "quill-image-resize-module-react";
import "./create.scss";

Quill.register("modules/imageResize", ImageResize);
var Font = Quill.import("formats/font");
Font.whitelist = [
  "Roboto",
  "Raleway",
  "Montserrat",
  "Lato",
  "Rubik",
  "Poppins",
  "Grypen",
  "Kalam",
];
Quill.register(Font, true);

const flex1 = Quill.import("blots/block");

var icons = Quill.import("ui/icons");
icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
  
}



const ChatEditor = ({ id, label, value, setValue }) => {
  const quillRef = useRef();
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState(null);
  let actionType = useRef(null);
  var index = quillRef.current?.selection?.index;

  const addImage = (url) => {
    const editor = quillRef.current.getEditor();
    editor.insertEmbed(index, "image", url);
  };

  const imageHandler = async (e) => {
    actionType.current = 0;
    setInfo({
      title: "Add Image Url",
      msg: "Please copy and paste the image Url below",
    });
    setOpen(true);
  };
  
  
  const modules = useRef(
    {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ script: "sub" }, { script: "super" }],
          ["image", "link", "video", "blockquote", "code-block"],
          [{ align: [] }],
          ["undo"],
          ["redo"],
          [{ size: ["small", false, "large", "huge"] }],
          [{ direction: "rtl" }],
          [{ font: Font.whitelist }],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
            {
              background: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
        handlers: {
          image: imageHandler,
          undo: undoChange,
          redo: redoChange,
        },
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
        handleStyles: {},
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }
  ) ;

 

  useEffect(() => {
    var range = quillRef.current && quillRef.current.getEditorSelection();
  }, []);

  return (
    <div id="QuillEditor">
      <ReactQuill
        className=".ql-snow"
        id="ChatEditor"
        theme="snow"
        ref={(el) => {
          quillRef.current = el;
        }}
        value={value}
        modules={modules.current}
        onChange={(el) => {
         setValue(prev => el);
        }}
      />

      <TakeInput open={open} setOpen={setOpen} action={addImage} />
    </div>
  );
};

export default React.memo(ChatEditor);
