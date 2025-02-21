import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Image } from "cloudinary-react";
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export default React.memo(function UserImages({
  open,
  setOpen,
  data,
  showAddImage,
  info,
  success,
  error,
  dismissAll,
  showDelete
}) {
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation">
      <h3 className="text-xl mt-1 mb-1 text-center  font-bold text-pri ">
        {" "}
        Your Images{" "}
      </h3>
      <div className="h-[80vh] overflow-y-scroll no-scrollbar w-full px-1 py-1 ">
        {data.map((each, i) => (
          <div
            key={i}
            className="flexCenter  gap-4 h-[60px] shadow-inner w-full "
          >
            <Image
              key={each.img_id}
              cloudName={cloudName}
              publicId={each.img_url}
              alt="image"
              width="50"
              height="50"
              loading="lazy"
              className="w-[50px] h-[50px] "
            />
            <CopyToClipboard
              text={each.img_url}
              onCopy={() => {
                success("Copied to Clipboard!");
                setTimeout(() => {
                  dismissAll();
                }, 2000);
              }}
            >
              <FaRegCopy className="text-2xl " title="Copy" />
            </CopyToClipboard>
            <MdDeleteForever
              title="Delete"
              className="text-2xl hover:text-pri "
              onClick={()=> showDelete({id:each.img_id,url:each.img_url}) }
            />
          </div>
        ))}
      </div>
      <Divider />
      <List className="h-[20vh] flexCenter items-start  ">
        <Button
          onClick={() => {
            showAddImage();
          }}
        >
          Add Images
        </Button>
      </List>
    </Box>
      </Drawer>
    </div>
  );
})
