/*
//
// Scene-Editor에서 사용되는
// Scene(Multi-Scene), Camera를 관리합니다.
// 카메라는 다른 Scene이 겹쳐질 경우
// 같은 카메라에서 어떻게 보이는지 확인을 위해 각 카메라 공유
//
*/

import * as THREE from "three";
import { Scene } from "./scene";
import { PerspectiveControls } from "./perspective-controls";
import { TransformControls } from "./transform-controls";
import { OrthographicControls } from "./orthographic-controls";
import { DEFAULT_CAMERA_SPEC } from "../constants/camera";
import { ViewHelper } from "./view-helper";
import JEASINGS from "jeasings";

export class Context {
  private static instance: Context;
  private _renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  private _id: number = 0;
  private _scenes: Scene[] = [];
  private _scene: Scene | null = null;
  private _cameras: THREE.Camera[] = [];
  private _camera: THREE.Camera | null = null;
  private _controls: PerspectiveControls | OrthographicControls | null = null;
  private _persepectiveControls: PerspectiveControls | null = null;
  private _orthographicControls: OrthographicControls | null = null;
  private _dom: HTMLDivElement | null = null;
  private _transformControls: TransformControls | null = null;
  private _listeners: (() => void)[] = [];
  private _viewHelper: ViewHelper | null = null;

  constructor() {
    console.log("%cInitialize Scene Editor Context", "color: #00ffff;");
    this._renderer.setClearColor(0x000000, 0);
  }

  public didMount(dom: HTMLDivElement) {
    console.log("%cMounted SceneView", "color: #00ffff;");

    this._dom = dom;
    const scene = new Scene(`Scene`);
    const scene2 = new Scene(`Scene 2`);
    this._scenes = [scene, scene2];
    this._scene = scene;
    this._cameras = [scene.camera];
    this._camera = scene.camera;

    // 새로운 DOM 요소로 controls 재생성
    this._persepectiveControls = new PerspectiveControls(
      this._scene.camera as THREE.PerspectiveCamera,
      this._dom!,
    );

    this._orthographicControls = new OrthographicControls(
      this._scene.camera as THREE.OrthographicCamera,
      this._dom!,
    );

    this._controls = this._persepectiveControls;

    this._viewHelper = new ViewHelper(
      this._camera as THREE.PerspectiveCamera | THREE.OrthographicCamera,
      dom,
    );

    this._renderer.setAnimationLoop(() => this.render());
  }

  public static getInstance(): Context {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }

  get renderer() {
    return this._renderer;
  }

  get dom() {
    if (!this._dom) {
      throw new Error("DOM is not initialized");
    }
    return this._dom;
  }

  set dom(dom: HTMLDivElement | null) {
    this._dom = dom;
  }

  public addScene(scene: Scene) {
    this._scenes = [...this._scenes, scene];
  }
  get scenes() {
    return this._scenes;
  }

  get transformControls() {
    if (!this._transformControls) {
      throw new Error("TransformControls is not initialized");
    }
    return this._transformControls;
  }
  set transformControls(transformControls: TransformControls) {
    this._transformControls = transformControls;
  }

  get scene(): Scene | null {
    if (!this._scene) {
      return null;
    }
    return this._scene;
  }

  set controls(controls: PerspectiveControls | OrthographicControls) {
    this._controls = controls;
  }

  get persepectiveControls() {
    if (!this._persepectiveControls) {
      throw new Error("PerspectiveControls is not initialized");
    }
    return this._persepectiveControls;
  }

  get orthographicControls() {
    if (!this._orthographicControls) {
      throw new Error("OrthographicControls is not initialized");
    }
    return this._orthographicControls;
  }

  public updateControls(camera: THREE.Camera) {
    this._persepectiveControls!.enabled = true;
    this._orthographicControls!.enabled = false;
    if (camera instanceof THREE.PerspectiveCamera) {
      this._controls = this._persepectiveControls;

      this._camera = camera;
      this._persepectiveControls?.updateCamera(camera);
    } else if (camera instanceof THREE.OrthographicCamera) {
      this._persepectiveControls!.enabled = false;
      this._orthographicControls!.enabled = true;
      this._controls = this._orthographicControls;
      this._camera = camera;
      this._orthographicControls?.updateCamera(camera);
    }
  }

  set scene(scene: Scene) {
    console.log("%cchange Scene", "color: orange;");
    this._scene = scene;
    this._camera = scene.camera;

    // 카메라 타입에 따라 적절한 컨트롤러 설정
    this.updateControls(scene.camera);

    this._transformControls?.dispose();
    this._transformControls = new TransformControls(this._scene!.camera, this._dom!);
    this._camera = this._scene!.camera;

    this.notify();
  }

  get cameras() {
    return this._cameras;
  }

  set cameras(cameras: THREE.Camera[]) {
    this._cameras = [...this._cameras, ...cameras];
  }

  get viewHelper() {
    if (!this._viewHelper) {
      throw new Error("ViewHelper is not initialized");
    }
    return this._viewHelper;
  }

  set viewHelper(viewHelper: ViewHelper) {
    this._viewHelper = viewHelper;
  }

  get camera() {
    if (!this._camera) {
      throw new Error("Camera is not initialized");
    }
    return this._camera;
  }

  set camera(camera: THREE.Camera) {
    this._camera = camera;
  }

  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  public subscribe(listener: () => void) {
    this._listeners = [...this._listeners, listener];
  }
  public unsubscribe(listener: () => void) {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }
  public notify() {
    this._listeners.forEach((listener) => listener());
  }

  public resize() {
    if (!this._scene) {
      throw new Error("Scene is not initialized");
    } else {
      this._renderer.setSize(this._dom!.clientWidth, this._dom!.clientHeight);
      const perspectiveCamera = this._scene.camera as THREE.PerspectiveCamera;
      perspectiveCamera.aspect = this._dom!.clientWidth / this._dom!.clientHeight;
      perspectiveCamera.updateProjectionMatrix();
    }
    if (this._camera instanceof THREE.OrthographicCamera) {
      const frustumSize =
        2 *
        Math.tan((DEFAULT_CAMERA_SPEC.fov * Math.PI) / 180 / 2) *
        this._scene.perspectiveCamera.position.z;
      const aspect = this._dom!.clientWidth / this._dom!.clientHeight;

      this._camera.left = (-frustumSize * aspect) / 2;
      this._camera.right = (frustumSize * aspect) / 2;
      this._camera.top = frustumSize / 2;
      this._camera.bottom = -frustumSize / 2;

      this._camera.updateProjectionMatrix();
    }
  }

  public render() {
    if (!this._scene) {
      throw new Error("Scene is not initialized");
    } else {
      this.resize();

      this._scene!.camera!.updateMatrixWorld();

      this._renderer.autoClear = false;
      this._renderer.render(this._scene, this._scene.camera);

      this._scene.render();

      this._controls?.render();
      this._renderer.render(this._scene.sceneHelper, this._scene.camera);
      this._viewHelper?.render(this._renderer);
      this._renderer.autoClear = true;

      JEASINGS.update();
    }
  }

  public dispose() {
    this._renderer.dispose();
    if (this._dom) {
      while (this._dom.firstChild) {
        this._dom.removeChild(this._dom.firstChild);
      }
    }
    this._scenes.forEach((scene) => {
      scene.dispose();
    });
    this._scenes = [];
    this._scene = null;
    this._cameras = [];
    this._camera = null;
    this._controls?.dispose();
    this._listeners = [];
  }
}
