import Toolbar from "@/components/Toolbar";

import { Context } from "@/core/context";
import Icon from "@/components/Icon";

function SceneViewToolbar() {
  const handleClickChange2DView = () => {
    const context = Context.getInstance();
    context.scene!.change2DView();
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
        <Toolbar.Item shape="rect" size="md" className="w-8">
          <Icon icon="Grid" className="h-4 w-4" />
        </Toolbar.Item>
      </Toolbar.Group>
    </Toolbar.Container>
  );
}

export default SceneViewToolbar;
