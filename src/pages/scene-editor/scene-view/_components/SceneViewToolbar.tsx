import Toolbar from "@/components/Toolbar";
import { useEditor } from "@/hooks/useEditor";
import Icon from "@/components/Icon";
import { useState } from "react";
import { cn } from "@/utils/style";
import ViewportShadingDropdown from "./ViewportShadingDropdown";

function SceneViewToolbar() {
  const context = useEditor();
  const [hdr, setHdr] = useState(true);

  const handleClickChange2DView = () => {
    context.scene!.change2DView();
  };

  const handleClickShowHDR = () => {
    if (hdr) {
      context.scene!.hiddenHDR();
      setHdr(false);
    } else {
      context.scene!.showHDR();
      setHdr(true);
    }
  };
  return (
    <Toolbar.Container className="bg-black-700 flex w-full pt-[0.1rem]">
      <div className="flex items-center gap-2">
        <Toolbar.Item shape="rect" size="md">
          <Icon icon="Plus" />
        </Toolbar.Item>
        <Toolbar.Group>
          <Toolbar.Item shape="rect" size="md">
            <Icon icon="Dot" />
          </Toolbar.Item>
          <Toolbar.Item shape="rect" size="md" selected={true}>
            <Icon icon="SquareDashed" />
          </Toolbar.Item>
          <Toolbar.Item shape="rect" size="md">
            <Icon icon="Square" />
          </Toolbar.Item>
          <Toolbar.Item shape="rect" size="md">
            <Icon icon="Square" className="fill-[#D1D1D377]" />
          </Toolbar.Item>
        </Toolbar.Group>
        <Toolbar.Group>
          <Toolbar.Item shape="rect" size="md">
            <Icon icon="Slash" />
          </Toolbar.Item>
          <Toolbar.Item shape="rect" size="md">
            <Icon icon="Spline" />
          </Toolbar.Item>
        </Toolbar.Group>
      </div>
      <Toolbar.Group className="absolute right-0 gap-0.5">
        <Toolbar.Item
          shape="rect"
          size="md"
          className="w-8 text-[0.75rem]"
          onClick={handleClickChange2DView}
        >
          2D
        </Toolbar.Item>
        <Toolbar.Item shape="rect" size="md" className="w-8">
          <Icon icon="Video" className="h-4 w-4" />
        </Toolbar.Item>
        <ViewportShadingDropdown>
          <Toolbar.Item shape="rect" size="md" className="w-8">
            <Icon icon="Grid" className="h-4 w-4" />
          </Toolbar.Item>
        </ViewportShadingDropdown>
        <Toolbar.Item shape="rect" size="md" className="w-8" onClick={handleClickShowHDR}>
          <Icon icon="Cloud" className={cn("h-4 w-4", hdr ? "fill-white" : "fill-transparent")} />
        </Toolbar.Item>
      </Toolbar.Group>
    </Toolbar.Container>
  );
}

export default SceneViewToolbar;
