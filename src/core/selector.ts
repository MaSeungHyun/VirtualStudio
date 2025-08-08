import * as THREE from "three";
import { SelectionBox } from "three/addons/interactive/SelectionBox.js";
import { SelectionHelper } from "three/addons/interactive/SelectionHelper.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";
import { CopyShader } from "three/addons/shaders/CopyShader.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { MOUSE_LEFT } from "../constants/controls";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const params = {
  edgeStrength: 3.0,
  edgeGlow: 0.0,
  edgeThickness: 1.0,
  pulsePeriod: 0,
  rotate: false,
  usePatternTexture: false,
};

export class Selector {
  private box: SelectionBox;
  private helper: SelectionHelper;
  private _renderer: THREE.WebGLRenderer;
  private _dom: HTMLElement;
  private _scene: THREE.Scene;
  private _camera: THREE.Camera;
  // private _composer: EffectComposer;
  // private _renderPass: RenderPass;
  // private _outlinePass: OutlinePass;
  // private _active_mouse_left: boolean = false;

  private _pointerDown: (event: MouseEvent) => void;
  private _pointerMove: (event: MouseEvent) => void;
  private _pointerUp: (event: MouseEvent) => void;

  constructor(
    renderer: THREE.WebGLRenderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
    dom: HTMLElement,
  ) {
    this._renderer = renderer;
    this._dom = dom;
    this._scene = scene;
    this._camera = camera;
    this.box = new SelectionBox(camera, scene);
    this.helper = new SelectionHelper(renderer, "selectBox");

    this._pointerDown = this.onPointerDown.bind(this);
    this._pointerMove = this.onPointerMove.bind(this);
    this._pointerUp = this.onPointerUp.bind(this);

    const renderTarget = new THREE.WebGLRenderTarget(this._dom.clientWidth, this._dom.clientHeight);

    // this._composer = new EffectComposer(this._renderer, renderTarget);
    // this._composer.renderer.autoClear = false;
    // this._renderPass = new RenderPass(this._scene, this._camera);
    // this._composer.addPass(this._renderPass);

    // this._outlinePass = new OutlinePass(
    //   new THREE.Vector2(
    //     this._renderer.domElement.clientWidth,
    //     this._renderer.domElement.clientHeight
    //   ),
    //   this._scene as THREE.Scene,
    //   this._camera as THREE.Camera
    // );
    // this._outlinePass.edgeStrength = 3.0;
    // this._outlinePass.edgeGlow = 0.1;
    // this._outlinePass.edgeThickness = 1.0;
    // this._outlinePass.visibleEdgeColor.set(0x00ced6);
    // this._composer.addPass(this._outlinePass);

    // const outputPas = new OutputPass();
    // this._composer.addPass(outputPas);

    // const effectFXAA = new ShaderPass(FXAAShader);

    // effectFXAA.renderToScreen = true;

    // effectFXAA.uniforms["resolution"].value.set(
    //   1 / this._dom.clientWidth,
    //   1 / this._dom.clientHeight
    // );

    // this._composer.addPass(effectFXAA);
    // this._composer.setSize(this._dom.clientWidth, this._dom.clientHeight);

    // const smaaPass = new SMAAPass(
    //   this._renderer.domElement.clientWidth,
    //   this._renderer.domElement.clientHeight
    // );
    // this._composer.addPass(smaaPass);
    this._dom.addEventListener("pointerdown", (event: MouseEvent) => {
      this._pointerDown(event);
    });
  }

  // get composer() {
  // return this._composer;
  // }
  // get renderPass() {
  // return this._renderPass;
  // }

  public onPointerDown(event: MouseEvent) {
    if (event.button === MOUSE_LEFT) {
      // this._active_mouse_left = true;
      // this._outlinePass.selectedObjects = [];

      const rect = this._renderer.domElement.getBoundingClientRect();
      this.box.startPoint.set(
        (event.clientX / rect.width) * 2 - 1,
        -(event.clientY / rect.height) * 2 + 1,
        0,
      );

      this._renderer.domElement.addEventListener("pointermove", this._pointerMove);

      this._renderer.domElement.addEventListener("pointerup", this._pointerUp);
    }
  }

  public onPointerMove(event: MouseEvent) {
    // console.log(event.button);
    if (this.helper.isDown) {
      //   console.log("fasdfad");
      const rect = this._renderer.domElement.getBoundingClientRect();
      this.box.endPoint.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
        0,
      );

      // this._outlinePass.selectedObjects = this.box.select();
      //   console.log(this._outlinePass.selectedObjects);
      // this.render();
    }
  }

  public onPointerUp(event: MouseEvent) {
    event.stopPropagation();
    const rect = this._renderer.domElement.getBoundingClientRect();

    this.box.endPoint.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
      0,
    );
    // this._outlinePass.selectedObjects = this.box.select();

    this._dom.removeEventListener("pointermove", this._pointerMove.bind(this));
    this._dom.removeEventListener("pointerup", this._pointerUp);
    this._dom.removeEventListener("pointerdown", this._pointerDown);
  }

  public dispose() {
    this.helper.dispose();
    this._dom.removeEventListener("pointermove", this._pointerMove);
    this._dom.removeEventListener("pointerup", this._pointerUp);
    this._dom.removeEventListener("pointerdown", this._pointerDown);
  }

  // public render() {
  //   this._composer.render();
  //   this._composer.renderer.autoClear = true;
  // }
}
